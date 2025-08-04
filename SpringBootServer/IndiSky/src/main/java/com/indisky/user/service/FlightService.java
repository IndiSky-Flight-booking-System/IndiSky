package com.indisky.user.service;

import com.indisky.user.dto.FlightDetailsDto;
import com.indisky.user.dto.FlightSeatDto;
import com.indisky.user.dto.FlightStatusDto;

import java.util.List;

public interface FlightService {
    FlightDetailsDto getFlightDetails(Long id);
    List<FlightSeatDto> getFlightSeats(Long id);
    FlightStatusDto getFlightStatusByBookingId(Long bookingId);
}
