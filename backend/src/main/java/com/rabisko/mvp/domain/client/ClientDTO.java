package com.rabisko.mvp.domain.client;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/*
 * Realinhamento ao schema "clientes":
 *  - Ids para UUID.
 *  - dadosPagamento (array) virou dadosPagamentoToken (string única).
 */
@Getter
@Setter
public class ClientDTO {
    private UUID clientId;
    private UUID userId;
    private String dadosPagamentoToken;
}
