package com.rabisko.mvp.infraestrutura.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.rabisko.mvp.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Emissao e verificacao de JWT (auth0/java-jwt). Algoritmo HMAC256 com
 * segredo simetrico — quem assina (este servidor) e quem verifica (este
 * servidor) compartilham o mesmo segredo, lido de `api.security.token.secret`
 * (env var JWT_SECRET, com fallback "my-secret-key" pra dev).
 *
 * Estrutura do token:
 *  - issuer  : "auth-api"           (validado em validateToken)
 *  - subject : User.email           (recuperado pelo SecurityFilter pra
 *                                    achar o User no banco)
 *  - exp     : agora + 2h (-03:00)  (Brasilia; ajustar se for multi-tz)
 *
 * Em producao: JWT_SECRET DEVE ser uma string aleatoria longa (64+ chars).
 * O fallback so existe pra nao travar o boot em dev local.
 */
@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro enquanto gerava o token", exception);
        }
    }

    /**
     * Valida assinatura + issuer + expiracao. Retorna o subject (email do
     * User) se OK, ou string vazia se invalido — o SecurityFilter trata
     * isso retornando um findByEmail("") que nao casa com nenhum User
     * (usuario fica nao-autenticado, request segue mas sera bloqueada
     * pelo authorization rules).
     */
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
