package com.indisky.admin.service.Impl;

import com.indisky.admin.dto.AdminPassengerDto;
import com.indisky.admin.service.AdminPassengerService;
import com.indisky.repository.PassengerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class AdminPassengerServiceImpl implements AdminPassengerService {
    private PassengerRepository passengerRepository;
    private ModelMapper modelMapper;

    @Override
    public List<AdminPassengerDto> getAllPassengers() {
        return passengerRepository.findAll()
                .stream().map(passenger -> modelMapper.map(passenger,AdminPassengerDto.class)).toList();
    }

    @Override
    public List<AdminPassengerDto> getByBookingId(Long bookingId) {
        return passengerRepository.getPassengerByBookingId(bookingId)
                .stream().map(passenger -> modelMapper.map(passenger,AdminPassengerDto.class)).toList();
    }
}
