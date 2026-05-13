package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.user.ExcludeDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.domain.user.UserRole;
import com.rabisko.mvp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ArtistService artistService;

    public User cadastrarUser(UserDTO body) {
        if (userRepository.existsByEmail(body.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado!");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(body.getSenha());

        // dataCriacao / dataModificacao saíram daqui: agora vêm de
        // @CreationTimestamp / @UpdateTimestamp no User. Status é
        // forçado no servidor (não vem do DTO).
        User novoUser = User.builder()
                .nome(body.getNome())
                .email(body.getEmail())
                .senha(encryptedPassword)
                .telefone(body.getTelefone())
                .cpf(body.getCpf())
                .dataNasc(body.getDataNasc())
                .role(body.getRole())
                .status(true)
                .build();

        User usuarioSalvo = userRepository.save(novoUser);

        // Bug histórico (que comparava UserRole com strings literais)
        // corrigido na migração JPA. Agora, com o realinhamento ao
        // ENUM Postgres user_role, as constantes do enum estão em
        // minúsculo — daí o uso de UserRole.tatuador / UserRole.cliente.
        if (body.getRole() == UserRole.tatuador) {
            artistService.cadastrarArtista(usuarioSalvo);
        } else if (body.getRole() == UserRole.cliente) {
            clientService.cadastrarCliente(usuarioSalvo);
        }

        return usuarioSalvo;
    }

    // @Transactional é necessário em JPA para que o derived
    // deleteByEmail rode dentro de uma transação ativa (em Mongo isso
    // era implícito).
    @Transactional
    public Long excluirUser(ExcludeDTO body) {
        if (!userRepository.existsByEmail(body.email())) {
            throw new RuntimeException("E-mail não cadastrado!");
        }
        return userRepository.deleteByEmail(body.email());
    }
}
