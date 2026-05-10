package com.rabisko.mvp.domain.artist;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class ArtistDTO {
    @Id
    private String tatuadorId;
    private String estudioId;
    private String userId;
    private String[] estilos;
    private boolean boostPremium;
}
