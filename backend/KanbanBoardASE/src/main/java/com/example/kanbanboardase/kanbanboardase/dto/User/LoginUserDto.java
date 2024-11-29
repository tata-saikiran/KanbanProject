package com.example.kanbanboardase.kanbanboardase.dto.User;

public class LoginUserDto {
    private String emailOrUsername;
    private String password;

    public String getEmailOrUsername() {
        return emailOrUsername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}