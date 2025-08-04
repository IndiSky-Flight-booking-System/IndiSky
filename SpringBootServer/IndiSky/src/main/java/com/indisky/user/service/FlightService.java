package com.indisky.user.service;

import com.indisky.entities.Flight;
import com.indisky.user.dto.FlightResponseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface FlightService {

    List<Flight> getAllFlights();

    Flight getSpecificFlightWithStatus(Long id); //based on id particular flight fetching

    Map< String ,List<FlightResponseDto>> getSearchFlights(String source , String destination, LocalDate departure,
                                                LocalDate arrival,
                                                int passengers,
                                                String travelclass,String tripType);


    FlightResponseDto getAllFlightsAndSeat(Long fid);



}
