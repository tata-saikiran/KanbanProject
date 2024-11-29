package com.example.kanbanboardase.kanbanboardase.service.BoardService;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.Board.CreateBoardDto;
import com.example.kanbanboardase.kanbanboardase.dto.Board.UpdateBoardDto;
import com.example.kanbanboardase.kanbanboardase.response.BuildResponse;

import java.util.List;

public interface IBoardService {

    ServiceResponse<List<BuildResponse>> getBoards();

    ServiceResponse<BuildResponse> getById(String id);

    ServiceResponse<String> updateData(String id, UpdateBoardDto updateBoardDto);

    ServiceResponse<String> create(CreateBoardDto newBoard);

    ServiceResponse<Void> delete(String id);

    ServiceResponse<List<BuildResponse>> getBoardsByUserId(String userId);

    ServiceResponse<Void> togglePublic(String id);


}
