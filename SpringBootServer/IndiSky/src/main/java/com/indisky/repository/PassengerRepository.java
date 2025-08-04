package com.indisky.repository;

import com.indisky.entities.Flight;
import com.indisky.entities.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;

import java.util.List;
@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {

    @Query("select p from Passenger p join p.tickets t where t.seat.flight.flightId=?1")
    List<Passenger> findPassengerByFlightId(Long id);

    @Query("select p from Passenger p where p.passengerId in " +
            "(select t.passenger.passengerId from Ticket t where t.booking.bookingId = :bookingId)")
    List<Passenger> getPassengerByBookingId(@Param("bookingId") Long bookingId);
}
