import React, { useState } from 'react';
import '../css/SeatSelection.css'; // Make sure to create this CSS
import { Sidebar } from 'lucide-react';
import SlideBar from '../Component/SlideBar';
const dummySeats = {
  Economy: Array.from({ length: 30 }, (_, i) => ({ number: `E${i + 1}`, booked: false })),
  Premium_Economy: Array.from({ length: 10 }, (_, i) => ({ number: `P${i + 1}`, booked: i < 2 })),
  Business: Array.from({ length: 8 }, (_, i) => ({ number: `B${i + 1}`, booked: i === 3 })),
};

function SeatSelection() {
    
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats((prev) => [...prev, seatNumber]);
    }
  };
  
  return (
   
    <div className="container my-5 seat-selection-box">
    
      <h2 className="text-center mb-4 fw-bold">Select Your Seat(s)</h2>
    
      {/* Class selection */}
      <div className="d-flex justify-content-center gap-4 mb-4">
        {['Economy', 'Premium_Economy', 'Business'].map((cls) => (
          <button
            key={cls}
            className={`btn ${selectedClass === cls ? 'btn-dark' : 'btn-outline-secondary'}`}
            onClick={() => {
              setSelectedClass(cls);
              setSelectedSeats([]);
            }}
          >
            {cls.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Seat Grid */}
      <div className="seat-grid">
        {dummySeats[selectedClass].map((seat) => {
          const isSelected = selectedSeats.includes(seat.number);
          const isBooked = seat.booked;
            
          return (
            
            <div
              key={seat.number}
              className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
              onClick={() => !isBooked && handleSeatClick(seat.number)}
              title={seat.number}
            >
              {seat.number}
            </div>
          );
        })}
      </div>

      {/* Selected Summary */}
      <div className="text-center mt-4">
        <h5>Selected Seat(s): <span className="text-primary">{selectedSeats.join(', ') || 'None'}</span></h5>
        <button
          className="btn btn-success mt-3 px-4"
          disabled={selectedSeats.length === 0}
          onClick={() => alert(`Seats Confirmed: ${selectedSeats.join(', ')}`)}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
