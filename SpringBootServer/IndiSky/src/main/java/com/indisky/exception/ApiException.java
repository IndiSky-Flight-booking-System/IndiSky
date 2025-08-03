package com.indisky.exception;

public class ApiException extends RuntimeException{
    public ApiException(String mesg) {
        super(mesg);
    }

}