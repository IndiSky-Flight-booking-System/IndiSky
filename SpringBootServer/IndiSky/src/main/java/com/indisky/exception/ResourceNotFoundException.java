package com.indisky.exception;

public class ResourceNotFoundException extends RuntimeException{

//    public ResourceNotFoundException(String  msg){
//        super(msg);

    public ResourceNotFoundException(String mesg) {
        super(mesg);
}
}
