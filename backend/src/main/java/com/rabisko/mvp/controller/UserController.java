package com.rabisko.mvp.controller;

import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUser(@RequestBody @Valid UserDTO body){
        try{
            userService.cadastrarUser(body);
            return ResponseEntity.status(201).body("Usuário cadastrado com sucesso!");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(400).body("Erro no banco: Este E-mail ou CPF/CNPJ já está em uso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
