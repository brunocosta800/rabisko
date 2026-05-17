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

/**
 * Linha em `clientes` — materializa o papel "cliente" de um User. Aggregate
 * minimo: so o vinculo com o User + um campo de pagamento que entra depois.
 *
 * dadosPagamentoToken: token de cliente em gateway (Mercado Pago, Stripe,
 * etc.). Fica null no cadastro inicial e e preenchido quando o usuario
 * cadastrar metodo de pagamento na tela de Settings.
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

    /** FK pro User. UNIQUE: cada User com role=cliente tem 1 perfil. */
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "dados_pagamento_token")
    private String dadosPagamentoToken;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
}
