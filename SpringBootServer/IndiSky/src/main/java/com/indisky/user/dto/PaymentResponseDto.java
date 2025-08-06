package com.indisky.user.dto;

import com.indisky.enums.PaymentMethod;
import com.indisky.enums.PaymentStatus;
import lombok.*;

import java.util.Date;

@Data
public class PaymentResponseDto {
    private Long paymentId;
    private double amountPaid;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private Date paymentDate;
    private Long bookingId;
    private Long userId;
}
