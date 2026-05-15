package com.rabisko.mvp.domain.artist;

import java.util.UUID;

/**
 * RESPONSE DTO (read-only). Devolve os campos proprios do Artist em
 * endpoints como GET /artist/{id} e listagens. NAO inclui dados pessoais
 * (nome/email/cpf/telefone) — esses vivem em `users` e devem vir via
 * JOIN ou compostos com UserResponseDTO em um wrapper futuro
 * (ArtistWithUserDTO) quando o GET precisar deles.
 */
public record ArtistDTO(
    UUID tatuadorId,
    UUID userId,
    UUID estudioId,
    String bio,
    String instagram,
    String endereco,
    boolean vinculadoEstudio
) {
    public static ArtistDTO from(Artist a) {
        return new ArtistDTO(
            a.getTatuadorId(),
            a.getUserId(),
            a.getEstudioId(),
            a.getBio(),
            a.getInstagram(),
            a.getEndereco(),
            a.isVinculadoEstudio()
        );
    }
}
