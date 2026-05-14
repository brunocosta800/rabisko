package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.client.Client;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Realinhamento ao schema "clientes":
 *  - body.getUserId() agora devolve UUID.
 *  - dadosPagamento (lista) saiu; o schema tem uma única string
 *    `dados_pagamento_token` que é preenchida quando o cliente
 *    cadastrar método de pagamento (Mercado Pago, etc.). No cadastro
 *    inicial fica null — só criamos a linha com o vínculo ao usuário.
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client cadastrarCliente(User body){
        Client novoClient = Client.builder()
                .userId(body.getUserId())
                .build();

        return clientRepository.save(novoClient);
    }
}
