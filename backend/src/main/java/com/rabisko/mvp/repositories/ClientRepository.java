package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.client.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
}
