package com.rabisko.mvp.service;

import com.rabisko.mvp.domain.client.Client;
import com.rabisko.mvp.domain.user.User;
import com.rabisko.mvp.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;
    public Client cadastrarCliente(User body){
        Client novoClient = Client.builder()
                .userId(body.getUserId())
                .dadosPagamento(new ArrayList<String>())
                .build();

        return clientRepository.save(novoClient);
    }
}
