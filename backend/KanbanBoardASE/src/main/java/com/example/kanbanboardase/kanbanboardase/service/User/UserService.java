package com.example.kanbanboardase.kanbanboardase.service.User;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserPasswordDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.UpdateUserUsernameDto;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import com.example.kanbanboardase.kanbanboardase.exception.NotFoundException;
import com.example.kanbanboardase.kanbanboardase.repository.UserRepository;
import com.example.kanbanboardase.kanbanboardase.service.Password.IPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final IPasswordService passwordService;

    @Autowired
    public UserService(UserRepository userRepository, IPasswordService passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }

    @Override
    public ServiceResponse<List<User>> findAll() {
        List<User> users = userRepository.findAll();
        return new ServiceResponse<>("Users retrieved successfully", users);
    }

    @Override
    public ServiceResponse<User> getById(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        return new ServiceResponse<>("User retrieved successfully", user);
    }

    @Override
    public ServiceResponse<String> create(CreateUserDto userDto) {
        if (emailExists(userDto.getEmail())) {
            return new ServiceResponse<>("Email already exists", false, null);
        }

        if (usernameExists(userDto.getUsername())) {
            return new ServiceResponse<>("Username already exists", false, null);
        }

        String hashedPassword = passwordService.hashPassword(userDto.getPassword());

        User newUser = new User();
        newUser.setName(userDto.getName());
        newUser.setEmail(userDto.getEmail());
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(hashedPassword);

        User createdUser = userRepository.save(newUser);
        return new ServiceResponse<>("User created successfully", createdUser.getId());
    }

    @Override
    public ServiceResponse<String> updateUsername(String id, UpdateUserUsernameDto updateUserUsernameDto) {
        User existingUser = userRepository.findById(id).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        existingUser.setUsername(updateUserUsernameDto.getUsername());
        User updatedUser = userRepository.save(existingUser);
        return new ServiceResponse<>("Username updated successfully", updatedUser.getId());
    }

    @Override
    public ServiceResponse<String> updatePassword(String userId, UpdateUserPasswordDto updateUserPasswordDto) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        String hashedPassword = passwordService.hashPassword(updateUserPasswordDto.getPassword());
        existingUser.setPassword(hashedPassword);
        User updatedUser = userRepository.save(existingUser);
        return new ServiceResponse<>("Password updated successfully", updatedUser.getId());
    }

    @Override
    public ServiceResponse<User> getByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        return new ServiceResponse<>("User retrieved successfully", user);
    }

    @Override
    public User getByEmailOrUsername(String emailOrUsername) {
        Optional<User> existingUserByEmail = userRepository.findByEmail(emailOrUsername);
        if (existingUserByEmail.isPresent()) {
            return existingUserByEmail.get();
        }

        Optional<User> existingUserByUsername = userRepository.findByUsername(emailOrUsername);
        if (existingUserByUsername.isPresent()) {
            return existingUserByUsername.get();
        }

        throw new NotFoundException("User not found");
    }


    @Override
    public boolean emailExists(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return user != null;
    }

    @Override
    public boolean usernameExists(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        return user != null;
    }

}