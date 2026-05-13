package com.rabisko.mvp.domain.user;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

/*
 * Realinhamento ao schema do Supabase:
 *  - userId: Long -> UUID (acompanha o PK de User).
 *  - dataNasc: Date -> LocalDate (coluna `date` no Postgres).
 *  - Adicionado telefone (opcional, como no schema).
 *  - Removidos dataCriacao / dataModificacao / status do DTO de
 *    cadastro: esses valores são definidos pelo servidor —
 *    @CreationTimestamp/@UpdateTimestamp setam os timestamps e
 *    UserService força status=true. Receber esses campos do cliente
 *    só abriria espaço para spoofing.
 */
@Getter
@Setter
public class UserDTO {
    private UUID userId;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private LocalDate dataNasc;
    private String cpf;
    private UserRole role;
}
