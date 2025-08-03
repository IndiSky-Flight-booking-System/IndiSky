package com.indisky.user.service;
import com.indisky.entities.*;
import java.util.List;

public interface TicketService {
    Ticket createTicket(Ticket ticket);
    List<Ticket> getAllTickets();
    Ticket getTicketById(Long id);
}

