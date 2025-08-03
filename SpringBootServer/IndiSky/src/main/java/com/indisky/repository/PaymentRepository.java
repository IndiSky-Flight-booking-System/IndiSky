//package com.indisky.repository;
//
//import com.indisky.entities.*;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface PaymentRepository extends JpaRepository<Payment, Long> {
//}
package com.indisky.repository;

import com.indisky.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBookingUserId(Long userId);
}
