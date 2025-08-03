package com.indisky.repository;

import com.indisky.entities.FlightSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightSeatRepository extends JpaRepository<FlightSeat, Long> {
}
