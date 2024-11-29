package com.example.kanbanboardase.kanbanboardase.controller;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.dto.Board.CreateBoardDto;
import com.example.kanbanboardase.kanbanboardase.dto.Board.UpdateBoardDto;
import com.example.kanbanboardase.kanbanboardase.response.BuildResponse;
import com.example.kanbanboardase.kanbanboardase.service.BoardService.IBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/board")
public class BoardController {
    private final IBoardService boardService;

    @Autowired
    public BoardController(IBoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/public")
    public ResponseEntity<ServiceResponse<List<BuildResponse>>> getPublicBoards() {
        ServiceResponse<List<BuildResponse>> response = boardService.getBoards();
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse<BuildResponse>> getUserById(@PathVariable String id) {
        ServiceResponse<BuildResponse> response = boardService.getById(id);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ServiceResponse<List<BuildResponse>>> getBoardsByUserId(@PathVariable String userId) {
        ServiceResponse<List<BuildResponse>> response = boardService.getBoardsByUserId(userId);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<String>> create(@RequestBody CreateBoardDto newBoard) {
        ServiceResponse<String> response = boardService.create(newBoard);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable String id) {
        ServiceResponse<Void> response = boardService.delete(id);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/toggle-public")
    public ResponseEntity<ServiceResponse<Void>> togglePublic(@PathVariable String id) {
        ServiceResponse<Void> response = boardService.togglePublic(id);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/update-data")
    public ResponseEntity<ServiceResponse<String>> updateData(@PathVariable String id, @RequestBody UpdateBoardDto updateBoardDto) {
        ServiceResponse<String> response = boardService.updateData(id, updateBoardDto);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
}
