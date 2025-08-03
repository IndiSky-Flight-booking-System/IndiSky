package com.indisky.admin.dto;

import com.indisky.entities.Booking;
import com.indisky.enums.PaymentMethod;
import com.indisky.enums.PaymentStatus;
import lombok.Data;

import java.util.Date;

@Data
public class AdminPaymentDto {
    private double amountPaid;

    private PaymentMethod paymentMethod;

    private Date paymentDate;

    private PaymentStatus paymentStatus;
}
