package com.indisky.exception;

@SuppressWarnings("Serial")
public class ResourceNotFoundException extends  RuntimeException{
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
