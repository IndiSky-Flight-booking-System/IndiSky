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
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findById(Long ticketId);
}
