package com.indisky.admin.dto;

import com.indisky.entities.Flight;
import com.indisky.entities.Payment;
import com.indisky.entities.Ticket;
import com.indisky.entities.User;
import com.indisky.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminBookingDto {
    private Long bookingId;

    private AdminUserDto user;

    private FlightAdminDto flight;

    private LocalDateTime bookingDate;

    private BigDecimal totalPrice;

    private BookingStatus status;

    private AdminPaymentDto payment;
}
