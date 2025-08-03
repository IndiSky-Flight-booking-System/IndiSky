package com.indisky.repository;

import com.indisky.entities.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger,Long> {
    @Query("select p from Passenger p where p.passengerId in "+
            "(select t.passenger.passengerId from Ticket t where t.booking.bookingId = :bookingId)")
    List<Passenger> getPassengerByBookingId(@Param("bookingId") Long bookingId);
}
