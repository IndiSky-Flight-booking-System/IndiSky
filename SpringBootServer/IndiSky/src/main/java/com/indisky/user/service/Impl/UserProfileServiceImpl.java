package com.indisky.user.service.Impl;

import com.indisky.auth.jwt.JwtService;
import com.indisky.enums.Role;
import com.indisky.repository.UserRepository;
import com.indisky.entities.User;
import com.indisky.user.dto.UserRequestDto;
import com.indisky.user.service.UserProfileService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private AuthenticationManager authManager;
    private JwtService jwtService;

    @Override
    public String register(UserRequestDto userdto) {

        User userEntity = userRepository.findByEmail(userdto.getEmail());
        if(userEntity!=null){
            return "User Already Registered with Email id- " + userEntity.getEmail();
        }

        User user = modelMapper.map(userdto, User.class);
        if(user!=null){
            user.setPersonRole(Role.USER);
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userRepository.save(user);
            return user.getFullName() + " Registered Successfully!";
        }
        return "Failed to Registered!";
    }


    @Override
    public String updateUser(UserRequestDto userdto, String email) {
        //        String email = from security  and remove email from parameter
                User user = userRepository.findByEmail(email);
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

         userRepository.save(user);

        return "User Updated Successfully";
    }

    @Override
    public String verify(UserRequestDto userRequestDto) {

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                userRequestDto.getEmail(),userRequestDto.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(userRequestDto.getEmail());
        }
        return null;
    }

}
