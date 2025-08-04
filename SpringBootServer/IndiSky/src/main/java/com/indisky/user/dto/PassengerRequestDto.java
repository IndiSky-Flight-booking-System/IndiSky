package com.indisky.user.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassengerRequestDto {
    private String fullName;
    private LocalDate dob;
    private String passportNo;
    private String nationality;
}
