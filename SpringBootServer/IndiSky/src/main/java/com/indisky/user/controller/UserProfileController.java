package com.indisky.user.controller;

import com.indisky.user.dto.UserProfileDto;
import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;
import com.indisky.user.service.UserProfileService;
import com.indisky.entities.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserRequestDto user){
        return service.register(user);
    }

    @PostMapping("/update/{email}")
    public ResponseEntity<String> userUpdate(@RequestBody UserProfileDto dto , @PathVariable("email") String email){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.updateUser(dto,email));
    }
}
