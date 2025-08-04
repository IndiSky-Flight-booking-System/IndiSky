package com.indisky.user.service.Impl;

import com.indisky.entities.*;
import com.indisky.repository.TicketRepository;
import com.indisky.user.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepo;

    @Override
    public Ticket createTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    @Override
    public Ticket getTicketById(Long id) {
        return ticketRepo.findById(id).orElse(null);
    }
}


