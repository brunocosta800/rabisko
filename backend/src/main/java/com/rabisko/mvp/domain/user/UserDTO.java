package com.rabisko.mvp.domain.user;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * INPUT do cadastro de cliente (POST /user/cadastro/cliente). Cliente nao
 * tem campos exclusivos no momento do cadastro — so os do User base.
 *
 * Campos NAO presentes (deliberado):
 *  - userId: gerado pelo servidor (@GeneratedValue UUID).
 *  - role: ja determinado pela URL do endpoint. Aceitar do payload abriria
 *    spoof (cliente se cadastrando como admin).
 *  - dataCriacao / status: server-side only.
 *
 * Validacoes Bean Validation (@Valid no controller):
 *  - @NotBlank em nome/email/senha — nao pode vir vazio.
 *  - @Email no email — formato basico.
 *  - @Size(min=8) na senha — alinha com User.senha (@Size(min=8)).
 *  - @AssertTrue em termosAceitos — bloqueia cadastro se vier false.
 */
@Getter
@Setter
public class UserDTO {

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String senha;

    private String telefone;

    private LocalDate dataNasc;

    private String cpf;

    @AssertTrue(message = "Voce deve aceitar os termos de uso")
    private boolean termosAceitos;
}
