package com.indisky.user.service;

import com.indisky.entities.User;
import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserProfileService {
    ResponseEntity<UserResponseDto> register(UserRequestDto user);


}
