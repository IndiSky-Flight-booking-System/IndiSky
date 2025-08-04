package com.indisky.user.controller;


import com.indisky.user.service.FlightService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/flight")
public class FlightController {

    private final FlightService service;

    @GetMapping()
    public ResponseEntity<?> AllFlights(){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllFlights());
    }


    @GetMapping("/search")
    public ResponseEntity<?> getBySearchFlights(@RequestParam String source , @RequestParam String destination,
                                                 @RequestParam  LocalDate departure,
                                                @RequestParam(required = false) LocalDate arrival,
                                                @RequestParam(defaultValue = "1") int passengers,
                                                @RequestParam(defaultValue = "ECONOMY")  String travelClass,
                                                @RequestParam(defaultValue = "oneway") String tripType){
        return ResponseEntity.status(HttpStatus.OK).body(service.getSearchFlights(source,destination,departure,
                arrival,passengers,
                travelClass,tripType));
    }


}
