package com.indisky.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.indisky.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "flights")
public class Flight {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    @ManyToOne
    @JoinColumn(name = "airline_id")
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "source_airport_id")
    private Airport sourceAirport;

    @ManyToOne
    @JoinColumn(name = "destination_airport_id")
    private Airport destinationAirport;

    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private BigDecimal basePrice;

    @Enumerated(EnumType.STRING)
    private FlightStatus status;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightSeat> seats;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightStatusLog> statusLogs;

}


