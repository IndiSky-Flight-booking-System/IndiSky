package com.indisky.user.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingConfirmationDto {
    private Long bookingId;
    private String userFullName;
    private String flightNumber;
    private LocalDateTime bookingDate;
    private String flightStatus;
    private BigDecimal totalPrice;
    private List<String> passengerNames;
    private List<String> seatNumbers;
}
