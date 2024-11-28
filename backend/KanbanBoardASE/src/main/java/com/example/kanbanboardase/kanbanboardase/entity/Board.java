package com.example.kanbanboardase.kanbanboardase.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Board extends BaseEntity {
    @NotEmpty(message = "Name is required")
    @NotNull(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @Column(length = 500, nullable = false)
    @NotEmpty(message = "Description is required")
    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "isPublic is required")
    @Column(nullable = false)
    private Boolean isPublic = false;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    @NotNull(message = "Data is required")
    private String data;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull(message = "User is required")
    @JsonBackReference
    private User user;
}

