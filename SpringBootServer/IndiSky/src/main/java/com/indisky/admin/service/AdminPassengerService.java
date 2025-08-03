package com.indisky.admin.service;

import com.indisky.admin.dto.AdminPassengerDto;

import java.util.List;

public interface AdminPassengerService {
    List<AdminPassengerDto> getAllPassengers();

    List<AdminPassengerDto> getByBookingId(Long bookingId);
}
