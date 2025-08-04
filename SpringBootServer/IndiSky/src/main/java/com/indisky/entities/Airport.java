package com.indisky.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
@Table(name = "airports")
public class Airport {
    @Column(name = "airport_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airportId;

    private String airportName, city, country, iataCode;

    @OneToMany(mappedBy = "sourceAirport")
    private List<Flight> departures;

    @OneToMany(mappedBy = "destinationAirport")
    private List<Flight> arrivals;
}

