package com.indisky.user.controller;

import com.indisky.user.dto.PassengerReqDto;
import com.indisky.user.dto.PassengerRespDto;
import com.indisky.user.service.PassengerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
@AllArgsConstructor
public class PassengerController {

    private final PassengerService service;


    @PostMapping()
    public ResponseEntity<String> addPassengers(@RequestBody List<PassengerReqDto> psDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addPassengers(psDto));
    }




    @GetMapping("/{id}")
    public ResponseEntity<?> getSpecificPassenger (@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(service.getSpecificPassenger(id));
    }

//    @GetMapping("/flight/{fid}")
//    public ResponseEntity<?> getAllByFlightId (@PathVariable("fid") Long fId){
//        return ResponseEntity.status(HttpStatus.OK).body(service.getAllPassengersByFlight(fId));
//    }

//    @PutMapping("/update")
//    public ResponseEntity<String> updatePassenger(@RequestBody List<PassengerRespDto> dtos){
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.updatePassengers(dtos));
//    }

}
