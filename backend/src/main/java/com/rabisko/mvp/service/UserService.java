package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.artist.RegisterArtistaDTO;
import com.rabisko.mvp.domain.studio.RegisterEstudioDTO;
import com.rabisko.mvp.domain.user.ExcludeDTO;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.domain.user.UserDTO;
import com.rabisko.mvp.domain.user.UserRole;
import com.rabisko.mvp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/*
 * 3 fluxos publicos de cadastro, um por papel:
 *
 *   - cadastrarCliente(UserDTO)     -> User(role=cliente)   + Client
 *   - cadastrarArtista(RegisterArtistaDTO) -> User(role=tatuador) + Artist
 *   - cadastrarEstudio(RegisterEstudioDTO) -> User(role=estudio)  + Studio
 *
 * Cada um cria a linha em `users` (com senha BCrypt + termosAceitos +
 * status=true) e dispara o service especializado pra criar a linha do
 * aggregate especifico. Tudo dentro de @Transactional pra garantir
 * rollback se a segunda etapa falhar (evita ficar com User orfao em
 * `users` sem a contraparte em tatuadores/estudios/clientes).
 *
 * Nao ha mais um cadastrarUser(UserDTO) generico com role no body —
 * removido pra fechar o vetor de spoof (cliente cadastrando como
 * admin). O role e determinado pelo endpoint, nao pelo payload.
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ArtistService artistService;

    @Autowired
    private StudioService studioService;

    @Transactional
    public User cadastrarCliente(UserDTO body) {
        User novoUser = construirUser(
                body.getNome(),
                body.getEmail(),
                body.getSenha(),
                body.getTelefone(),
                body.getDataNasc(),
                body.getCpf(),
                UserRole.cliente,
                body.isTermosAceitos()
        );
        User salvo = userRepository.save(novoUser);
        clientService.cadastrarCliente(salvo);
        return salvo;
    }

    @Transactional
    public User cadastrarArtista(RegisterArtistaDTO body) {
        User novoUser = construirUser(
                body.getNome(),
                body.getEmail(),
                body.getSenha(),
                body.getTelefone(),
                body.getDataNasc(),
                body.getCpf(),
                UserRole.tatuador,
                body.isTermosAceitos()
        );
        User salvo = userRepository.save(novoUser);
        artistService.cadastrarArtista(salvo, body);
        return salvo;
    }

    @Transactional
    public User cadastrarEstudio(RegisterEstudioDTO body) {
        // estudio e PJ: dataNasc/cpf nao se aplicam, ficam null.
        User novoUser = construirUser(
                body.getNome(),
                body.getEmail(),
                body.getSenha(),
                body.getTelefone(),
                null,
                null,
                UserRole.estudio,
                body.isTermosAceitos()
        );
        User salvo = userRepository.save(novoUser);
        studioService.cadastrarEstudio(salvo, body);
        return salvo;
    }

    @Transactional
    public Long excluirUser(ExcludeDTO body) {
        if (!userRepository.existsByEmail(body.email())) {
            throw new RuntimeException("E-mail nao cadastrado!");
        }
        return userRepository.deleteByEmail(body.email());
    }

    private User construirUser(
            String nome,
            String email,
            String senhaPlain,
            String telefone,
            LocalDate dataNasc,
            String cpf,
            UserRole role,
            boolean termosAceitos
    ) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("E-mail ja cadastrado!");
        }
        String senhaHash = new BCryptPasswordEncoder().encode(senhaPlain);
        return User.builder()
                .nome(nome)
                .email(email)
                .senha(senhaHash)
                .telefone(telefone)
                .dataNasc(dataNasc)
                .cpf(cpf)
                .role(role)
                .status(true)
                .termosAceitos(termosAceitos)
                .build();
    }
}
