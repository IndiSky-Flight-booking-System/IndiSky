package com.indisky.admin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AdminPassengerDto {

    private String fullName;

    private LocalDate dob;

    private String passportNo;

    private String nationality;
}
