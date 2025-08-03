package com.indisky.admin.service.Impl;

import com.indisky.admin.dto.FlightAdminDto;
import com.indisky.admin.service.FlightAdminService;
import com.indisky.entities.Airline;
import com.indisky.entities.Airport;
import com.indisky.entities.Flight;
import com.indisky.enums.FlightStatus;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.AirlineRepository;
import com.indisky.repository.AirportRepository;
import com.indisky.repository.FlightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FlightAdminServiceImpl implements FlightAdminService {

    private final FlightRepository flightRepository;
    private final AirlineRepository airlineRepository;
    private final AirportRepository airportRepository;

    @Override
    public List<FlightAdminDto> getAllFlights() {
        return flightRepository.fetchFlightsWithJoins()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public FlightAdminDto addFlight(FlightAdminDto dto) {
        Flight flight = new Flight();
        mapDtoToEntity(dto, flight);
        Flight saved = flightRepository.save(flight);
        return mapEntityToDto(saved);
    }

    @Override
    public FlightAdminDto updateFlight(Long id, FlightAdminDto dto) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));
        mapDtoToEntity(dto, flight);
        Flight updated = flightRepository.save(flight);
        return mapEntityToDto(updated);
    }

    @Override
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new ResourceNotFoundException("Flight not found");
        }
        flightRepository.deleteById(id);
    }

    private void mapDtoToEntity(FlightAdminDto dto, Flight flight) {
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setDepartureTime(dto.getDepartureTime());
        flight.setArrivalTime(dto.getArrivalTime());
        flight.setBasePrice(dto.getBasePrice());
        flight.setStatus(FlightStatus.valueOf(dto.getStatus()));

        Airline airline = airlineRepository.findByAirlineName(dto.getAirlineName())
                .orElseThrow(() -> new ResourceNotFoundException("Airline not found"));
        Airport source = airportRepository.findByIataCode(dto.getSourceAirportIataCode())
                .orElseThrow(() -> new ResourceNotFoundException("Source Airport not found"));
        Airport destination = airportRepository.findByIataCode(dto.getDestinationAirportIataCode())
                .orElseThrow(() -> new ResourceNotFoundException("Destination Airport not found"));

        flight.setAirline(airline);
        flight.setSourceAirport(source);
        flight.setDestinationAirport(destination);
    }

    private FlightAdminDto mapEntityToDto(Flight flight) {
        FlightAdminDto dto = new FlightAdminDto();
        dto.setFlightId(flight.getFlightId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setBasePrice(flight.getBasePrice());
        dto.setStatus(flight.getStatus().name());
        dto.setAirlineName(flight.getAirline().getAirlineName());
        dto.setSourceAirportIataCode(flight.getSourceAirport().getIataCode());
        dto.setDestinationAirportIataCode(flight.getDestinationAirport().getIataCode());
        return dto;
    }
}
