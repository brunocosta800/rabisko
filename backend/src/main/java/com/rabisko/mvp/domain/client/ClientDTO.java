package com.rabisko.mvp.domain.client;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class ClientDTO {
    @Id
    private String clientId;
    private String userId;
    private String[] dadosPagamento;
}
