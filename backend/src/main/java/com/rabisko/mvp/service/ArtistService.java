package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.artist.Artist;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public Artist cadastrarArtista(User artist){
        Artist novoArtist = Artist.builder()
                .userId(artist.getUserId())
                .estilos(new ArrayList<String>())
                .boostPremium(false)
                .build();

        return artistRepository.save(novoArtist);
    }
}
