package com.example.kanbanboardase.kanbanboardase.service.Password;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService implements IPasswordService {

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public PasswordService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
