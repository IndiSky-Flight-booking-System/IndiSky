package com.indisky.user.dto;

import com.indisky.enums.FlightStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FlightStatusDto {
    private Long flightId;
    private FlightStatus currentStatus;
    private LocalDateTime updatedAt;
}
