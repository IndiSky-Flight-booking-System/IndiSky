package com.indisky.admin.service.Impl;

import com.indisky.admin.dto.FlightStatusDto;
import com.indisky.admin.service.FlightStatusService;
import com.indisky.entities.Flight;
import com.indisky.entities.FlightStatusLog;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.FlightRepository;
import com.indisky.repository.FlightStatusLogRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightStatusServiceImpl implements FlightStatusService {

    private final FlightStatusLogRepository logRepository;
    private final FlightRepository flightRepository;
    private final ModelMapper mapper;

    @Override
    public List<FlightStatusDto> getAllLogs() {
        List<FlightStatusLog> logs = logRepository.findAll();
        List<FlightStatusDto> dtos = new ArrayList<>();

        for (FlightStatusLog log : logs) {
            FlightStatusDto dto = mapper.map(log, FlightStatusDto.class);
            dto.setFlightId(log.getFlight().getFlightId());
            dto.setFlightNumber(log.getFlight().getFlightNumber());
            dtos.add(dto);
        }

        return dtos;
    }

    @Override
    public FlightStatusDto addLog(FlightStatusDto dto) {
        Flight flight = flightRepository.findById(dto.getFlightId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        FlightStatusLog log = new FlightStatusLog();
        log.setFlight(flight);
        log.setStatus(dto.getStatus());
        log.setUpdatedAt(LocalDateTime.now());

        flight.setStatus(dto.getStatus());
        flightRepository.save(flight);

        FlightStatusLog saved = logRepository.save(log);

        FlightStatusDto responseDto = mapper.map(saved, FlightStatusDto.class);
        responseDto.setFlightId(flight.getFlightId());
        responseDto.setFlightNumber(flight.getFlightNumber());
        responseDto.setUpdatedAt(saved.getUpdatedAt());

        return responseDto;
    }
}
