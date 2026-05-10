package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);

    UserDetails findByEmail(String email);
}
