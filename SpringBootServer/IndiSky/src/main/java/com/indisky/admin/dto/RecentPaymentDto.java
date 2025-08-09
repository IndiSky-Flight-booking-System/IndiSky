
package com.indisky.admin.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RecentPaymentDto {
    private Long paymentId;
    private String user;
    private String method;
    private String status;
    private double amount;
    private Date date;
}
