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

/**
 * Camada de servico do cadastro. Cada papel tem seu metodo publico:
 *
 *   cadastrarCliente(UserDTO)              -> cria User(role=cliente)  + Client
 *   cadastrarArtista(RegisterArtistaDTO)   -> cria User(role=tatuador) + Artist
 *   cadastrarEstudio(RegisterEstudioDTO)   -> cria User(role=estudio)  + Studio
 *
 * Cada metodo segue o mesmo padrao:
 *  1. construirUser(...) — monta a entidade User com senha BCrypt e role
 *     hardcoded (NUNCA do payload — fecha vetor de spoof).
 *  2. userRepository.save — persiste a linha em `users`.
 *  3. delega ao service do aggregate (Client/Artist/Studio) pra criar a
 *     linha filha vinculada via user_id.
 *
 * @Transactional:
 *  - Garante que se a etapa 3 falhar, a etapa 2 sofre rollback. Sem isso,
 *    um erro ao criar o Artist deixaria um User orfao em `users` que
 *    bloqueia o re-cadastro (UNIQUE em email).
 *  - Tambem necessario pro deleteByEmail (derived query JPA exige tx).
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
        // Estudio e PJ — dataNasc e cpf nao se aplicam (ficam null em users).
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

    /**
     * Helper privado — concentra a montagem do User pra evitar copy-paste
     * dos 3 metodos publicos. Aplica BCrypt na senha aqui (cripto fica
     * encapsulada no service; controller/DTO nao tocam).
     */
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
