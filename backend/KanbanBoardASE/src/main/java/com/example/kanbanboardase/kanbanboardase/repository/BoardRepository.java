package com.example.kanbanboardase.kanbanboardase.repository;

import com.example.kanbanboardase.kanbanboardase.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, String> {
    List<Board> findByUserId(String userId);

    List<Board> findByIsPublic(boolean isPublic);
}
