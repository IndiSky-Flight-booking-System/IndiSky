package com.indisky.user.dto;

import com.indisky.enums.Role;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequestDto {
    private Role personRole;

    private String fullName;

    private String email;

    private String password;

    private String phoneNo;

    private String passportNo;

    private LocalDate birthDate;
}
