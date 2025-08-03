package com.indisky.admin.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class FlightAdminDto {

    private Long flightId;

    @NotBlank(message = "Flight number is required")
    private String flightNumber;

    @NotNull(message = "Departure time is required")
    private LocalDateTime departureTime;

    @NotNull(message = "Arrival time is required")
    private LocalDateTime arrivalTime;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal basePrice;

    @NotBlank(message = "Status is required")
    private String status; // Enum as String

    @NotNull(message = "Airline ID is required")
    private Long airlineId;

    @NotNull(message = "Source airport ID is required")
    private Long sourceAirportId;

    @NotNull(message = "Destination airport ID is required")
    private Long destinationAirportId;
}