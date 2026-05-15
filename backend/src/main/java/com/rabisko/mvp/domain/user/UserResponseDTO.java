package com.rabisko.mvp.domain.user;

import java.time.LocalDate;
import java.util.UUID;

/**
 * RESPONSE DTO do User — devolvido pelo GET /user/me e composto em
 * outras respostas. Omite EXPLICITAMENTE senha (User.senha) e flags
 * internas (status, dataCriacao, dataModificacao, termosAceitos) — esses
 * dados nao devem trafegar pra fora do servidor.
 *
 * Manter este DTO sincronizado com User.java sempre que adicionar campo
 * publico novo — e o "filtro" que separa o que o cliente ve do que e
 * apenas server-side.
 */
public record UserResponseDTO(
    UUID userId,
    String nome,
    String email,
    String telefone,
    LocalDate dataNasc,
    UserRole role
) {
    public static UserResponseDTO fromUser(User u) {
        return new UserResponseDTO(
            u.getUserId(),
            u.getNome(),
            u.getEmail(),
            u.getTelefone(),
            u.getDataNasc(),
            u.getRole()
        );
    }
}
