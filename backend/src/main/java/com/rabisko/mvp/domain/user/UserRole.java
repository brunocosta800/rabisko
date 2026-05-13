package com.rabisko.mvp.domain.user;

/*
 * Realinhamento ao schema do Supabase:
 *
 *  - O Postgres tem um ENUM nativo `user_role` com valores em minúsculo
 *    ('admin', 'cliente', 'tatuador'). A coluna `users.role` é desse
 *    tipo (não é um varchar livre).
 *  - Para mapear isso no Hibernate 6+/7 usamos em User.role a tríade
 *    @Enumerated(EnumType.STRING) + @JdbcTypeCode(SqlTypes.NAMED_ENUM)
 *    + columnDefinition = "user_role". Isso faz o driver enviar o valor
 *    como tipo ENUM (e não varchar) — sem isso, o Postgres rejeita o
 *    INSERT com "column "role" is of type user_role but expression is
 *    of type character varying".
 *  - Esse caminho usa Enum.name() na serialização, então os NOMES das
 *    constantes Java têm que bater EXATAMENTE com os valores do ENUM
 *    no DB. Por isso constantes em minúsculo — rompe a convenção Java
 *    de SCREAMING_SNAKE_CASE, mas é o jeito mais limpo de casar com um
 *    ENUM Postgres já existente.
 *  - Removido o valor "USER" que existia antes: não está no ENUM do
 *    schema (que tem apenas admin/cliente/tatuador).
 *  - Removidos também o campo `role` e o getter `getRole()` que carregavam
 *    a string em minúsculo: agora a própria constante já é minúscula,
 *    então UserRole.cliente.name() devolve "cliente" diretamente.
 */
public enum UserRole {
    admin,
    cliente,
    tatuador
}
