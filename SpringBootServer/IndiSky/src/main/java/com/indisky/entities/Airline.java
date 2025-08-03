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
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "airlines")
public class Airline {
    @Column(name = "airline_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    private String airlineName, country;

    @OneToMany(mappedBy = "airline")
    @JsonIgnore  //used because causing infinite recursion
    private List<Flight> flights;
}

