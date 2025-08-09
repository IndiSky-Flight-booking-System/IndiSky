import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminViewBookings.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";
import { useEffect } from 'react';
import { myAxios } from '../../Service/config';
import { Modal, Button } from 'react-bootstrap';
// const dummyBookings = [
//   { id: 'BK101', date: '2025-08-01', flight: 'AI-203', status: 'Confirmed', price: 6500 },
//   { id: 'BK102', date: '2025-08-03', flight: '6E-302', status: 'Pending', price: 7200 },
//   { id: 'BK103', date: '2025-08-04', flight: 'AI-203', status: 'Cancelled', price: 5000 },
// ];

function AdminViewBookings() {
  const [collapsed, setCollapsed] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ date: '', flight: '', status: '' });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const filteredBookings = bookings.filter((booking) => {
    return (
      (!filters.date || booking.date === filters.date) &&
      (!filters.flight || booking.flight.toLowerCase().includes(filters.flight.toLowerCase())) &&
      (!filters.status || booking.status === filters.status)
    );
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await myAxios.get("/admin/booking/showAll");
        console.log(response.data);
        setBookings(response.data); // Assumes backend returns List<BookingDto>
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, []);

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
                  filteredBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{[index + 1]}</td>
                      <td>{booking.bookingDate.slice(0, 10)}</td>
                      <td>{booking.flight.flightNumber}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="text-end">{booking.totalPrice.toLocaleString()}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
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
      {
        selectedBooking && (
          <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Booking ID: {selectedBooking.bookingId}</h5>
              <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleString()}</p>

              <hr />
              <h6>User Info</h6>
              <p><strong>Name:</strong> {selectedBooking.user?.fullName}</p>
              <p><strong>Email:</strong> {selectedBooking.user?.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.user?.phoneNo}</p>
              <p><strong>Passport No:</strong> {selectedBooking.user?.passportNo}</p>

              <hr />
              <h6>Flight Info</h6>
              <p><strong>Flight No:</strong> {selectedBooking.flight?.flightNumber}</p>
              <p><strong>Departure:</strong> {new Date(selectedBooking.flight?.departureTime).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(selectedBooking.flight?.arrivalTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedBooking.flight?.status}</p>

              <hr />
              <h6>Payment Info</h6>
              <p><strong>Amount Paid:</strong> ₹{selectedBooking.payment?.amountPaid}</p>
              <p><strong>Status:</strong> {selectedBooking.payment?.paymentStatus}</p>
              <p><strong>Method:</strong> {selectedBooking.payment?.paymentMethod}</p>
              <p><strong>Payment Date:</strong> {new Date(selectedBooking.payment?.paymentDate).toLocaleString()}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }
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
