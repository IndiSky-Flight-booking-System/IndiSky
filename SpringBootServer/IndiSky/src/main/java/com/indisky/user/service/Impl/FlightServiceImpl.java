package com.indisky.user.service.Impl;

import com.indisky.entities.Booking;
import com.indisky.entities.Flight;
import com.indisky.entities.FlightSeat;
import com.indisky.entities.FlightStatusLog;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.BookingRepository;
import com.indisky.repository.FlightRepository;
import com.indisky.repository.FlightSeatRepository;
import com.indisky.user.dto.FlightDetailsDto;
import com.indisky.user.dto.FlightSeatDto;
import com.indisky.user.dto.FlightStatusDto;
import com.indisky.user.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepo;
    private final FlightSeatRepository seatRepo;
    private final BookingRepository bookingRepo;
    private final ModelMapper mapper;

    @Override
    public FlightDetailsDto getFlightDetails(Long id) {
        Flight flight = flightRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with ID: " + id));

        FlightDetailsDto dto = new FlightDetailsDto();
        dto.setFlightId(flight.getFlightId());
        dto.setAirlineName(flight.getAirline().getAirlineName());
        dto.setSourceAirport(flight.getSourceAirport().getAirportName());
        dto.setDestinationAirport(flight.getDestinationAirport().getAirportName());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setBasePrice(flight.getBasePrice());
        dto.setStatus(flight.getStatus());

        return dto;
    }

    @Override
    public List<FlightSeatDto> getFlightSeats(Long flightId) {
        Flight flight = flightRepo.findById(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with ID: " + flightId));

        List<FlightSeat> seats = flight.getSeats();

        return seats.stream()
                .map(seat -> mapper.map(seat, FlightSeatDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public FlightStatusDto getFlightStatusByBookingId(Long bookingId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        Flight flight = booking.getFlight();

        return flight.getStatusLogs().stream()
                .max(Comparator.comparing(FlightStatusLog::getUpdatedAt))
                .map(log -> new FlightStatusDto(flight.getFlightId(), log.getStatus(), log.getUpdatedAt()))
                .orElseThrow(() -> new ResourceNotFoundException("No status logs found for flight ID: " + flight.getFlightId()));
    }
}
