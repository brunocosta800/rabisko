package com.rabisko.mvp.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Tabela `users` — entidade central de autenticacao. TODA conta no sistema
 * (cliente, tatuador, estudio, admin) tem uma linha aqui. As tabelas
 * filhas (`clientes`, `tatuadores`, `estudios`) carregam dados do papel.
 *
 * Implementa UserDetails do Spring Security pra que o AuthorizationService
 * possa devolver o User direto no loadUserByUsername — sem DTO intermediario.
 *
 * Pontos de atencao pra quem mexer:
 *  - role e mapeado pro ENUM nativo Postgres `user_role` (admin/cliente/
 *    tatuador/estudio). Por isso a triade @Enumerated(STRING) +
 *    @JdbcTypeCode(NAMED_ENUM) + columnDefinition="user_role" — sem isso
 *    o driver envia varchar e o Postgres rejeita o INSERT. As constantes
 *    do enum em Java tambem ficam em minusculo pra casar com os valores
 *    do ENUM no banco.
 *  - data_criacao / data_modificacao tem NOT NULL + DEFAULT now() no schema.
 *    @CreationTimestamp/@UpdateTimestamp setam pelo lado Java pra garantir
 *    que o INSERT nao mande NULL (Hibernate inclui a coluna mesmo vazia).
 *  - cpf nullable + UNIQUE: cliente/tatuador (PF) tem; estudio (PJ) nao
 *    tem cpf — usa o cnpj que vive em `estudios`.
 *  - termos_aceitos: o aceite e do USUARIO, nao do papel. Por isso vive
 *    aqui e nao em tatuadores/estudios.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "userId")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", updatable = false, nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String nome;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 8)
    @Column(name = "senha_hash", nullable = false)
    private String senha;

    private String telefone;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(unique = true)
    private String cpf;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "role", columnDefinition = "user_role", nullable = false)
    private UserRole role;

    @Column(name = "status_ativo", nullable = false)
    private boolean status;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "data_modificacao", nullable = false)
    private LocalDateTime dataModificacao;

    @Column(name = "termos_aceitos", nullable = false)
    private boolean termosAceitos;

    /**
     * Mapeia o role do dominio pra GrantedAuthorities do Spring Security.
     * @PreAuthorize("hasRole('TATUADOR')") em endpoints futuros vai usar isso.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.admin)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else if (this.role == UserRole.cliente)
            return List.of(new SimpleGrantedAuthority("ROLE_CLIENT"));
        else if (this.role == UserRole.tatuador)
            return List.of(new SimpleGrantedAuthority("ROLE_TATUADOR"));
        else
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    /** Spring Security usa email como "username" — chave de login do sistema. */
    @Override
    public String getUsername() {
        return email;
    }

    @Override public boolean isAccountNonExpired()     { return true; }
    @Override public boolean isAccountNonLocked()      { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled()               { return true; }
}
