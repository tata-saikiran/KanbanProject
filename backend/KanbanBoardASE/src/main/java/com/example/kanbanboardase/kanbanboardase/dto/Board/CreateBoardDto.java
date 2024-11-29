package com.example.kanbanboardase.kanbanboardase.dto.Board;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateBoardDto {
    private String userId;
    private String name;
    private String description;
    private Boolean isPublic;
    private String data;
}
