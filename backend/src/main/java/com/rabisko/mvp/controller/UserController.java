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

/**
 * Endpoints de gestao de usuario.
 *
 * Cadastro: 3 endpoints, um por papel (cliente / artista / estudio). A
 * decisao de qual rota chamar fica no front (RoleSwitch). Cada endpoint
 * aceita seu DTO proprio (UserDTO / RegisterArtistaDTO / RegisterEstudioDTO)
 * com os campos que aquele papel precisa, e delega ao metodo correspondente
 * do UserService.
 *
 * Por que NAO um unico /user/cadastro recebendo `role` no body:
 *  - Evita spoofing (cliente nao consegue se cadastrar como admin).
 *  - Mantem cada DTO enxuto, sem campos que nao se aplicam.
 *  - Permite Bean Validation (@Valid) especifico por papel.
 *
 * Auto-login: apos cadastro bem-sucedido, todos os 3 endpoints retornam o
 * JWT direto (HTTP 201 + LoginResponseDTO). Isso evita um round-trip extra
 * de POST /auth/login pelo front depois.
 *
 * Tratamento de erro:
 *  - DataIntegrityViolationException: viola UNIQUE em users.email/cpf
 *    ou estudios.cnpj. Retorna 400 com mensagem amigavel.
 *  - RuntimeException generico: erro de regra de negocio (ex.: "E-mail
 *    ja cadastrado!" lancado pelo UserService). Retorna 400 com a msg.
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

    /**
     * Devolve o User logado. @AuthenticationPrincipal e injetado pelo Spring
     * a partir do SecurityContext que o SecurityFilter populou. Devolve
     * UserResponseDTO em vez de User direto pra nao vazar senha_hash.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(UserResponseDTO.fromUser(user));
    }
}
