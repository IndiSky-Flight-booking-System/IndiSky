package com.indisky.user.service;

import com.indisky.entities.User;

public interface UserProfileService {
    String register(User user);

    boolean isEmailRegistered(String email);
}
