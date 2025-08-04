package com.indisky.user.dto;

import com.indisky.entities.Booking;
import com.indisky.enums.Role;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserDto {

    private Role personRole;

    private String fullName;

    private String email;

    private String password;

    private String phoneNo;

    private String passportNo;

    private LocalDate birthDate;

    private List<Booking> bookings;
}
