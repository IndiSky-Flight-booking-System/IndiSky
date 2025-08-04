package com.indisky.user.service.Impl;

import com.indisky.entities.*;
import com.indisky.enums.BookingStatus;
import com.indisky.enums.TicketClass;
import com.indisky.enums.TicketType;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.*;
import com.indisky.user.dto.*;
import com.indisky.user.service.BookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FlightRepository flightRepository;
    private final PassengerRepository passengerRepository;
    private final FlightSeatRepository flightSeatRepository;
    private final TicketRepository ticketRepository;
    private final ModelMapper mapper;

    @Override
    public BookingResponseDto createBooking(BookingRequestDto request) {
        Booking booking = new Booking();

        // Set core booking fields
        booking.setUser(userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        booking.setFlight(flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found")));
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);
        booking.setTotalPrice(request.getTotalPrice());

        // Save booking
        Booking savedBooking = bookingRepository.save(booking);

        // Save tickets
        List<Ticket> tickets = new ArrayList<>();
        for (int i = 0; i < request.getPassengerIds().size(); i++) {
            Ticket ticket = new Ticket();
            ticket.setBooking(savedBooking);
            ticket.setPassenger(passengerRepository.findById(request.getPassengerIds().get(i))
                    .orElseThrow(() -> new ResourceNotFoundException("Passenger not found")));
            ticket.setSeat(flightSeatRepository.findById(request.getSeatIds().get(i))
                    .orElseThrow(() -> new ResourceNotFoundException("Seat not found")));
            ticket.setTicketClass(TicketClass.valueOf(request.getTicketClass()));
            ticket.setTicketType(TicketType.valueOf(request.getTicketType()));
            tickets.add(ticket);

            // Mark seat booked
            ticket.getSeat().setBooked(true);
        }

        ticketRepository.saveAll(tickets);
        flightSeatRepository.saveAll(
                tickets.stream().map(Ticket::getSeat).toList()
        );

        // Map Booking to DTO manually
        BookingResponseDto responseDto = new BookingResponseDto();
        responseDto.setBookingId(savedBooking.getBookingId());
        responseDto.setUserId(savedBooking.getUser().getId());
        responseDto.setFlightId(savedBooking.getFlight().getFlightId());
        responseDto.setTotalPrice(savedBooking.getTotalPrice());
        responseDto.setBookingDate(savedBooking.getBookingDate());
        responseDto.setStatus(savedBooking.getStatus().name());
        responseDto.setTicketIds(tickets.stream().map(Ticket::getId).toList());

        return responseDto;
    }


    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        booking.getTickets().forEach(ticket -> {
            FlightSeat seat = ticket.getSeat();
            seat.setBooked(false);
            flightSeatRepository.save(seat);
        });
    }

    @Override
    public BookingConfirmationDto getBookingConfirmation(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        List<String> passengerNames = booking.getTickets().stream().map(t -> t.getPassenger().getFullName()).toList();
        List<String> seatNumbers = booking.getTickets().stream().map(t -> t.getSeat().getSeatNumber()).toList();

        return new BookingConfirmationDto(
                booking.getBookingId(),
                booking.getUser().getFullName(),
                booking.getFlight().getFlightNumber(),
                booking.getBookingDate(),
                booking.getFlight().getStatus().name(),
                booking.getTotalPrice(),
                passengerNames,
                seatNumbers
        );
    }

    @Override
    public List<UserBookingDto> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(b -> new UserBookingDto(
                b.getBookingId(),
                b.getFlight().getFlightNumber(),
                b.getBookingDate(),
                b.getStatus().name(),
                b.getTotalPrice()
        )).toList();
    }

    @Override
    public BookingResponseDto getUserBookingById(Long userId, Long bookingId) {
        Booking booking = bookingRepository.findByIdAndUserId(bookingId, userId).orElseThrow();
        List<Long> ticketIds = booking.getTickets().stream().map(Ticket::getId).toList();
        return new BookingResponseDto(
                booking.getBookingId(),
                booking.getUser().getId(),
                booking.getFlight().getFlightId(),
                booking.getTotalPrice(),
                booking.getBookingDate(),
                booking.getStatus().name(),
                ticketIds
        );
    }
}
