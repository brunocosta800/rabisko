package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.studio.RegisterEstudioDTO;
import com.rabisko.mvp.domain.studio.Studio;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.StudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Cria a linha em `estudios` que materializa o papel de estudio do User
 * dono. Espelha a forma do ArtistService.
 *
 * Diferenca relevante vs Artist: o Studio mantem nome/email/telefone na
 * sua propria linha porque conceitualmente sao dados COMERCIAIS, podem
 * divergir do User dono (email comercial vs email pessoal de login,
 * nome fantasia vs nome do dono). Hoje o cadastro grava os mesmos
 * valores nos dois lados; quando o app tiver tela de "editar estudio",
 * esses campos viram independentes.
 *
 * termosAceitos vive em User (ver Studio.java).
 */
@Service
public class StudioService {

    @Autowired
    private StudioRepository studioRepository;

    public Studio cadastrarEstudio(User user, RegisterEstudioDTO body) {
        Studio novoStudio = Studio.builder()
                .userId(user.getUserId())
                .nome(user.getNome())
                .email(user.getEmail())
                .cnpj(body.getCnpj())
                .telefone(body.getTelefone())
                .endereco(body.getEndereco())
                .build();

        return studioRepository.save(novoStudio);
    }
}
