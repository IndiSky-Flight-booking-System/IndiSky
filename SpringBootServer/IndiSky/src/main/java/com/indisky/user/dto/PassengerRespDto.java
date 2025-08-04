package com.indisky.user.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PassengerRespDto {
    private Long passengerId;
    private String fullName;
    private LocalDate dob;
    private String passportNo;
    private String nationality;

//    private List<Integer> ticketIds;
}
