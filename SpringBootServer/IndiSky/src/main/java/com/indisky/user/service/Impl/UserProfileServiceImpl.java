package com.indisky.user.service.Impl;

import com.indisky.repository.UserRepository;
import com.indisky.entities.User;
import com.indisky.user.dto.UserDto;
import com.indisky.user.dto.UserProfileDto;
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
    public String register(UserDto userdto) {
        User user = modelMapper.map(userdto, User.class);
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


    @Override
    public String updateUser(UserProfileDto userdto,String email) {
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
//    public UserProfileDto getUserProfile() {                //dashboard
////        String email = from security
////        User user = repo.findByEmail();
//        UserProfileDto dto = modelMapper.map(user, UserProfileDto.class);
//
//        return dto;
//    }



}
