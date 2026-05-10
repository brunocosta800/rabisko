package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

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

        User novoUser = User.builder()
                .nome(body.getNome())
                .email(body.getEmail())
                .senha(encryptedPassword)
                .cpf(body.getCpf())
                .dataNasc(body.getDataNasc())
                .dataCriacao(LocalDateTime.now())
                .role(body.getRole())
                .status(true)
                .build();

        User usuarioSalvo = userRepository.save(novoUser);

        if(Objects.equals(body.getRole(), "tatuador")){
            artistService.cadastrarArtista(usuarioSalvo);
        }else if(Objects.equals(body.getRole(), "cliente")){
            clientService.cadastrarCliente(usuarioSalvo);
        }

        return usuarioSalvo;
    }
}
