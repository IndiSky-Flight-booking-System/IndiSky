package com.indisky.user.dto;


import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponseDto {

    private String fullName;

    private String email;

    private String password;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "passport_no")
    private String passportNo;

    @Column(name = "dob")
    private LocalDate birthDate;
}
