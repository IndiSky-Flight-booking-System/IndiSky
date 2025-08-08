package com.indisky.admin.dto;

import com.indisky.enums.TicketClass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FlightSeatDto {
    private Long seatId;

    @NotBlank(message = "Seat number is required")
    private String seatNumber;

    @NotNull(message = "Seat class is required")
    private TicketClass seatClass;


    private Long flightId;

    private boolean booked;
    private String flightNumber;
}
