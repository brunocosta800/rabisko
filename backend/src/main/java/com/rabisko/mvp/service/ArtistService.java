package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.artist.Artist;
import com.rabisko.mvp.domain.artist.RegisterArtistaDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Cria a linha em `tatuadores` que materializa o papel de artista do User.
 * Recebe o User ja salvo (pra ter user_id) + o RegisterArtistaDTO original
 * (pelos campos exclusivos: bio, instagram, endereco, estilos).
 *
 * Notas:
 *  - Dados pessoais (nome/email/cpf/telefone/senha) NAO sao replicados
 *    aqui — vivem em `users` e sao consultados via JOIN ou
 *    UserRepository.findById(userId). Ver Artist.java.
 *  - termosAceitos vive em User.termosAceitos (UserService.construirUser
 *    ja gravou). Mantido fora desta linha pra evitar duplicacao.
 *  - estilos: lista de nomes vinda do DTO. A persistencia espera a tabela
 *    M:N `tatuador_estilos` ter sua propria entity/repo — TODO ate la.
 */
@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public Artist cadastrarArtista(User user, RegisterArtistaDTO body) {
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
