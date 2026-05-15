package com.rabisko.mvp.domain.studio;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * INPUT do cadastro de estudio (POST /user/cadastro/estudio). Carrega os
 * campos do User base (credenciais de login do dono) + os campos
 * exclusivos do Studio (cnpj, endereco).
 *
 * O 'nome' aqui e o nome do estudio — vai pra Studio.nome E pra User.nome
 * (estudio nao tem pessoa fisica, entao e o mesmo nome nas duas linhas
 * no cadastro inicial).
 *
 * dataNasc / cpf NAO entram: estudio e PJ — usa cnpj.
 * role NAO vem no payload (idem outros DTOs de cadastro).
 */
@Getter
@Setter
public class RegisterEstudioDTO {

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String senha;

    private String telefone;

    private String cnpj;

    private String endereco;

    @AssertTrue(message = "Voce deve aceitar os termos de uso")
    private boolean termosAceitos;
}
