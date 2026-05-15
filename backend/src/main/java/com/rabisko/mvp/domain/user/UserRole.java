package com.rabisko.mvp.domain.user;

/**
 * Papeis suportados. Os NOMES das constantes batem EXATAMENTE com os
 * valores do ENUM Postgres `user_role` — Hibernate serializa por
 * Enum.name() (ver mapeamento em User.role). Por isso minusculo, rompendo
 * a convencao Java de SCREAMING_SNAKE_CASE.
 *
 * "tatuador" no banco corresponde a "artista" no front (RoleSwitch). Cabe
 * ao front mapear (helper backendRoleToFront em LoginScreen/RegisterScreen).
 */
public enum UserRole {
    admin,
    cliente,
    tatuador,
    estudio
}
