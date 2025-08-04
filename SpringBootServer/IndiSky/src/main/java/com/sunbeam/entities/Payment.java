package com.sunbeam.entities;

import com.sunbeam.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Entity
@Table(name = "payment")
@Getter
@Setter
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;

    private double amountPaid;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    private Date paymentDate;

    private String transactionId;

//    @OneToOne
//    @JoinColumn(name = "ticket_id")
//    private Ticket ticket;
}
