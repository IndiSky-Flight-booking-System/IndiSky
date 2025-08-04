package com.indisky.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
public class TicketDto {

    @NotBlank(message = "Passenger name is required")
    private String passengerName;

    @NotBlank(message = "Seat number is required")
    private String seatNumber;

    // Optional: add age, gender, or passportNumber if needed
}
