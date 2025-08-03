
package com.indisky.user.service.Impl;

import com.indisky.entities.Passenger;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.PassengerRepository;
import com.indisky.user.dto.PassengerRequestDto;
import com.indisky.user.dto.PassengerResponseDto;
import com.indisky.user.service.PassengerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;
    private final ModelMapper modelMapper;

    @Override
    public PassengerResponseDto addPassenger(PassengerRequestDto dto) {
        Passenger passenger = modelMapper.map(dto, Passenger.class);
        Passenger saved = passengerRepository.save(passenger);
        return modelMapper.map(saved, PassengerResponseDto.class);
    }

    @Override
    public PassengerResponseDto getPassengerById(Long id) {
        Passenger passenger = passengerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Passenger not found with id: " + id));
        return modelMapper.map(passenger, PassengerResponseDto.class);
    }
}
