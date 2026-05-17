package com.rabisko.mvp.infraestrutura.security;

import com.rabisko.mvp.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro que roda em TODA request (extends OncePerRequestFilter — Spring
 * garante chamada unica mesmo em forwards/includes). Responsavel por
 * traduzir o cabecalho `Authorization: Bearer <jwt>` em um Authentication
 * que o Spring Security entende.
 *
 * Fluxo:
 *  1. Le o header Authorization.
 *  2. Pede ao TokenService pra validar o JWT — devolve o subject (email).
 *  3. Carrega o User correspondente via UserRepository.findByEmail.
 *  4. Monta um UsernamePasswordAuthenticationToken e poe no SecurityContext.
 *
 * A partir daqui, controllers podem usar @AuthenticationPrincipal pra
 * receber o User logado, e @PreAuthorize/role checks funcionam.
 *
 * Se NAO houver header Authorization, o filtro NAO bloqueia — apenas segue
 * a chain. Quem decide bloquear e o SecurityFilterChain (via
 * .anyRequest().authenticated() em SecurityConfiguration).
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var login = tokenService.validateToken(token);
            UserDetails user = userRepository.findByEmail(login);

            // credentials = null: nao guardamos a senha no contexto. authorities
            // saem do User.getAuthorities() (mapeado a partir do UserRole).
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
