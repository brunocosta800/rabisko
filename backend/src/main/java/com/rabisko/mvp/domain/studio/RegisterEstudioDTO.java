package com.rabisko.mvp.domain.studio;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/*
 * DTO de INPUT pra cadastro de estudio (POST /user/cadastro/estudio).
 * Carrega os campos do User base (credenciais de login) + os campos
 * especificos do Studio (cnpj). O 'nome' aqui e o nome do estudio
 * (mapeado pra Studio.nome E pra User.nome — como estudio nao tem
 * pessoa fisica, sao iguais).
 *
 * Notas:
 *  - dataNasc / cpf nao entram: estudio e pessoa juridica (cnpj).
 *  - role nao vem: endpoint /estudio ja assume role=estudio.
 *  - endereco / horarios de funcionamento ficam de fora ate a tabela
 *    enderecos / o par horarioAbertura/Fechamento serem implementados
 *    de ponta a ponta (Studio.java ja tem os campos comentados).
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

    /*
     * Endereco fisico do estudio. Estudio e local fisico, entao na pratica
     * sempre tem — mas mantido opcional no MVP pra nao bloquear cadastro
     * incremental (o dono pode preencher depois pela tela de perfil).
     */
    private String endereco;

    @AssertTrue(message = "Voce deve aceitar os termos de uso")
    private boolean termosAceitos;
}
