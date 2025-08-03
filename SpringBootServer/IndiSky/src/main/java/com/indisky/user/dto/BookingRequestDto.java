package com.indisky.user.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {
    private Long userId;
    private Long flightId;
    private List<Long> passengerIds;
    private List<Long> seatIds;
    private BigDecimal totalPrice;
    private String ticketClass; // Add this
    private String ticketType;  // And this
}
