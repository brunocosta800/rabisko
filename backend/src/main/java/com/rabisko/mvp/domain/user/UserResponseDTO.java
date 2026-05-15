package com.rabisko.mvp.domain.user;

import java.time.LocalDate;
import java.util.UUID;

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