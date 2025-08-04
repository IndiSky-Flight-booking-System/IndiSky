package com.indisky.user.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserBookingDto {
    private Long bookingId;
    private String flightNumber;
    private LocalDateTime bookingDate;
    private String bookingStatus;
    private BigDecimal totalPrice;
}
