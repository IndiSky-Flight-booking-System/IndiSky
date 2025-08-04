package com.indisky.user.service;

import com.indisky.user.dto.PassengerRequestDto;
import com.indisky.user.dto.PassengerResponseDto;

import com.indisky.user.dto.PassengerReqDto;
import com.indisky.user.dto.PassengerRespDto;

import java.util.List;

public interface PassengerService {
    PassengerResponseDto addPassenger(PassengerRequestDto dto);
    PassengerResponseDto getPassengerById(Long id);

    String addPassengers(List<PassengerReqDto> passDto);

//
//    List<PassengerRespDto> getAllPassengersByFlight(Long id);  //flight id
//
//    String updatePassengers(List<PassengerRespDto> passengerDtos);
}
