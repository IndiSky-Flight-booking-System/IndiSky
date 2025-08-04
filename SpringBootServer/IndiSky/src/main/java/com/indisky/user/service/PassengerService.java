
package com.indisky.user.service;

import com.indisky.user.dto.PassengerRequestDto;
import com.indisky.user.dto.PassengerResponseDto;

public interface PassengerService {
    PassengerResponseDto addPassenger(PassengerRequestDto dto);
    PassengerResponseDto getPassengerById(Long id);
}
