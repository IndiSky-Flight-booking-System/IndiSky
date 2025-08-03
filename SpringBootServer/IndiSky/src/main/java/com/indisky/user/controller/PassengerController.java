package com.indisky.user.controller;

import com.indisky.user.dto.PassengerRequestDto;
import com.indisky.user.dto.PassengerResponseDto;
import com.indisky.user.service.PassengerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passengers")
@RequiredArgsConstructor
public class PassengerController {

    private final PassengerService passengerService;

    @PostMapping
    public ResponseEntity<PassengerResponseDto> addPassenger(@RequestBody PassengerRequestDto dto) {
        PassengerResponseDto savedPassenger = passengerService.addPassenger(dto);
        return ResponseEntity.ok(savedPassenger);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassengerResponseDto> getPassenger(@PathVariable Long id) {
        return ResponseEntity.ok(passengerService.getPassengerById(id));
    }
}
