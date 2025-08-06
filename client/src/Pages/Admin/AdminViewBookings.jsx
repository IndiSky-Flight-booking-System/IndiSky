import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminViewBookings.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";
const dummyBookings = [
  { id: 'BK101', date: '2025-08-01', flight: 'AI-203', status: 'Confirmed', price: 6500 },
  { id: 'BK102', date: '2025-08-03', flight: '6E-302', status: 'Pending', price: 7200 },
  { id: 'BK103', date: '2025-08-04', flight: 'AI-203', status: 'Cancelled', price: 5000 },
];

function AdminViewBookings() {
  const [collapsed, setCollapsed] = useState(false);
  const [bookings, setBookings] = useState(dummyBookings);
  const [filters, setFilters] = useState({ date: '', flight: '', status: '' });

  const navigate = useNavigate();

  const filteredBookings = bookings.filter((booking) => {
    return (
      (!filters.date || booking.date === filters.date) &&
      (!filters.flight || booking.flight.toLowerCase().includes(filters.flight.toLowerCase())) &&
      (!filters.status || booking.status === filters.status)
    );
  });

  return (
    <div className={`admin-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      

      <div className={`admin-main ${collapsed ? 'collapsed' : ''}`}>
         <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <div className="main-content">
        
          <h2 className="mb-4">Admin - View All Bookings</h2>

          {/* Filters */}
          <div className="card p-3 mb-4 shadow-sm bg-light">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Filter by Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Filter by Flight</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. AI-203"
                  value={filters.flight}
                  onChange={(e) => setFilters({ ...filters, flight: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Filter by Status</label>
                <select
                  className="form-select"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive shadow-sm">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Date</th>
                  <th>Flight</th>
                  <th>Status</th>
                  <th className="text-end">Price (₹)</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.date}</td>
                      <td>{booking.flight}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="text-end">{booking.price.toLocaleString()}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Confirmed':
      return 'bg-success';
    case 'Pending':
      return 'bg-warning';
    case 'Cancelled':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}

export default AdminViewBookings;
