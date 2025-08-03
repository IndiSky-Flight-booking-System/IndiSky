package com.indisky.user.service;

import com.indisky.repository.FlightRepository;
import com.indisky.entities.Flight;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@AllArgsConstructor
public class FlightSearchServiceImpl implements FlightSearchService{

    private final FlightRepository repo;


    @Override
    public List<Flight> getAllFlights() {
        return repo.findAll();
    }

    @Override
    public Flight getSpecificFlight(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public Map<String, List<Flight>> getSearchFlights(String source, String destination) {
        Map<String ,List<Flight>> map =new HashMap<>();
        List<Flight> onewayFlights =repo.findBySourceAndDestinationAirportName(source,destination);
        List<Flight> roundTripFlights =repo.findBySourceAndDestinationAirportName(destination,source);

        map.put("onewayFlights", onewayFlights);
        map.put("roundTripFlights", roundTripFlights);

        return map;
    }

//    @Override
//    public List<Flight> getSearchFlights(String source, String destination) {
//        return repo.findBySourceAndDestinationAirportName(source,destination);
//    }


}
