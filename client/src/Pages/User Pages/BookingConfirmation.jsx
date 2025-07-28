import React from 'react';

import SlideBar from './../../Component/User Component/SlideBar';
import Footer from './../../Component/User Component/Footer';
import { useNavigate } from 'react-router-dom';

function BookingConfirmation() {
  const navigate = useNavigate();

  // Dummy data
  const confirmation = {
    bookingId: 'IND123456789',
    tickets: [
      { ticketId: 'TKT987654321', seat: '12A' },
      { ticketId: 'TKT987654322', seat: '12B' }
    ],
    flight: {
      from: 'Pune',
      to: 'Delhi',
      date: '2025-08-05',
    },
    passengers: [
      { name: 'Gaurav Shimpi', age: 25 },
      { name: 'Raj Verma', age: 28 }
    ]
  };

  const handleDownload = () => {
    alert('E-Ticket Downloaded (dummy)');
  };

  const handleGoToBookings = () => {
    navigate('/my-bookings');
  };

  return (
    <div>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Booking Confirmation</h2>

        <div className="border p-4 bg-light shadow-sm rounded">
          <p><b>Booking ID:</b> {confirmation.bookingId}</p>

          <h5 className="mt-4">Tickets</h5>
          {confirmation.tickets.map((ticket, index) => (
            <p key={index}><b>Ticket ID:</b> {ticket.ticketId} — <b>Seat:</b> {ticket.seat}</p>
          ))}

          <h5 className="mt-4">Flight Info</h5>
          <p><b>From:</b> {confirmation.flight.from} → <b>To:</b> {confirmation.flight.to}</p>
          <p><b>Date:</b> {confirmation.flight.date}</p>

          <h5 className="mt-4">Passengers</h5>
          {confirmation.passengers.map((p, i) => (
            <p key={i}>{p.name} (Age: {p.age})</p>
          ))}

          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-outline-primary" onClick={handleDownload}>Download E-Ticket</button>
            <button className="btn btn-success" onClick={handleGoToBookings}>Go to My Bookings</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookingConfirmation;
