package com.rabisko.mvp.domain.client;

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
 * Realinhamento ao schema do Supabase (tabela "public.clientes"):
 *
 *  - @Table apontando para "clientes" (classe Java continua Client).
 *  - PK UUID; user_id UUID UNIQUE.
 *  - dadosPagamento (List<String>, antes mapeada como @ElementCollection)
 *    deu lugar a um único campo varchar `dados_pagamento_token`. Pela
 *    cara é um token de cliente em gateway (Mercado Pago, Stripe...),
 *    coisa que o app provavelmente vai preencher depois do cadastro.
 *    Aqui ele já entra como null.
 *  - Adicionado data_criacao (@CreationTimestamp) — não existia na
 *    minha versão anterior, mas é coluna NOT NULL no schema.
 */
@Entity
@Table(name = "clientes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "clientId")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "cliente_id", updatable = false, nullable = false)
    private UUID clientId;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "dados_pagamento_token")
    private String dadosPagamentoToken;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
