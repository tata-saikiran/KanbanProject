package com.example.kanbanboardase.kanbanboardase.service.Auth;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.LoginUserDto;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import com.example.kanbanboardase.kanbanboardase.service.Password.IPasswordService;
import com.example.kanbanboardase.kanbanboardase.service.User.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {

    private final IPasswordService passwordService;
    private final IUserService userService;

    @Autowired
    public AuthService(IPasswordService passwordService, IUserService userService) {
        this.passwordService = passwordService;
        this.userService = userService;
    }

    @Override
    public ServiceResponse<String> verifyLogin(LoginUserDto loginUserDto) {
        User user = userService.getByEmailOrUsername(loginUserDto.getEmailOrUsername());

        boolean isPasswordValid = passwordService.verifyPassword(loginUserDto.getPassword(), user.getPassword());
        if (!isPasswordValid) {
            return new ServiceResponse<>("Invalid credentials", false, null);
        }

        return new ServiceResponse<>("User verified successfully", true, user.getId());
    }

    @Override
    public ServiceResponse<String> register(CreateUserDto createUserDto) {
        ServiceResponse<String> userResponse = userService.create(createUserDto);

        if (userResponse.isSuccess()) {
            return new ServiceResponse<>("User created successfully", userResponse.getData());
        }

        return new ServiceResponse<>(userResponse.getMessage(), false, userResponse.getData());
    }
}
