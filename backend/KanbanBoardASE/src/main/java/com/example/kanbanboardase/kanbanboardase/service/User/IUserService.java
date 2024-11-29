package com.example.kanbanboardase.kanbanboardase.service.User;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserPasswordDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserUsernameDto;
import com.example.kanbanboardase.kanbanboardase.entity.User;

import java.util.List;

public interface IUserService {
    ServiceResponse<List<User>> findAll();

    ServiceResponse<User> getById(String id);

    ServiceResponse<String> create(CreateUserDto userDto);

    ServiceResponse<String> updateUsername(String id, UpdateUserUsernameDto updateUserUsernameDto);

    ServiceResponse<String> updatePassword(String userId, UpdateUserPasswordDto updateUserPasswordDto);

    ServiceResponse<User> getByUsername(String username);

    User getByEmailOrUsername(String emailOrUsername);

    boolean emailExists(String email);

    boolean usernameExists(String username);
}
