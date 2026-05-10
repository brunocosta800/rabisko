package com.rabisko.mvp.domain.client;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "clients")
@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "clientId")
public class Client {
    @Id
    private String clientId;
    private String userId;
    private ArrayList<String> dadosPagamento;
}
