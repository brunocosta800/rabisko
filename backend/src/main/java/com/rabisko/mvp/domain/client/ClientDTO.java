package com.rabisko.mvp.domain.client;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * DTO do cliente — usado para futuras rotas de pagamento (cadastro/edicao
 * de metodo de pagamento). Nao serve pra cadastro inicial: o cliente nao
 * tem campos exclusivos no momento do cadastro (so o vinculo userId, que
 * o ClientService cria a partir do User salvo).
 *
 * dadosPagamentoToken: token de cliente em gateway (Mercado Pago/Stripe).
 */
@Getter
@Setter
public class ClientDTO {

    private UUID clientId;
    private UUID userId;
    private String dadosPagamentoToken;
}
