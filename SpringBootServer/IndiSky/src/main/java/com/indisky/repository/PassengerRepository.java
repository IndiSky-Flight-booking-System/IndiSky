package com.indisky.repository;

import com.indisky.entities.Flight;
import com.indisky.entities.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {

    @Query("select p from Passenger p join p.tickets t where t.seat.flight.flightId=?1")
    List<Passenger> findPassengerByFlightId(Long id);

    Passenger findByPassportNo(String no);
}
