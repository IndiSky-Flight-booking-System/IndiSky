package com.indisky.user.service;

import com.indisky.user.dto.PassengerReqDto;
import com.indisky.user.dto.PassengerRespDto;

import java.util.List;

public interface PassengerService {

    String addPassengers(List<PassengerReqDto> passDto);



    PassengerRespDto getSpecificPassenger(Long id);
//
//    List<PassengerRespDto> getAllPassengersByFlight(Long id);  //flight id
//
//    String updatePassengers(List<PassengerRespDto> passengerDtos);
}
