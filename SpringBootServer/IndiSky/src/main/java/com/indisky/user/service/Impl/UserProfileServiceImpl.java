package com.indisky.user.service.Impl;

import com.indisky.enums.Role;
import com.indisky.repository.UserRepository;
import com.indisky.entities.User;
import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;
import com.indisky.user.service.UserProfileService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private UserRepository repo;

    ModelMapper modelMapper;



    @Override
    public ResponseEntity<UserResponseDto> register(UserRequestDto userRequestDto) {

        if( repo.findByEmail(userRequestDto.getEmail()) !=null){
            return new ResponseEntity<>(modelMapper.map(userRequestDto,UserResponseDto.class),HttpStatus.BAD_REQUEST);

        }

        User user = modelMapper.map(userRequestDto , User.class);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setPersonRole(Role.USER);
        repo.save(user);

        UserResponseDto response = modelMapper.map(user,UserResponseDto.class);

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

}
