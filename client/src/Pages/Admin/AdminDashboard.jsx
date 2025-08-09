import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { getDashboardData } from "../../Service/dashboard";
import { toast } from "react-toastify";
import "../../css/AdminHeader.css";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch dashboard data");
    }
  };

  if (!dashboardData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const {
    totalFlights,
    totalBookings,
    totalUsers,
    totalRevenue,
    recentBookings,
    recentPayments,
  } = dashboardData;

  return (
    <div className={`admin-layout d-flex ${sidebarCollapsed ? "collapsed" : ""}`}>
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="admin-main flex-grow-1">
        <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <div className="main-content container-fluid mt-5 pt-3 px-4">
          <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

          {/* Summary Cards */}
          <div className="row">
            <SummaryCard title="Flights" value={totalFlights} />
            <SummaryCard title="Bookings" value={totalBookings} />
            <SummaryCard title="Users" value={totalUsers} />
            <SummaryCard title="Revenue" value={`₹${totalRevenue.toLocaleString()}`} />
          </div>

          {/* Recent Bookings */}
          <div className="mt-5">
            <h4 className="fw-bold">Recent Bookings</h4>
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No.</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr key={booking.bookingId}>
                      <td>{index + 1}</td>
                      <td>{booking.user}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>
                        <span className="badge text-bg-success">{booking.status}</span>
                      </td>
                      <td>₹{booking.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="mt-5">
            <h4 className="fw-bold">Recent Payments</h4>
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No.</th>
                    <th>User</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment, index) => (
                    <tr key={payment.paymentId}>
                      <td>{index + 1}</td>
                      <td>{payment.user}</td>
                      <td>{payment.method.replace("_", " ")}</td>
                      <td>
                        <span className="badge text-bg-success">{payment.status}</span>
                      </td>
                      <td>₹{payment.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="col-md-3 mb-3">
    <div className="card text-bg-warning shadow">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fs-3">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
