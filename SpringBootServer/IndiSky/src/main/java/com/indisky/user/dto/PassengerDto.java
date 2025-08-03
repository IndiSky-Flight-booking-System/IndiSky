package com.indisky.user.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PassengerDto {
    private Integer passengerId;
    private String fullName;
    private LocalDate dob;
    private String nationality;
    private String passportNo;
}
