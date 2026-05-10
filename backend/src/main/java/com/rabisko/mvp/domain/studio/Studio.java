package com.rabisko.mvp.domain.studio;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Time;
import java.time.LocalDateTime;

@Document(collection = "studios")
@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "estudioId")
public class Studio {
    @Id
    private String estudioId;
    private String nome;
    private String endereco;
    @Indexed(unique = true)
    private String cnpj;
    private Time horarioFuncionamento;
    private LocalDateTime dataCriacao;
}
