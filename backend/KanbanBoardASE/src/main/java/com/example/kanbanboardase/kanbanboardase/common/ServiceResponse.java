package com.example.kanbanboardase.kanbanboardase.common;

public class ServiceResponse<T> {
    private final String message;
    private final T data;
    private boolean success = true;

    public ServiceResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public ServiceResponse(String message, boolean success, T data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }

    public ServiceResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        this.data = null;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
