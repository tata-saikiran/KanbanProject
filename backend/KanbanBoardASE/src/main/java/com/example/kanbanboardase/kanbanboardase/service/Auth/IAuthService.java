package com.example.kanbanboardase.kanbanboardase.service.Auth;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.LoginUserDto;

public interface IAuthService {
    ServiceResponse<String> verifyLogin(LoginUserDto loginUserDto);

    ServiceResponse<String> register(CreateUserDto createUserDto);
}
