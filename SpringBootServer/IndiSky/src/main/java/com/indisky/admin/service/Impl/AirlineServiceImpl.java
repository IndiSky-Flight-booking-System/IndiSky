package com.indisky.admin.service.Impl;

import com.indisky.admin.dto.AirlineDto;
import com.indisky.admin.service.AirlineService;
import com.indisky.entities.Airline;
import com.indisky.exception.ApiException;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.AirlineRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AirlineServiceImpl implements AirlineService {

    private final AirlineRepository airlineRepository;
    private final ModelMapper mapper;

    @Override
    public List<AirlineDto> getAllAirlines() {
        return airlineRepository.findAll()
                .stream()
                .map(airline -> mapper.map(airline, AirlineDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public AirlineDto addAirline(AirlineDto dto) {
        if (airlineRepository.existsByAirlineName(dto.getAirlineName())) {
            throw new ApiException("Airline already exists");
        }
        Airline airline = mapper.map(dto, Airline.class);
        Airline saved = airlineRepository.save(airline);
        return mapper.map(saved, AirlineDto.class);
    }

    @Override
    public AirlineDto updateAirline(Long id, AirlineDto dto) {
        Airline airline = airlineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Airline not found"));
        mapper.map(dto, airline);
        Airline updated = airlineRepository.save(airline);
        return mapper.map(updated, AirlineDto.class);
    }

    @Override
    public void deleteAirline(Long id) {
        if (!airlineRepository.existsById(id)) {
            throw new ResourceNotFoundException("Airline not found");
        }
        airlineRepository.deleteById(id);
    }
}
