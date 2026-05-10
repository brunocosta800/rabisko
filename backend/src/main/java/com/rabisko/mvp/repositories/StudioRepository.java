package com.rabisko.mvp.repositories;


import com.rabisko.mvp.domain.studio.Studio;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudioRepository extends MongoRepository<Studio, String> {
}
