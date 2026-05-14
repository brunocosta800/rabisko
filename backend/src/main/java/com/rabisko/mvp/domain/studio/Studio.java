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

    @Column(nullable = false)
    private String nome;

    @Column(unique = true)
    private String cnpj;

    private String telefone;

    @Column(name = "horario_abertura")
    private LocalTime horarioAbertura;

    @Column(name = "horario_fechamento")
    private LocalTime horarioFechamento;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
