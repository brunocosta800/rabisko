package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.artist.Artist;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Realinhamento ao schema "tatuadores":
 *  - artist.getUserId() agora devolve UUID.
 *  - Campos `estilos` e `boostPremium` saíram do Artist (moraram em
 *    tabelas próprias no schema do Supabase). No cadastro só criamos
 *    a linha mínima vinculando user_id e marcando vinculado_estudio /
 *    termos_aceitos / perfil_completo como false (idem aos DEFAULT do
 *    schema; o usuário completa esses campos depois).
 *  - bio / instagram ficam null até o tatuador editar o perfil.
 */
@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public Artist cadastrarArtista(User artist){
        Artist novoArtist = Artist.builder()
                .userId(artist.getUserId())
                .vinculadoEstudio(false)
                .termosAceitos(false)
                .perfilCompleto(false)
                .build();

        return artistRepository.save(novoArtist);
    }
}
