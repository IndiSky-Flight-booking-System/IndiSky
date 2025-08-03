package com.indisky.repository;

import com.indisky.entities.Passenger;
import com.indisky.entities.Payment;
import com.indisky.enums.PaymentMethod;
import com.indisky.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    @Query("select p from Payment p where p.paymentMethod = :method AND p.paymentStatus = :status")
    List<Payment> getByMethodStatus(PaymentMethod method, PaymentStatus status);

}
