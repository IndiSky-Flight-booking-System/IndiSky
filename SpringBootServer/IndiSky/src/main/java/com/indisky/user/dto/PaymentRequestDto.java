package com.indisky.user.dto;

import com.indisky.enums.PaymentMethod;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {
    private Long bookingId;
    private double amountPaid;
    private PaymentMethod paymentMethod;
}
