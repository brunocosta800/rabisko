package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.studio.RegisterEstudioDTO;
import com.rabisko.mvp.domain.studio.Studio;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.StudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Cadastro de estudio. Espelha ArtistService:
 *  - Recebe o User ja salvo (pra ter user_id) + o DTO original com os
 *    campos especificos de Studio (cnpj, telefone — nome/email vem do
 *    User mas sao replicados aqui pelo schema atual).
 *  - termosAceitos vem do payload (validado com @AssertTrue no DTO).
 *  - Endereco e horarios ficam de fora ate Studio ter campos pra isso.
 */
@Service
public class StudioService {

    @Autowired
    private StudioRepository studioRepository;

    public Studio cadastrarEstudio(User user, RegisterEstudioDTO body) {
        // termosAceitos NAO e setado aqui — vive em User.termosAceitos
        // (UserService.construirUser ja propagou). Ver Studio.java.
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
