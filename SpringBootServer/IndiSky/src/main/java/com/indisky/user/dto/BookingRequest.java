package com.indisky.user.dto;

import com.indisky.entities.Flight;
import com.indisky.entities.Payment;
import com.indisky.entities.Ticket;
import com.indisky.entities.User;
import com.indisky.enums.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BookingRequest {

    private User user;

    private Flight flight;

    private BigDecimal totalPrice;

    private BookingStatus status;

    private List<Ticket> tickets;

    private Payment payment;
}
