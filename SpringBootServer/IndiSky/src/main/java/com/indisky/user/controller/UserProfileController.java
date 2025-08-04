package com.indisky.user.controller;

import com.indisky.user.dto.UserDto;
import com.indisky.user.dto.UserProfileDto;
import com.indisky.user.service.UserProfileService;
import com.indisky.entities.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  //react js localhost (frontend)
@AllArgsConstructor
@RequestMapping("/user")
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserDto user){

        if(service.isEmailRegistered(user.getEmail())){
            return ResponseEntity.status(HttpStatus.OK).body("User Already Registered with Email id- " + user.getEmail());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(user));
    }

    @PostMapping("/update/{email}")
    public ResponseEntity<String> userUpdate(@RequestBody UserProfileDto dto ,@PathVariable("email") String email){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.updateUser(dto,email));
    }
}
