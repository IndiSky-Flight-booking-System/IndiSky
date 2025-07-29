package com.indisky.user.service;

import com.indisky.entities.Flight;

import java.util.List;
import java.util.Map;

public interface FlightSearchService {

    List<Flight> getAllFlights();

    Flight getSpecificFlight(Long id); //based on id particular flight fetching

//    List<Flight> getSearchFlights(String source ,String destination);

    Map< String ,List<Flight>> getSearchFlights(String source , String destination);


}
