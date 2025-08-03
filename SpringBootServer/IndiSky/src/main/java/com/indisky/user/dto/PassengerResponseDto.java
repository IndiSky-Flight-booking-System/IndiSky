package com.indisky.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassengerResponseDto {
    private Long passengerId;
    private String fullName;
    private String passportNo;
    private String nationality;
}
