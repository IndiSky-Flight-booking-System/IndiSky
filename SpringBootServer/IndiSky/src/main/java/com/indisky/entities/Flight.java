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
    @JsonIgnoreProperties("flights") // had to use because causing infinite recursion that why
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "source_airport_id")
    @JsonIgnoreProperties({"departures","arrivals"})  // had to use because causing infinite recursion that why same for destination
    private Airport sourceAirport;

    @ManyToOne
    @JoinColumn(name = "destination_airport_id")
    @JsonIgnoreProperties({"departures","arrivals"})
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


