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

/*
 * Realinhamento ao schema do Supabase (tabela "public.users"):
 *
 *  - PK: Long IDENTITY -> UUID. Hibernate gera o UUID no Java
 *    (@GeneratedValue(UUID)); o DB também tem DEFAULT uuid_generate_v4(),
 *    mas não importa: sempre que mandamos um valor, ele é usado.
 *  - Mapeamento de coluna -> Java:
 *      user_id              -> userId            (UUID)
 *      senha_hash           -> senha             (renomeada via @Column)
 *      status_ativo         -> status            (idem)
 *      data_nasc            -> dataNasc          (Date -> LocalDate;
 *                                                 a coluna no DB é `date`)
 *      data_criacao         -> dataCriacao       (@CreationTimestamp)
 *      data_modificacao     -> dataModificacao   (@UpdateTimestamp)
 *  - Campo novo: telefone (varchar nullable).
 *  - cpf: agora apenas UNIQUE (no schema é nullable; tirei o
 *    nullable=false que eu tinha colocado).
 *  - role: mapeado para o ENUM nativo Postgres `user_role`. A tríade
 *    @Enumerated(STRING) + @JdbcTypeCode(NAMED_ENUM) +
 *    columnDefinition="user_role" faz o driver enviar o valor como
 *    tipo ENUM em vez de varchar. As constantes em UserRole estão em
 *    minúsculo justamente para casar com os valores do ENUM
 *    ('admin'/'cliente'/'tatuador').
 *  - @CreationTimestamp / @UpdateTimestamp: o schema tem NOT NULL +
 *    DEFAULT now() nessas colunas. O Hibernate, por padrão, incluiria
 *    a coluna no INSERT mesmo com valor nulo (violando NOT NULL).
 *    Setando pelo Java a gente garante que sempre vai um timestamp.
 *  - Implementação de UserDetails inalterada (getEmail como username,
 *    senha como password). Login/SecurityFilter continuam funcionando.
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Constantes do enum em minúsculo após o realinhamento ao ENUM
        // Postgres `user_role`.
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

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
