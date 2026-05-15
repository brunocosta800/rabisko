package com.rabisko.mvp.domain.artist;

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
 * Linha em `tatuadores` — materializa o papel "artista" de um User. Aggregate
 * enxuto: guarda APENAS o que e proprio do tatuador.
 *
 * Dados pessoais (nome/email/cpf/telefone/senha) vivem no `users`. Pra
 * obte-los, faca JOIN via user_id ou consulta UserRepository.findById.
 *
 * Por que nao duplicar:
 *  - Schema do Supabase nao tem essas colunas em `tatuadores`.
 *  - Duplicacao geraria sincronizacao (toda vez que o user editar nome,
 *    teria que atualizar nas duas tabelas) — fonte classica de bug.
 *
 * O que fica aqui (proprio do papel):
 *  - bio, instagram, endereco
 *  - vinculo com estudio (estudio_id + flag)
 */
@Entity
@Table(name = "tatuadores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "tatuadorId")
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "tatuador_id", updatable = false, nullable = false)
    private UUID tatuadorId;

    /** FK pro User dono. UNIQUE: cada User com role=tatuador tem 1 perfil. */
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    /**
     * Nullable: tatuador pode ser autonomo (sem estudio). Quando ha vinculo,
     * o app usa o endereco do estudio; caso contrario, usa o `endereco` abaixo.
     */
    @Column(name = "estudio_id")
    private UUID estudioId;

    /**
     * Endereco do tatuador autonomo (texto livre no MVP). Migrar pra
     * @OneToOne com `enderecos` quando essa tabela polimorfica virar entity.
     */
    private String endereco;

    private String bio;

    private String instagram;

    /** Espelha a presenca de estudio_id; util pra filtros sem JOIN. */
    @Column(name = "vinculado_estudio", nullable = false)
    private boolean vinculadoEstudio;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
