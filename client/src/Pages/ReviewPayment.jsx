import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

function ReviewPayment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Dummy booking data
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
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Review & Payment</h2>

        <div className="border p-4 rounded bg-light shadow-sm">
          <h4 className="mb-3">Flight Details</h4>
          <p><b>Airline:</b> {booking.flight.airline}</p>
          <p><b>Flight Number:</b> {booking.flight.flightNo}</p>
          <p><b>From:</b> {booking.flight.from} → <b>To:</b> {booking.flight.to}</p>
          <p><b>Departure:</b> {booking.flight.departure}</p>
          <p><b>Arrival:</b> {booking.flight.arrival}</p>

          <hr />

          <h4 className="mb-3">Passenger Details</h4>
          <p><b>Name:</b> {booking.passenger.name}</p>
          <p><b>Age:</b> {booking.passenger.age}</p>
          <p><b>Seat:</b> {booking.passenger.seat}</p>

          <hr />

          <h4 className="mb-3">Payment</h4>
          <p><b>Total Price:</b> ₹{booking.totalPrice}</p>

          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label"><b>Select Payment Method</b></label>
            <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">-- Choose --</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="PAYPAL">PayPal</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button className="btn btn-success" onClick={handleConfirm}>Confirm Payment</button>

          {confirmed && (
            <div className="alert alert-success mt-4">
              Payment successful! Booking status: <strong>CONFIRMED</strong>.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReviewPayment;
