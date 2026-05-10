package com.rabisko.mvp.domain.user;

public enum UserRole {
    ADMIN("admin"),
    USER("user"),
    CLIENT("cliente"),
    TATUADOR("tatuador");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
