package com.rabisko.mvp.service;

import com.rabisko.mvp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Adapta o nosso UserRepository ao contrato `UserDetailsService` que o
 * Spring Security espera. O AuthenticationManager (configurado em
 * SecurityConfiguration) usa este service no /auth/login pra carregar o
 * User pelo email e comparar a senha plain enviada com o hash BCrypt
 * armazenado em `users.senha_hash`.
 *
 * Como User implementa UserDetails, o cast e direto — nao precisa de DTO
 * intermediario.
 */
@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }
}
