package com.rabisko.mvp.controller;

import com.rabisko.mvp.domain.artist.RegisterArtistaDTO;
import com.rabisko.mvp.domain.studio.RegisterEstudioDTO;
import com.rabisko.mvp.domain.user.ExcludeDTO;
import com.rabisko.mvp.domain.user.LoginResponseDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.domain.user.UserResponseDTO;
import com.rabisko.mvp.infraestrutura.security.TokenService;
import com.rabisko.mvp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/*
 * 3 endpoints de cadastro, um por papel — cada um aceita seu DTO
 * proprio (UserDTO / RegisterArtistaDTO / RegisterEstudioDTO) e
 * delega pro UserService correspondente. Todos retornam o JWT direto
 * (auto-login pos-cadastro) pra evitar o round trip extra de chamar
 * /auth/login na sequencia. O front salva o token no AsyncStorage e
 * navega pra Home (ou Dashboard, no caso de artista/estudio quando
 * existir).
 *
 * O endpoint generico /user/cadastro foi removido — cada papel agora
 * tem seu path dedicado, alinhado com a estrategia de DTOs separados.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/cadastro/cliente")
    public ResponseEntity<?> cadastrarCliente(@RequestBody @Valid UserDTO body) {
        try {
            User salvo = userService.cadastrarCliente(body);
            return ResponseEntity.status(201).body(new LoginResponseDTO(tokenService.generateToken(salvo)));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Erro no banco: este E-mail ou CPF ja esta em uso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/cadastro/artista")
    public ResponseEntity<?> cadastrarArtista(@RequestBody @Valid RegisterArtistaDTO body) {
        try {
            User salvo = userService.cadastrarArtista(body);
            return ResponseEntity.status(201).body(new LoginResponseDTO(tokenService.generateToken(salvo)));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Erro no banco: este E-mail ou CPF ja esta em uso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/cadastro/estudio")
    public ResponseEntity<?> cadastrarEstudio(@RequestBody @Valid RegisterEstudioDTO body) {
        try {
            User salvo = userService.cadastrarEstudio(body);
            return ResponseEntity.status(201).body(new LoginResponseDTO(tokenService.generateToken(salvo)));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Erro no banco: este E-mail ou CNPJ ja esta em uso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/excluir-conta")
    public ResponseEntity<String> excluirUser(@RequestBody @Valid ExcludeDTO body) {
        try {
            userService.excluirUser(body);
            return ResponseEntity.status(200).body("Usuario excluido com sucesso!");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Erro no banco: este E-mail nao existe.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(UserResponseDTO.fromUser(user));
    }
}
