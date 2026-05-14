package com.rabisko.mvp.controller;

import com.rabisko.mvp.domain.user.ExcludeDTO;
import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
        } catch (DataIntegrityViolationException e) {
            // Migração Mongo -> JPA: violação de índice único @Indexed
            // no Mongo vinha como DuplicateKeyException; no JPA, o
            // Hibernate normalmente lança DataIntegrityViolationException
            // (superclasse de DuplicateKeyException). Capturamos a
            // superclasse para cobrir os dois mundos.
            return ResponseEntity.status(400).body("Erro no banco: Este E-mail ou CPF/CNPJ já está em uso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/excluir-conta")
    public ResponseEntity<String> excluirUser(@RequestBody @Valid ExcludeDTO body){
        try{
            userService.excluirUser(body);
            return ResponseEntity.status(201).body("Usuário excuído com sucesso!");
        } catch (DataIntegrityViolationException e) {
            // Em delete não é o caminho mais comum, mas mantemos por
            // simetria com o catch acima (idem motivo da migração).
            return ResponseEntity.status(400).body("Erro no banco: Este E-mail ou CPF/CNPJ não existe.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
