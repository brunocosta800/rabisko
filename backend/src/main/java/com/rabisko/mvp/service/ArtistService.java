package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.artist.Artist;
import com.rabisko.mvp.domain.artist.RegisterArtistaDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Cadastro do tatuador. Recebe o User ja salvo (pra ter user_id) + o DTO
 * com os campos exclusivos do Artist (bio, instagram, estilos, termos).
 *
 * Nao replica nome/email/cpf/telefone/senha aqui — esses dados vivem no
 * `users` e sao consultados por JOIN/userId quando preciso. Ver comentario
 * em Artist.java.
 *
 * estilos: chega como List<String>, mas a M:N tatuador_estilos nao tem
 * entity/repo ainda. Ignorado por ora — TODO quando o repo existir.
 */
@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public Artist cadastrarArtista(User user, RegisterArtistaDTO body) {
        // termosAceitos NAO e setado aqui — vive em User.termosAceitos
        // (UserService.construirUser ja propagou). Ver Artist.java.
        Artist novoArtist = Artist.builder()
                .userId(user.getUserId())
                .bio(body.getBio())
                .instagram(body.getInstagram())
                .endereco(body.getEndereco())
                .vinculadoEstudio(false)
                .build();

        return artistRepository.save(novoArtist);
    }
}
