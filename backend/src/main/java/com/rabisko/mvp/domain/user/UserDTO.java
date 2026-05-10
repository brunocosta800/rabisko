package com.rabisko.mvp.domain.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class UserDTO {
    @Id
    private String userId;
    private String nome;
    private String email;
    private String senha;
    private Date dataNasc;
    private String cpf;
    private UserRole role;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataModificacao;
    private boolean status;
}
