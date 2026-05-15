package com.rabisko.mvp.domain.user;

/**
 * RESPONSE de /auth/login e dos 3 endpoints de cadastro (auto-login).
 * Carrega so o JWT — quem precisar dos dados do User chama /user/me a
 * seguir, com o token no header.
 */
public record LoginResponseDTO(String token) {
}
