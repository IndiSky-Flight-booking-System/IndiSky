package com.indisky.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }



    //bELOW CODE is FOR validation purpose only

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<?> handleMethodArgumentNotValidException (MethodArgumentNotValidException e){
//        //this is used for @valid to validate the fail
//
//        List<FieldError> fieldErrors =e.getFieldErrors();
//        //but we want msg + field name so will be using hashmap
//        Map<String,String> map = new HashMap<>();
//        fieldErrors.forEach(fe -> {
//            map.put(fe.getField(), fe.getDefaultMessage());
//        });
//
////        Set<String> set = new HashSet<>();     using hashset -> msg only not feild name
////        fieldErrors.forEach(fe -> {
////            set.add(fe.getDefaultMessage());
////        });
//
//
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
//    }
}
