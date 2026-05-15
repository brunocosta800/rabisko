package com.rabisko.mvp.domain.artist;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/*
 * DTO de INPUT pra cadastro de artista (POST /user/cadastro/artista).
 * Carrega os campos do User base + os campos especificos do Artist
 * (bio, instagram, estilos) num unico payload.
 *
 * Notas:
 *  - role nao vem no DTO: o endpoint /artista ja sabe que e tatuador.
 *  - estilos: lista de nomes (ex.: "Realismo", "Blackwork"). TODO:
 *    persistir em tatuador_estilos quando a entity/repo dessa M:N
 *    existir. Por ora a lista chega no service mas nao e gravada.
 *  - endereco do artista nao entra aqui ainda — a tabela enderecos do
 *    schema e polimorfica (owner_id+owner_type) e nao tem entity JPA.
 *    Capturar no front, plumbar quando o backend tiver suporte.
 *  - termosAceitos com @AssertTrue: bloqueia cadastro se vier false.
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

    /*
     * Endereco do tatuador autonomo (sem vinculo com estudio). Opcional —
     * quando vinculado a um estudio, fica null e o app usa o endereco do
     * estudio. Texto livre por enquanto, ate a tabela `enderecos` virar
     * entity JPA.
     */
    private String endereco;

    private List<String> estilos;

    @AssertTrue(message = "Voce deve aceitar os termos de uso")
    private boolean termosAceitos;
}
