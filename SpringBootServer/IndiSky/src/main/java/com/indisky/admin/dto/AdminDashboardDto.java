
package com.indisky.admin.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AdminDashboardDto {
    private int totalFlights;
    private int totalBookings;
    private int totalUsers;
    private BigDecimal totalRevenue;
    private List<RecentBookingDto> recentBookings;
    private List<RecentPaymentDto> recentPayments;
}
