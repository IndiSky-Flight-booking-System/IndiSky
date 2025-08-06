import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import '../css/MyBookings.css'; // Don't forget to create or replace this CSS file
import Sidebar from '../Component/Navbar';

function MyBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      date: '2025-08-05',
      flight: 'Pune → Delhi',
      status: 'CONFIRMED',
      totalPrice: 4599,
      ticketIds: ['TKT001', 'TKT002']
    },
    {
      id: 'BK002',
      date: '2025-08-12',
      flight: 'Mumbai → Chennai',
      status: 'CONFIRMED',
      totalPrice: 3899,
      ticketIds: ['TKT003']
    }
  ]);

  const handleCancel = (id) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: 'CANCELLED' } : b
    );
    setBookings(updated);
  };

  const handleViewTickets = (tickets) => {
    alert(`Viewing tickets: ${tickets.join(', ')}`);
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />
      <div className="my-bookings-container">
        <h2 className="heading">My Bookings</h2>

        {bookings.map((b, index) => (
          <div key={index} className="booking-card">
            <div className="booking-header">
              <h5><i className="bi bi-airplane-engines-fill icon" /> {b.flight}</h5>
              <span className={`status-badge ${b.status === 'CANCELLED' ? 'cancelled' : 'confirmed'}`}>
                {b.status}
              </span>
            </div>
            <hr />
            <div className="booking-info">
              <p><strong>Booking ID:</strong> {b.id}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
              <p><strong>Ticket ID(s):</strong> {b.ticketIds.join(', ')}</p>
            </div>
            <div className="booking-actions">
              <button className="view-btn" onClick={() => handleViewTickets(b.ticketIds)}>View Ticket(s)</button>
              {b.status !== 'CANCELLED' && (
                <button className="cancel-btn" onClick={() => handleCancel(b.id)}>Cancel Booking</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MyBookings;
