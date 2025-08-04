package com.indisky.user.dto;

import com.indisky.entities.Booking;
import com.indisky.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class UserProfileDto {

    private Role personRole;

    private String fullName;

    private String email;

    private String password;

    private String phoneNo;

    private String passportNo;

    private LocalDate birthDate;

    private List<Booking> bookings;
}
