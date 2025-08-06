package com.indisky.user.dto;

import com.indisky.enums.PaymentMethod;
import lombok.*;

import java.util.List;

@Data
public class PaymentRequestDto {
    private Long bookingId;
    private double amountPaid;
    private PaymentMethod paymentMethod;
    private List<Long> passengerIds;
    private List<Long> seatIds;
    private String ticketClass;
    private String ticketType;
}
