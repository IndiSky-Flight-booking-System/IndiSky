package com.indisky.repository;

import com.indisky.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight,Long> {

    //here in this code below % called the wild card in sql
    // ?1 and ?2 are called positional parameters refered from spring jpa query docs v3.5.2
    //any where in searchbox appear name then it matches sequence  thats why used before and after the name
    //observation => @param("") doesnt work for positional parameter
    @Query("select f from Flight f where lower(f.sourceAirport.city) like lower(concat('%' ,?1 ,'%')) " +
            "and lower(f.destinationAirport.city) like lower(concat('%' ,?2 ,'%'))")
    List<Flight> findBySourceAndDestinationAirportName(String source,String destination);


}
