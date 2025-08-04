package com.indisky.user.service.Impl;

import com.indisky.repository.FlightRepository;
import com.indisky.entities.Flight;
import com.indisky.user.dto.FlightResponseDto;
import com.indisky.user.service.FlightService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repo;

    private final ModelMapper modelMapper;

    @Override
    public List<Flight> getAllFlights() {
        return repo.findAll();
    }

    @Override
    public Flight getSpecificFlightWithStatus(Long id) {
        return repo.findByFlightStatus(id);
    }

    @Override
    public Map<String, List<FlightResponseDto>> getSearchFlights(String source, String destination,
                                                      LocalDate departure, LocalDate arrival,
                                                      int passengers, String travelclass, String tripType) {

        Map<String ,List<FlightResponseDto>> map =new HashMap<>();


        //Problem faced in date -> observation made ->
        //here date we will be receiving is lOcal date but in database we are storing timestamp(date+time)
        //so we will use start and end time for that specific day
        //here in departure end it will give the max time means  1 minute < before next day
        LocalDateTime depStartDate = departure.atStartOfDay();
        LocalDateTime depEndDate = departure.atTime(LocalTime.MAX);

        System.out.println(source +" "+ destination + " " + departure + " " + arrival + " -> "+ depStartDate+ " "+ depEndDate) ;

        List<Flight> onewayFlights =repo.findByDepartureDate(source,destination,depStartDate,depEndDate);

        List<FlightResponseDto> onewayDtoList = new ArrayList<>();
        for (Flight flight : onewayFlights) {
            FlightResponseDto dto = modelMapper.map(flight, FlightResponseDto.class);
            onewayDtoList.add(dto);
        }

        //if roundtrip selected then only otherwise it won't
        List<FlightResponseDto> roundTripFlightsDtoList = new ArrayList<>();

        if(arrival !=null && tripType!=null && (tripType.trim().equalsIgnoreCase("roundtrip")
                || tripType.trim().equalsIgnoreCase("round_trip")) ){

            LocalDateTime ArrStartDate = arrival.atStartOfDay();
            LocalDateTime ArrEndDate = arrival.atTime(LocalTime.MAX);
            System.out.println(source +" "+ destination + " " + departure + " " + arrival + " -> "+ ArrStartDate+ " "+ ArrEndDate) ;
             List<Flight> roundTripFlightsE=repo.findByDepartureDate(destination,source,ArrStartDate,ArrEndDate);
            for (Flight flight : roundTripFlightsE) {
                FlightResponseDto dto = modelMapper.map(flight, FlightResponseDto.class);
                roundTripFlightsDtoList.add(dto);
            }
        }
        map.put("onewayFlights", onewayDtoList);
        map.put("roundTripFlights", roundTripFlightsDtoList);

        return map;
    }

    @Override
    public FlightResponseDto getAllFlightsAndSeat(Long fid) {    //flight details  +  seat details fetching the data
        Flight flight = repo.findFlightBySeat(fid);
        return modelMapper.map(flight, FlightResponseDto.class);
    }


}
