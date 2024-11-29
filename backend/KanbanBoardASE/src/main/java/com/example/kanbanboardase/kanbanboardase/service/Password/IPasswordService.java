package com.example.kanbanboardase.kanbanboardase.service.Password;

public interface IPasswordService {
    String hashPassword(String password);

    boolean verifyPassword(String rawPassword, String encodedPassword);
}
