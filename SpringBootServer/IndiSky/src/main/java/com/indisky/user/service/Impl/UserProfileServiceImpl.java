package com.indisky.user.service;

import com.indisky.repository.UserRepository;
import com.indisky.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserProfileServiceImpl implements  UserProfileService{

    private final UserRepository repo;

    @Override
    public String register(User user) {
        if(user!=null){
            repo.save(user);
            return user.getFullName() + " Registered Successfully!";
        }
        return "Failed to Registered!";
    }

    @Override
    public boolean isEmailRegistered(String email) {
        return  repo.findByEmail(email) !=null;
    }
}
