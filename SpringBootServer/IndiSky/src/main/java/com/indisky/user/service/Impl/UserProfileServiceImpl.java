package com.indisky.user.service.Impl;

import com.indisky.enums.Role;
import com.indisky.repository.UserRepository;
import com.indisky.entities.User;
import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.dto.UserResponseDto;
import com.indisky.user.service.UserProfileService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository repo;
    private final ModelMapper modelMapper;

    @Override
    public String register(UserRequestDto userdto) {

        User userEntity = repo.findByEmail(userdto.getEmail());
        if(userEntity!=null){
            return "User Already Registered with Email id- " + userEntity.getEmail();
        }

        User user = modelMapper.map(userdto, User.class);
        if(user!=null){
            user.setPersonRole(Role.USER);
            repo.save(user);
            return user.getFullName() + " Registered Successfully!";
        }
        return "Failed to Registered!";
    }


    @Override
    public String updateUser(UserRequestDto userdto, String email) {
        //        String email = from security  and remove email from parameter
                User user = repo.findByEmail(email);
        System.out.println(user.toString());

         if(userdto.getFullName()!=null){
             user.setFullName(userdto.getFullName());
         }

         if(userdto.getEmail()!=null){
             user.setEmail(userdto.getEmail());
         }

         if(userdto.getBirthDate()!=null){
             user.setBirthDate(userdto.getBirthDate());
         }

         if(userdto.getPassportNo()!=null){
             user.setPassportNo(userdto.getPassportNo());
         }

         if(userdto.getPhoneNo()!=null){
             user.setPhoneNo(userdto.getPhoneNo());
         }

         if(userdto.getPassword()!=null && !userdto.getPassword().isEmpty()){
             user.setPassword(userdto.getPassword());
         }

         repo.save(user);

        return "User Updated Successfully";
    }

//    @Override
//    public UserResponseDto getUserProfile() {                //dashboard
////        String email = from security
////        User user = repo.findByEmail();
//        UserResponseDto dto = modelMapper.map(user, UserResponseDto.class);
//
//        return dto;
//    }



}
