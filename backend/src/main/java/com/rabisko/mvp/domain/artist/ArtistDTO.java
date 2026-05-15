package com.rabisko.mvp.domain.artist;

import java.util.UUID;

/*
 * DTO de RESPOSTA (read-only) — usado pra devolver dados de um artista
 * (ex.: GET /artist/{id}, listagem). So traz o que e proprio do Artist.
 *
 * Dados pessoais do tatuador (nome/email/cpf/telefone) vivem no `users` e
 * NAO sao duplicados aqui — quando o endpoint de listagem precisar deles,
 * faz JOIN com User e devolve um ArtistWithUserDTO ou popula manualmente
 * via UserRepository.findById(userId). Ver Artist.java pro motivo.
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
