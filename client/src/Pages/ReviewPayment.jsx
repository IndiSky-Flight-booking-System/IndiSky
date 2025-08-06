import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import '../css/StaticPage.css'; // Assume you add styles here or add below
import Sidebar from '../Component/Navbar';

function ReviewPayment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const booking = {
    flight: {
      airline: 'IndiSky Express',
      flightNo: 'IS123',
      from: 'Pune',
      to: 'Delhi',
      departure: '2025-08-05 09:30 AM',
      arrival: '2025-08-05 11:45 AM',
    },
    passenger: {
      name: 'Gaurav Shimpi',
      age: 25,
      seat: '12A',
    },
    totalPrice: 4599,
  };

  const handleConfirm = () => {
    if (!paymentMethod) return alert('Please select a payment method');
    setConfirmed(true);
  };

  return (
    <div>
      <SlideBar />
     <Sidebar />
      <div className="container mt-5 mb-5 static-page">
        <h2 className="text-center text-success mb-5 fw-bold">Review & Payment</h2>

        <div className="card p-4 shadow-sm border-0 rounded-4 review-payment-card">
          {/* Flight Details */}
          <section className="mb-4">
            <h4 className="text-primary mb-3 d-flex align-items-center gap-2">
              <i className="fa-solid fa-plane-departure"></i> Flight Details
            </h4>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Airline:</strong> {booking.flight.airline}</div>
              <div className="col-md-6"><strong>Flight Number:</strong> {booking.flight.flightNo}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>From:</strong> {booking.flight.from}</div>
              <div className="col-md-6"><strong>To:</strong> {booking.flight.to}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Departure:</strong> {booking.flight.departure}</div>
              <div className="col-md-6"><strong>Arrival:</strong> {booking.flight.arrival}</div>
            </div>
          </section>

          <hr />

          {/* Passenger Details */}
          <section className="mb-4">
            <h4 className="text-primary mb-3 d-flex align-items-center gap-2">
              <i className="fa-solid fa-user"></i> Passenger Details
            </h4>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Name:</strong> {booking.passenger.name}</div>
              <div className="col-md-3"><strong>Age:</strong> {booking.passenger.age}</div>
              <div className="col-md-3"><strong>Seat:</strong> {booking.passenger.seat}</div>
            </div>
          </section>

          <hr />

          {/* Payment Section */}
          <section>
            <h4 className="text-primary mb-3 d-flex align-items-center gap-2">
              <i className="fa-solid fa-credit-card"></i> Payment
            </h4>
            <p className="fs-5 fw-semibold">Total Price: <span className="text-success">₹{booking.totalPrice}</span></p>

            <div className="mb-4">
              <label htmlFor="paymentMethod" className="form-label fw-semibold">Select Payment Method</label>
              <select
                id="paymentMethod"
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                aria-required="true"
                aria-describedby="paymentHelp"
              >
                <option value="" disabled>-- Choose Payment Method --</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="NET_BANKING">Net Banking</option>
                <option value="PAYPAL">PayPal</option>
                <option value="UPI">UPI</option>
              </select>
              <div id="paymentHelp" className="form-text">Please select one payment option to proceed.</div>
            </div>

            <button
              className="btn btn-success px-5 fw-bold"
              onClick={handleConfirm}
              disabled={confirmed}
              aria-live="polite"
            >
              <i className={`fa-solid me-2 ${confirmed ? 'fa-spinner fa-spin' : 'fa-check-circle'}`}></i>
              {confirmed ? 'Processing...' : 'Confirm Payment'}
            </button>

            {confirmed && (
              <div className="alert alert-success mt-4 d-flex align-items-center gap-2" role="alert">
                <i className="fa-solid fa-circle-check"></i>
                Payment successful! Booking status: <strong>CONFIRMED</strong>.
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ReviewPayment;
