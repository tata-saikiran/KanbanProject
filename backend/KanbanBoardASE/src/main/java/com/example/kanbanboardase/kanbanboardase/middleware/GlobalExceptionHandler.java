package com.example.kanbanboardase.kanbanboardase.middleware;

import com.example.kanbanboardase.kanbanboardase.common.ServiceResponse;
import com.example.kanbanboardase.kanbanboardase.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ServiceResponse<String>> handleUserNotFoundException(NotFoundException ex) {
        ServiceResponse<String> errorResponse = new ServiceResponse<>(ex.getMessage(), false, null);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ServiceResponse<String>> handleException(Exception ex) {
        ServiceResponse<String> errorResponse = new ServiceResponse<>(ex.getMessage(), false, null);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
