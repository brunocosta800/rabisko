package com.rabisko.mvp.domain.user;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/*
 * DTO de INPUT pra cadastro de cliente (POST /user/cadastro/cliente).
 * Carrega so os campos do User base — cliente nao tem campos extras
 * no momento do cadastro (dadosPagamentoToken so vem depois, quando
 * o user cadastra metodo de pagamento na tela de Settings).
 *
 * Pra artista/estudio: ver RegisterArtistaDTO / RegisterEstudioDTO.
 *
 * Notas:
 *  - userId removido: PK gerado pelo servidor (@GeneratedValue UUID).
 *  - role removido: o endpoint /cliente ja assume role=cliente.
 *    Aceitar do payload abriria vetor de spoof (cliente se cadastrando
 *    como admin, etc.).
 *  - dataCriacao / status / etc.: server-side only.
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
