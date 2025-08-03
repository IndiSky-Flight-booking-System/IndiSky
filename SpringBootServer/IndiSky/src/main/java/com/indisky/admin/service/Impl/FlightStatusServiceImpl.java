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
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightStatusServiceImpl implements FlightStatusService {

    private final FlightStatusLogRepository logRepository;
    private final FlightRepository flightRepository;
    private final ModelMapper mapper;

    @Override
    public List<FlightStatusDto> getAllLogs() {
        return logRepository.findAll()
                .stream()
                .map(log -> {
                    FlightStatusDto dto = new FlightStatusDto();
                    dto.setLogId(log.getLogId());
                    dto.setFlightId(log.getFlight().getFlightId());
                    dto.setStatus(log.getStatus());
                    dto.setUpdatedAt(log.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
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
        dto.setLogId(saved.getLogId());
        dto.setUpdatedAt(saved.getUpdatedAt());
        return dto;
    }
}
