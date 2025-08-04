package com.indisky.user.service.Impl;

import com.indisky.entities.Booking;
import com.indisky.entities.Payment;
import com.indisky.enums.BookingStatus;
import com.indisky.enums.PaymentStatus;
import com.indisky.repository.BookingRepository;
import com.indisky.repository.PaymentRepository;
import com.indisky.user.dto.PaymentRequestDto;
import com.indisky.user.dto.PaymentResponseDto;
import com.indisky.user.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public PaymentResponseDto makePayment(PaymentRequestDto request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Payment already made or not allowed");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmountPaid(request.getAmountPaid());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        Payment saved = paymentRepository.saveAndFlush(payment);

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
