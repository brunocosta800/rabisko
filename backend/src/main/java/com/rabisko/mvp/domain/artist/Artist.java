package com.rabisko.mvp.domain.artist;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "artists")
@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "tatuadorId")
public class Artist {
    @Id
    private String tatuadorId;
    private String estudioId;
    private String userId;
    private ArrayList<String> estilos;
    private boolean boostPremium;
}
