package com.indisky.user.service.Impl;

import com.indisky.repository.BookingRepository;
import com.indisky.user.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository repo;

}
