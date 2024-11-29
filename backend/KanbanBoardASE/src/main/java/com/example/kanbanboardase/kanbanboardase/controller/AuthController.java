package com.example.kanbanboardase.kanbanboardase.controller;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.LoginUserDto;
import com.example.kanbanboardase.kanbanboardase.service.Auth.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final IAuthService authService;

    @Autowired
    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/verify-login")
    public ResponseEntity<ServiceResponse<String>> verifyLogin(@RequestBody LoginUserDto loginUserDto) {
        ServiceResponse<String> response = authService.verifyLogin(loginUserDto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ServiceResponse<String>> register(@RequestBody CreateUserDto createUserDto) {
        ServiceResponse<String> response = authService.register(createUserDto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }


}
