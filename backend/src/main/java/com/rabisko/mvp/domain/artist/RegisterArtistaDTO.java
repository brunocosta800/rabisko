package com.rabisko.mvp.domain.artist;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/**
 * INPUT do cadastro de artista (POST /user/cadastro/artista). Junta os
 * campos do User base (nome/email/senha/telefone/dataNasc/cpf) + os
 * campos exclusivos do Artist (bio, instagram, endereco, estilos).
 *
 * O role NAO vem no payload — o endpoint /artista ja assume tatuador.
 *
 * estilos: lista de nomes (ex.: "Realismo"). A persistencia ainda nao
 * existe — TODO no ArtistService ate a tabela M:N tatuador_estilos
 * ter entity/repo. Capturar aqui mantem o contrato pronto.
 *
 * endereco: relevante para tatuador autonomo (sem estudio_id).
 */
@Getter
@Setter
public class RegisterArtistaDTO {

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

    private String bio;

    private String instagram;

    private String endereco;

    private List<String> estilos;

    @AssertTrue(message = "Voce deve aceitar os termos de uso")
    private boolean termosAceitos;
}
