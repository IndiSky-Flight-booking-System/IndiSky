import React, { useRef } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import '../css/StaticPage.css';
import Sidebar from '../Component/Sidebar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Install this as well: npm install html2canvas

function BookingConfirmation() {
  const navigate = useNavigate();
  const pdfRef = useRef(); // Reference to the section to export

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
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('E-Ticket.pdf');
    });
  };

  const handleGoToBookings = () => {
    navigate('/my-bookings');
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />
      <div className="container mt-5 mb-5 static-page" ref={pdfRef}>
        <div className="text-center mb-4">
          <h2 className="text-success fw-bold">Booking Confirmed!</h2>
          <p className="text-muted">Your tickets have been booked successfully.</p>
        </div>

        <div className="card shadow-sm p-4">
          <div className="mb-3">
            <h5 className="text-primary"><i className="fa-solid fa-receipt me-2"></i>Booking ID:</h5>
            <p className="ms-4 fw-bold">{confirmation.bookingId}</p>
          </div>

          <hr />

          <h5 className="text-primary"><i className="fa-solid fa-ticket me-2"></i>Tickets</h5>
          <ul className="ms-4">
            {confirmation.tickets.map((ticket, index) => (
              <li key={index}>
                <b>Ticket ID:</b> {ticket.ticketId} &nbsp; | &nbsp; <b>Seat:</b> {ticket.seat}
              </li>
            ))}
          </ul>

          <hr />

          <h5 className="text-primary"><i className="fa-solid fa-plane me-2"></i>Flight Info</h5>
          <p className="ms-4"><b>From:</b> {confirmation.flight.from} → <b>To:</b> {confirmation.flight.to}</p>
          <p className="ms-4"><b>Date:</b> {confirmation.flight.date}</p>

          <hr />

          <h5 className="text-primary"><i className="fa-solid fa-users me-2"></i>Passengers</h5>
          <ul className="ms-4">
            {confirmation.passengers.map((p, i) => (
              <li key={i}>{p.name} (Age: {p.age})</li>
            ))}
          </ul>

          <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
            <button className="btn btn-outline-primary px-4" onClick={handleDownload}>
              <i className="fa-solid fa-download me-2"></i>Download E-Ticket
            </button>
            <button className="btn btn-success px-4" onClick={handleGoToBookings}>
              <i className="fa-solid fa-list-check me-2"></i>Go to My Bookings
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookingConfirmation;
