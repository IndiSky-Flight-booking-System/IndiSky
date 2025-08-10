package com.indisky.admin.dto;

import com.indisky.entities.Booking;
import com.indisky.enums.Role;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AdminUserDto {
    private Long id;

    private String fullName;

    private Role personRole;

    private String email;

    private String phoneNo;

    private String passportNo;

    private LocalDate birthDate;
}
