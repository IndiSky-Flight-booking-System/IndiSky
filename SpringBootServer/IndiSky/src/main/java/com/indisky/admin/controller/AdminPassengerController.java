package com.indisky.admin.controller;

import com.indisky.admin.service.AdminPassengerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/adminPassenger")
public class AdminPassengerController {

    private AdminPassengerService adminPassengerService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllPassengers(){
        return ResponseEntity.ok(adminPassengerService.getAllPassengers());
    }

    @GetMapping("/getByBookingId/{bookingId}")
    public ResponseEntity<?> getByBookingId(@PathVariable Long bookingId){
        return ResponseEntity.ok(adminPassengerService.getByBookingId(bookingId));
    }

}
