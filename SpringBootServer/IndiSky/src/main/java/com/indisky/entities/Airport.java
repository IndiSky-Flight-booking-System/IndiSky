package com.indisky.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.indisky.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
//    @JsonIgnore    //this was need infinite recursion occured
    private List<Flight> departures;

    @OneToMany(mappedBy = "destinationAirport")
//    @JsonIgnore
    private List<Flight> arrivals;
}

