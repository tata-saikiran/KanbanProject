package com.example.kanbanboardase.kanbanboardase.seeder;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.Board.CreateBoardDto;
import com.example.kanbanboardase.kanbanboardase.dto.User.CreateUserDto;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import com.example.kanbanboardase.kanbanboardase.response.BuildResponse;
import com.example.kanbanboardase.kanbanboardase.service.BoardService.BoardService;
import com.example.kanbanboardase.kanbanboardase.service.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements ApplicationRunner {

    private final UserService userService;
    private final BoardService boardService;

    @Autowired
    public DatabaseSeeder(UserService userService, BoardService boardService) {
        this.userService = userService;
        this.boardService = boardService;
    }

    @Override
    public void run(ApplicationArguments args) {


        ServiceResponse<List<User>> users = userService.findAll();
        if (users.isSuccess()) {
            if (users.getData().isEmpty()) {
                CreateUserDto newUser = new CreateUserDto();
                newUser.setName("John Doe");
                newUser.setEmail("john@app.com");
                newUser.setUsername("john");
                newUser.setPassword("password");


                ServiceResponse<String> user = userService.create(newUser);

                ServiceResponse<List<BuildResponse>> boards = boardService.getBoards();
                if (boards.isSuccess() && !boards.getData().isEmpty()) {
                    CreateBoardDto newBoard = CreateBoardDto.builder()
                            .name("Board 1")
                            .isPublic(true)
                            .data("[]")
                            .userId(user.getData())
                            .build();

                    boardService.create(newBoard);
                }
            }
        }


    }
}
