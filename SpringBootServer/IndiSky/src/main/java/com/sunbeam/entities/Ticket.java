package com.sunbeam.entities;

import com.sunbeam.enums.TicketClass;
import com.sunbeam.enums.TicketFlexibility;
import com.sunbeam.enums.TicketType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "user_id")
    private Long userId; // passengerId

    @Column(name = "seat_id")
    private Long seatId;

    @CreationTimestamp
    @Column(name = "issued_date")
    private Date issuedDate;

    @Enumerated(EnumType.STRING)
    private TicketClass ticketClass;

    @Enumerated(EnumType.STRING)
    private TicketFlexibility flexibility;

    @Enumerated(EnumType.STRING)
    private TicketType type;

    private Double price;

    private boolean checkedIn;

//    @ManyToOne
//    @JoinColumn(name = "passenger_id")
//    private Passenger passenger;
//
//    @ManyToOne
//    @JoinColumn(name = "flight_id")
//    private Flight flight;

}
