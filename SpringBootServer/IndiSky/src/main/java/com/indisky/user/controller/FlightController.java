package com.indisky.user.controller;

import com.indisky.user.dto.FlightDetailsDto;
import com.indisky.user.dto.FlightSeatDto;
import com.indisky.user.dto.FlightStatusDto;
import com.indisky.user.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightService flightService;

    @GetMapping("/{id}")
    public FlightDetailsDto getFlightDetails(@PathVariable Long id) {
        return flightService.getFlightDetails(id);
    }

    @GetMapping("/{id}/seats")
    public List<FlightSeatDto> getFlightSeats(@PathVariable Long id) {
        return flightService.getFlightSeats(id);
    }

    @GetMapping("/status")
    public FlightStatusDto getFlightStatusByBooking(@RequestParam Long bookingId) {
        return flightService.getFlightStatusByBookingId(bookingId);
    }
}
