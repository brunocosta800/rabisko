package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/*
 * Realinhamento ao schema do Supabase:
 *  - O tipo do PK passou de Long para UUID (vide User.userId).
 *  - existsByEmail / findByEmail / deleteByEmail continuam derived:
 *    Hibernate infere a query a partir do nome.
 *  - deleteByEmail mantém @Modifying + @Transactional — sem isso, a
 *    JPA falha em runtime com InvalidDataAccessApiUsageException.
 *  - findByEmail mantém o retorno UserDetails (User implements
 *    UserDetails), pra AuthorizationService / SecurityFilter
 *    continuarem inalterados.
 */
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);

    UserDetails findByEmail(String email);

    @Modifying
    @Transactional
    Long deleteByEmail(String email);
}
