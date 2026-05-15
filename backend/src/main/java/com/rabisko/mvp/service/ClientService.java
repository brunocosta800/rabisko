package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.client.Client;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Cria a linha em `clientes`. O cliente nao tem campos proprios no
 * cadastro — so o vinculo com o User. dadosPagamentoToken (token de
 * gateway tipo Mercado Pago/Stripe) entra depois, quando o usuario
 * cadastrar um metodo de pagamento.
 *
 * Por isso o cadastrarCliente recebe so o User salvo (nao um DTO) — nao
 * ha nada extra do payload pra plumbar aqui.
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client cadastrarCliente(User user) {
        Client novoClient = Client.builder()
                .userId(user.getUserId())
                .build();

        return clientRepository.save(novoClient);
    }
}
