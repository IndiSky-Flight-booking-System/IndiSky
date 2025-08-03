package com.indisky.entities;

import com.indisky.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "flight_seats")
public class FlightSeat {
    @Column(name = "seat_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    private TicketClass seatClass;

    private boolean isBooked;

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}

