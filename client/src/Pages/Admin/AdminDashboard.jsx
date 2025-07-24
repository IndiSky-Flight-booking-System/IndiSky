import React from "react";
import AdminSidebar from "../../Component/Admin/AdminSidebar";


const AdminDashboard = () => {
  const summary = {
    flights: 28,
    bookings: 143,
    users: 84,
    revenue: 258450,
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="main-content container-fluid mt-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card text-bg-primary shadow">
              <div className="card-body">
                <h5 className="card-title">Flights</h5>
                <p className="card-text fs-3">{summary.flights}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-bg-success shadow">
              <div className="card-body">
                <h5 className="card-title">Bookings</h5>
                <p className="card-text fs-3">{summary.bookings}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-bg-warning shadow">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <p className="card-text fs-3">{summary.users}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-bg-danger shadow">
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <p className="card-text fs-3">₹{summary.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-5">
          <h4>Recent Bookings</h4>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#BKG1234</td>
                <td>Akash Bhadange</td>
                <td>2024-07-24</td>
                <td><span className="badge text-bg-success">CONFIRMED</span></td>
                <td>₹8,500</td>
              </tr>
              <tr>
                <td>#BKG1235</td>
                <td>Kalpesh Margaj</td>
                <td>2024-07-22</td>
                <td><span className="badge text-bg-warning">PENDING</span></td>
                <td>₹12,000</td>
              </tr>
              <tr>
                <td>#BKG1236</td>
                <td>Gaurav Shimpi</td>
                <td>2024-07-23</td>
                <td><span className="badge text-bg-danger">CANCELLED</span></td>
                <td>₹5,700</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent Payments */}
        <div className="mt-5">
          <h4>Recent Payments</h4>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>User</th>
                <th>Method</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#PAY9981</td>
                <td>Akash Bhadange</td>
                <td>UPI</td>
                <td><span className="badge text-bg-success">SUCCESS</span></td>
                <td>₹8,500</td>
              </tr>
              <tr>
                <td>#PAY9982</td>
                <td>Kalpesh Margaj</td>
                <td>Credit Card</td>
                <td><span className="badge text-bg-warning">PENDING</span></td>
                <td>₹12,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
