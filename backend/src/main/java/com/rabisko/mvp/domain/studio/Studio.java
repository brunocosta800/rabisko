package com.rabisko.mvp.domain.studio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Linha em `estudios` — materializa o papel "estudio" de um User dono.
 *
 * Diferenca vs Artist: aqui mantemos nome/email/telefone na propria linha,
 * porque sao dados COMERCIAIS do estudio (podem divergir do nome/email
 * pessoal do dono — nome fantasia, email comercial, etc.). No cadastro
 * inicial sao copiados do User, mas a tela de "editar estudio" futura
 * vai permitir desvinculo.
 *
 * cnpj UNIQUE — duas linhas de estudio nao podem ter o mesmo CNPJ.
 */
@Entity
@Table(name = "estudios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "estudioId")
public class Studio {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "estudio_id", updatable = false, nullable = false)
    private UUID estudioId;

    /**
     * FK pro User dono. UNIQUE: cada User com role=estudio gerencia 1 estudio
     * no MVP. Multi-estudio por dono fica fora de escopo.
     */
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String nome;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(unique = true)
    private String cnpj;

    private String telefone;

    /** Endereco fisico. Texto livre no MVP — ver Artist.endereco. */
    private String endereco;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
