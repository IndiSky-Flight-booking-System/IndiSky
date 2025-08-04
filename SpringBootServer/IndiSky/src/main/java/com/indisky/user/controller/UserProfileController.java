package com.indisky.user.controller;

import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;
import com.indisky.user.service.UserProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  //react js localhost (frontend)
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserRequestDto user){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(user));
    }

    @PostMapping("/update/{email}")
    public ResponseEntity<String> userUpdate(@RequestBody UserRequestDto dto , @PathVariable("email") String email){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.updateUser(dto,email));
    }
}
