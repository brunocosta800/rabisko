package com.rabisko.mvp.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "userId")
public class User implements UserDetails {
    @Id
    private String userId;
    private String nome;
    @Indexed(unique = true)
    @Email
    private String email;
    @Size(min = 8)
    private String senha;
    private Date dataNasc;
    @Indexed(unique = true)
    private String cpf;
    private UserRole role;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataModificacao;
    private boolean status;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else if (this.role == UserRole.CLIENT)
            return List.of(new SimpleGrantedAuthority(("ROLE_CLIENT")));
        else if (this.role == UserRole.TATUADOR)
            return List.of(new SimpleGrantedAuthority(("ROLE_TATUADOR")));
        else
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
