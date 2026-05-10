package com.rabisko.mvp.repositories;


import com.rabisko.mvp.domain.artist.Artist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArtistRepository extends MongoRepository<Artist, String> {
}
