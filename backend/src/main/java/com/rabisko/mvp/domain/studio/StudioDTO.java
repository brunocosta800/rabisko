package com.rabisko.mvp.domain.studio;

import java.util.UUID;

/**
 * RESPONSE DTO (read-only). Devolve os dados publicos do Studio. Nao
 * inclui senha (mora em `users`) nem termosAceitos (idem).
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
