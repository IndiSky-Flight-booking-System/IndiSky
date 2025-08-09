package com.indisky.user.controller;

import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.service.UserProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")  //react js localhost (frontend)
@AllArgsConstructor
@RequestMapping("/user")
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRequestDto user){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserRequestDto userRequestDto){


        System.out.println("Inside Login user:" + userRequestDto );
        String token = service.verify(userRequestDto);

        if (token != null) {
            return ResponseEntity.status(HttpStatus.OK).body(token);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/update/{email}")
    public ResponseEntity<String> userUpdate(@RequestBody UserRequestDto dto , @PathVariable("email") String email){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.updateUser(dto,email));
    }
}
