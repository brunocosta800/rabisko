package com.rabisko.mvp.domain.artist;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/*
 * Tabela "tatuadores" no Supabase. Aggregate enxuto: guarda APENAS o que e
 * proprio do tatuador. Dados pessoais (nome/email/cpf/telefone/senha) vivem
 * no `users` — quando precisar deles, faz JOIN via user_id ou consulta o
 * UserRepository com o userId daqui.
 *
 * Ja teve nome/email/senha_hash/cpf/telefone duplicados aqui — removidos
 * porque (1) o schema do Supabase nao tem essas colunas em `tatuadores`,
 * e (2) duplicar dado vira problema de sincronizacao quando o usuario
 * editar o proprio perfil. bio e instagram FICAM, sao de fato exclusivos
 * do papel artista.
 */
@Entity
@Table(name = "tatuadores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "tatuadorId")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "tatuador_id", updatable = false, nullable = false)
    private UUID tatuadorId;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    /*
     * estudio_id e nullable: tatuador autonomo (sem estudio) tem essa
     * coluna como NULL e usa o proprio `endereco` abaixo pra que clientes
     * saibam onde encontra-lo. Quando vinculado a estudio, pode ser null
     * tambem — o endereco do estudio supre.
     */
    @Column(name = "estudio_id")
    private UUID estudioId;

    /*
     * Endereco do tatuador autonomo. Texto livre por enquanto (MVP). Quando
     * a tabela polimorfica `enderecos` (owner_id + owner_type) virar uma
     * entity JPA, migrar este campo pra um @OneToOne com `enderecos`.
     */
    private String endereco;

    private String bio;

    private String instagram;

    @Column(name = "vinculado_estudio", nullable = false)
    private boolean vinculadoEstudio;

    /*
     * termos_aceitos vive em `users` — o aceite e do usuario, nao do papel.
     * O DTO de cadastro (RegisterArtistaDTO) ainda valida o checkbox via
     * @AssertTrue, mas o valor e propagado pra User.termosAceitos no
     * UserService.construirUser, nao aqui.
     */

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
