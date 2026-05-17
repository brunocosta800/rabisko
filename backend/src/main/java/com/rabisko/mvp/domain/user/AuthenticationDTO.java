package com.rabisko.mvp.domain.user;

/**
 * INPUT do POST /auth/login. `login` aqui e o email do User (a coluna
 * `email` em `users` e tratada como username pelo Spring Security — ver
 * User.getUsername).
 */
public record AuthenticationDTO(String login, String senha) {
}
