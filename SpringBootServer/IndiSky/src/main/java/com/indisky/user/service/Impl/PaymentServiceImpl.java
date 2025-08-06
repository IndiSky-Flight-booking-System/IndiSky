package com.indisky.user.service.Impl;

import com.indisky.entities.*;
import com.indisky.enums.BookingStatus;
import com.indisky.enums.PaymentStatus;
import com.indisky.enums.TicketClass;
import com.indisky.enums.TicketType;
import com.indisky.repository.*;
import com.indisky.user.dto.PaymentRequestDto;
import com.indisky.user.dto.PaymentResponseDto;
import com.indisky.user.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PassengerRepository passengerRepository;
    private final FlightSeatRepository flightSeatRepository;
    private final TicketRepository ticketRepository;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public PaymentResponseDto makePayment(PaymentRequestDto request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Booking already paid or not allowed");
        }

        if (request.getPassengerIds() == null || request.getSeatIds() == null) {
            throw new RuntimeException("Passenger IDs and Seat IDs are required");
        }

        if (request.getPassengerIds().size() != request.getSeatIds().size()) {
            throw new RuntimeException("Mismatch in passenger and seat count");
        }

        // Generate tickets only after payment
        List<Ticket> tickets = new ArrayList<>();
        for (int i = 0; i < request.getPassengerIds().size(); i++) {
            Passenger passenger = passengerRepository.findById(request.getPassengerIds().get(i))
                    .orElseThrow(() -> new RuntimeException("Passenger not found"));
            FlightSeat seat = flightSeatRepository.findById(request.getSeatIds().get(i))
                    .orElseThrow(() -> new RuntimeException("Seat not found"));

            if (seat.isBooked()) {
                throw new RuntimeException("Seat already booked: " + seat.getSeatNumber());
            }

            seat.setBooked(true);
            flightSeatRepository.save(seat);

            Ticket ticket = new Ticket();
            ticket.setBooking(booking);
            ticket.setPassenger(passenger);
            ticket.setSeat(seat);
            ticket.setTicketClass(TicketClass.valueOf(request.getTicketClass()));
            ticket.setTicketType(TicketType.valueOf(request.getTicketType()));
            tickets.add(ticket);
        }

        ticketRepository.saveAll(tickets);

        // Save payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmountPaid(request.getAmountPaid());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        Payment saved = paymentRepository.save(payment);

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        PaymentResponseDto response = mapper.map(saved, PaymentResponseDto.class);
        response.setPaymentId(saved.getId());
        response.setBookingId(booking.getBookingId());
        response.setUserId(booking.getUser().getId());

        return response;
    }

    @Override
    public List<PaymentResponseDto> getPaymentsByUser(Long userId) {
        return paymentRepository.findByBookingUserId(userId).stream()
                .map(payment -> {
                    PaymentResponseDto dto = mapper.map(payment, PaymentResponseDto.class);
                    dto.setPaymentId(payment.getId());
                    dto.setBookingId(payment.getBooking().getBookingId());
                    dto.setUserId(userId);
                    return dto;
                }).collect(Collectors.toList());
    }
}
