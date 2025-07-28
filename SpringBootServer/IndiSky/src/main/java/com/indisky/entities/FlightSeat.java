<<<<<<< HEAD:SpringBootServer/IndiSky/src/main/java/com/sunbeam/entities/FlightSeat.java
package com.sunbeam.entities;
=======
package com.indisky.entities;
>>>>>>> 1fdd79201edb034d28fe25d51ef16407008c3140:SpringBootServer/IndiSky/src/main/java/com/indisky/entities/FlightSeat.java

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight_seats")
public class FlightSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @Column(name = "class_type", nullable = false)
    private String classType; // e.g. Economy, Business, First

    @Column(name = "is_available", nullable = false)
    private boolean isAvailable = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private FlightSeat flight;

    // Constructors
    public FlightSeat() {}

    public FlightSeat(String seatNumber, String classType, boolean isAvailable, FlightSeat flight) {
        this.seatNumber = seatNumber;
        this.classType = classType;
        this.isAvailable = isAvailable;
        this.flight = flight;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public FlightSeat getFlight() {
        return flight;
    }

    public void setFlight(FlightSeat flight) {
        this.flight = flight;
    }
}