package com.rabisko.mvp.domain.studio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

/*
 * Realinhamento ao schema do Supabase (tabela "public.estudios"):
 *
 *  - PK UUID.
 *  - cnpj UNIQUE mas nullable (segue o schema; antes eu tinha
 *    nullable=false).
 *  - O `horarioFuncionamento` único (java.sql.Time) virou um par
 *    horario_abertura + horario_fechamento (LocalTime, idiomático).
 *  - Novo: telefone (varchar nullable).
 *  - Removido: endereco. No Supabase os endereços moram numa tabela
 *    polimórfica `enderecos` (owner_id + owner_type) que aponta para
 *    estudios/tatuadores/etc. Fora do escopo do cadastro.
 *  - data_criacao com @CreationTimestamp pelos mesmos motivos de User.
 */
@Entity
@Table(name = "estudios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "estudioId")
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "estudio_id", updatable = false, nullable = false)
    private UUID estudioId;

    /*
     * FK pro User dono do estúdio. Espelha o pattern de Artist.userId /
     * Client.userId — sem isso, o estúdio fica órfão (não dá pra saber
     * qual User logado é dono). UNIQUE: cada User com role=estudio só
     * gerencia 1 estúdio (decisão deliberada pra MVP — multi-estúdio
     * por dono fica fora de escopo).
     */
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String nome;

    @Column(name="email", nullable = false)
    private String email;

    @Column(unique = true)
    private String cnpj;

    private String telefone;

    /*
     * Endereco do estudio. Mesma decisao do Artist.endereco — texto livre no
     * MVP, migrar pra @OneToOne com `enderecos` quando a entity existir.
     */
    private String endereco;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;

    /*
     * termos_aceitos vive em `users` — o aceite e do usuario dono, nao do
     * estudio. RegisterEstudioDTO ainda valida o checkbox via @AssertTrue,
     * mas o valor e propagado pra User.termosAceitos no
     * UserService.construirUser, nao aqui.
     */
}
