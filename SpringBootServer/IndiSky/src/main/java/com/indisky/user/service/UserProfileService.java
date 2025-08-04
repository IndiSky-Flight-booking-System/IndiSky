package com.indisky.user.service;

import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;

public interface UserProfileService {
    String register(UserRequestDto userddto);

//    boolean isEmailRegistered(String email);

//    UserResponseDto getUserProfile();

    String updateUser(UserRequestDto userdto, String email);

}
