import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

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
    const updated = bookings.map(b => {
      if (b.id === id) return { ...b, status: 'CANCELLED' };
      return b;
    });
    setBookings(updated);
  };

  const handleViewTickets = (tickets) => {
    alert(`Viewing tickets: ${tickets.join(', ')}`);
  };

  return (
    <div>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>My Bookings</h2>

        {bookings.map((b, index) => (
          <div key={index} className="border bg-light shadow-sm rounded p-3 mb-4">
            <p><b>Booking ID:</b> {b.id}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Flight:</b> {b.flight}</p>
            <p><b>Status:</b> <span className={b.status === 'CANCELLED' ? 'text-danger' : 'text-success'}>{b.status}</span></p>
            <p><b>Total Price:</b> ₹{b.totalPrice}</p>

            <div className="d-flex gap-3">
              <button className="btn btn-info btn-sm" onClick={() => handleViewTickets(b.ticketIds)}>View Ticket(s)</button>
              {b.status !== 'CANCELLED' && (
                <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.id)}>Cancel Booking</button>
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
