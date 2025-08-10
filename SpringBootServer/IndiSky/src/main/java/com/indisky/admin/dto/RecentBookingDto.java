
package com.indisky.admin.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RecentBookingDto {
    private Long bookingId;
    private String user;
    private LocalDateTime date;
    private String status;
    private BigDecimal total;
}
