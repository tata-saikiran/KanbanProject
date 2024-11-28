package com.example.kanbanboardase.kanbanboardase.controller;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserPasswordDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserUsernameDto;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import com.example.kanbanboardase.kanbanboardase.service.User.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ServiceResponse<List<User>>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse<User>> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<ServiceResponse<User>> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getByUsername(username));
    }

    @PutMapping("/{id}/username")
    public ResponseEntity<ServiceResponse<String>> updateUsername(@PathVariable String id, @RequestBody UpdateUserUsernameDto updateUserUsernameDto) {
        ServiceResponse<String> response = userService.updateUsername(id, updateUserUsernameDto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<ServiceResponse<String>> updatePassword(@PathVariable String id, @RequestBody UpdateUserPasswordDto updateUserPasswordDto) {
        ServiceResponse<String> response = userService.updatePassword(id, updateUserPasswordDto);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
}
