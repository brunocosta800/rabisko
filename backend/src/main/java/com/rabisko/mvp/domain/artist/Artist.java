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

/*
 * Realinhamento ao schema do Supabase (tabela "public.tatuadores"):
 *
 *  - @Table apontando para "tatuadores" (a classe Java continua se
 *    chamando Artist para não derrubar ArtistService/ArtistRepository).
 *  - PK UUID em vez de Long IDENTITY.
 *  - user_id é UNIQUE no schema (um tatuador por usuário) — anotado
 *    com unique=true para o ddl-auto=validate aceitar.
 *  - estudio_id é UUID e nullable (tatuador pode não estar vinculado).
 *  - Removidos os campos da versão anterior:
 *      * boostPremium  -> virou a tabela própria public.boosts,
 *                         vinculada a uma imagem do portfólio. Não faz
 *                         parte do perfil base.
 *      * estilos       -> virou public.tatuador_estilos (join com
 *                         public.estilos, master). Fora do escopo do
 *                         cadastro inicial.
 *  - Campos novos vindos do schema, todos com default false para casar
 *    com os DEFAULT do DB:
 *      vinculado_estudio, termos_aceitos, perfil_completo.
 *  - bio (text) e instagram (varchar) ficam nulos até o tatuador
 *    completar o perfil. data_criacao usa @CreationTimestamp pela
 *    mesma razão explicada em User.
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

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "estudio_id")
    private UUID estudioId;

    private String bio;

    private String instagram;

    @Column(name = "vinculado_estudio", nullable = false)
    private boolean vinculadoEstudio;

    @Column(name = "termos_aceitos", nullable = false)
    private boolean termosAceitos;

    @Column(name = "perfil_completo", nullable = false)
    private boolean perfilCompleto;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
