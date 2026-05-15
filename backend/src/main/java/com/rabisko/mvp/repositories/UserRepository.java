package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Repositorio JPA de User. Os 3 metodos abaixo sao "derived queries" — o
 * Spring Data JPA gera o SQL a partir do nome do metodo (`existsByEmail`
 * vira `SELECT count(*) FROM users WHERE email = ?`).
 *
 * findByEmail retorna UserDetails (interface do Spring Security) em vez de
 * User pra que o AuthorizationService.loadUserByUsername possa devolver
 * direto sem cast — User implementa UserDetails.
 *
 * deleteByEmail precisa de @Modifying + @Transactional pra rodar dentro
 * de uma transacao ativa (sem isso, Spring Data lanca
 * InvalidDataAccessApiUsageException em runtime).
 */
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    UserDetails findByEmail(String email);

    @Modifying
    @Transactional
    Long deleteByEmail(String email);
}
