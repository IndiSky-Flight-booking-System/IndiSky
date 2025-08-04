package com.indisky.user.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {
    private Long bookingId;
    private Long userId;
    private Long flightId;
    private BigDecimal totalPrice;
    private LocalDateTime bookingDate;
    private String status;
    private List<Long> ticketIds;
}
