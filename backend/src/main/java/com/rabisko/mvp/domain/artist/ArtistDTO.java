package com.rabisko.mvp.domain.artist;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/*
 * Realinhamento ao schema "tatuadores":
 *  - Ids passaram a UUID.
 *  - Campos do schema (bio/instagram/vinculadoEstudio/termosAceitos/
 *    perfilCompleto) entram no DTO para quando existir uma rota de
 *    edição/conclusão de perfil. Os campos antigos `estilos` e
 *    `boostPremium` saíram (vivem em outras tabelas — tatuador_estilos,
 *    boosts).
 */
@Getter
@Setter
public class ArtistDTO {
    private UUID tatuadorId;
    private UUID estudioId;
    private UUID userId;
    private String bio;
    private String instagram;
    private boolean vinculadoEstudio;
    private boolean termosAceitos;
    private boolean perfilCompleto;
}
