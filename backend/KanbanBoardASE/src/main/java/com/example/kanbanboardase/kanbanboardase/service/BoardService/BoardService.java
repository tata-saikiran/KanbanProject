package com.example.kanbanboardase.kanbanboardase.service.BoardService;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.Board.CreateBoardDto;
import com.example.kanbanboardase.kanbanboardase.dto.Board.UpdateBoardDto;
import com.example.kanbanboardase.kanbanboardase.entity.Board;
import com.example.kanbanboardase.kanbanboardase.entity.User;
import com.example.kanbanboardase.kanbanboardase.exception.NotFoundException;
import com.example.kanbanboardase.kanbanboardase.repository.BoardRepository;
import com.example.kanbanboardase.kanbanboardase.repository.UserRepository;
import com.example.kanbanboardase.kanbanboardase.response.BuildResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService implements IBoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ServiceResponse<List<BuildResponse>> getBoards() {
        List<Board> boards = boardRepository.findByIsPublic(true);

        List<BuildResponse> buildResponse = boards.stream()
                .map(BuildResponse::fromEntity)
                .collect(Collectors.toList());

        return new ServiceResponse<>("Board retrieved successfully", buildResponse);
    }

    @Override
    public ServiceResponse<BuildResponse> getById(String id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Board not found")
        );

        BuildResponse buildResponse = BuildResponse.fromEntity(board);
        return new ServiceResponse<>("Board retrieved successfully", buildResponse);
    }

    @Override
    public ServiceResponse<String> updateData(String id, UpdateBoardDto updateBoardDto) {
        Board existingBoard = boardRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Board not found")
        );

        existingBoard.setData(updateBoardDto.getData());
        boardRepository.save(existingBoard);
        return new ServiceResponse<>("Board updated successfully", existingBoard.getId());
    }

    @Override
    public ServiceResponse<String> create(CreateBoardDto newBoard) {
        User user = userRepository.findById(newBoard.getUserId()).orElseThrow(
                () -> new NotFoundException("User not found")
        );

        Board createdBoard = new Board();
        createdBoard.setUser(user);
        createdBoard.setName(newBoard.getName());
        createdBoard.setDescription(newBoard.getDescription());
        createdBoard.setIsPublic(newBoard.getIsPublic());
        createdBoard.setData(newBoard.getData());

        boardRepository.save(createdBoard);
        return new ServiceResponse<>("Board created successfully", createdBoard.getId());
    }

    @Override
    public ServiceResponse<Void> delete(String id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Board not found")
        );

        boardRepository.delete(board);
        return new ServiceResponse<>("Board deleted successfully", true, null);
    }

    @Override
    public ServiceResponse<List<BuildResponse>> getBoardsByUserId(String userId) {
        List<Board> boards = boardRepository.findByUserId(userId);

        List<BuildResponse> buildResponse = boards.stream()
                .map(BuildResponse::fromEntity)
                .collect(Collectors.toList());

        return new ServiceResponse<>("Boards retrieved successfully", buildResponse);
    }

    @Override
    public ServiceResponse<Void> togglePublic(String id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Board not found")
        );

        board.setIsPublic(!board.getIsPublic());
        boardRepository.save(board);
        return new ServiceResponse<>("Board updated successfully", null);
    }

}
