//package com.indisky.repository;
//
//import com.indisky.entities.Ticket;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface TicketRepository extends JpaRepository<Ticket, Long> {
//}

package com.indisky.repository;

import com.indisky.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByBookingBookingId(Long bookingId);
    List<Ticket> findByPassengerPassengerId(Long passengerId);
}
