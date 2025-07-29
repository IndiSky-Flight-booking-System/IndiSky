package com.indisky.user.controller;

import com.indisky.user.service.UserProfileService;
import com.indisky.entities.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody  User user){

        if(service.isEmailRegistered(user.getEmail())){
            return ResponseEntity.status(HttpStatus.FOUND).body("User Already Registered with Email id- " + user.getEmail());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(user));
    }
}
