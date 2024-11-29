package com.example.kanbanboardase.kanbanboardase.response;

import com.example.kanbanboardase.kanbanboardase.entity.Board;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildResponse {

    private String id;
    private String name;
    private String description;
    private Boolean isPublic;
    private String data;
    private UserResponse user;

    public static BuildResponse fromEntity(Board board) {
        User user = board.getUser();

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();


        BuildResponse buildResponse = BuildResponse.builder()
                .id(board.getId())
                .name(board.getName())
                .description(board.getDescription())
                .isPublic(board.getIsPublic())
                .data(board.getData())
                .user(userResponse)
                .build();

        return buildResponse;
    }
}