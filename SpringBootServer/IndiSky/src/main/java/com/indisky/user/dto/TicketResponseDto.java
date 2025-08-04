package com.indisky.user.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TicketResponseDto {

    private String passengerName;

    private String seatNumber;

    private BigDecimal price;

}
