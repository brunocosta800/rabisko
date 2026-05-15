package com.rabisko.mvp.domain.studio;

import java.util.UUID;

/*
 * DTO de RESPOSTA (read-only) — usado pra devolver dados de um estúdio
 * (ex.: GET /studio/{id}). Não inclui senha nem termosAceitos.
 *
 * Pra INPUT de cadastro de estúdio, ver RegisterEstudioDTO (a criar) —
 * carrega senha + endereço + horários junto.
 */
public record StudioDTO(
    UUID estudioId,
    String nome,
    String email,
    String cnpj,
    String telefone,
    String endereco
) {
    public static StudioDTO from(Studio s) {
        return new StudioDTO(
            s.getEstudioId(),
            s.getNome(),
            s.getEmail(),
            s.getCnpj(),
            s.getTelefone(),
            s.getEndereco()
        );
    }
}
