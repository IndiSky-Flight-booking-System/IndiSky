package com.indisky.user.service;

import com.indisky.entities.User;
import com.indisky.user.dto.UserDto;
import com.indisky.user.dto.UserProfileDto;

public interface UserProfileService {
    String register(UserDto userddto);

    boolean isEmailRegistered(String email);

//    UserProfileDto getUserProfile();

    String updateUser(UserProfileDto userdto,String email);

}
