import React, { useState } from 'react';
import '../css/SeatSelection.css';
import SlideBar from '../Component/SlideBar';
import Sidebar from '../Component/Sidebar';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';

const seatLayout = [
  ['1A', '1B', '1C', '1D', '1E', '1F'],
  ['2A', '2B', '2C', '2D', '2E', '2F'],
  ['3A', '3B', '3C', '3D', '3E', '3F'],
  ['4A', '4B', '4C', '4D', '4E', '4F'],
  ['5A', '5B', '5C', '5D', '5E', '5F'],
];

const bookedSeats = ['1B', '2D', '4E'];
const businessClass = ['1A', '1B', '1C', '1D', '1E', '1F'];
const premiumClass = ['2A', '2B', '2C', '2D', '2E', '2F'];

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatClass = (seat) => {
    if (bookedSeats.includes(seat)) return 'seat booked';
    if (selectedSeats.includes(seat)) return 'seat selected';
    if (businessClass.includes(seat)) return 'seat business';
    if (premiumClass.includes(seat)) return 'seat premium';
    return 'seat economy';
  };

  const handleProceed = () => {
    const passenger = JSON.parse(localStorage.getItem('passenger'));
    const flight = JSON.parse(localStorage.getItem('flight'));

    navigate('/review-payment', {
      state: {
        selectedSeats,
        passenger,
        flight,
      },
    });
  };

  return (
    <>
      <Sidebar />
      <SlideBar />
      <div className="main-seat-container">
        <div className="seat-selection-container">
          <h2>Select Your Seat(s)</h2>

          {/* Seat Class Legend */}
          <div className="legend">
            <div className="legend-item"><span className="seat economy" /> Economy</div>
            <div className="legend-item"><span className="seat premium" /> Premium Economy</div>
            <div className="legend-item"><span className="seat business" /> Business</div>
            <div className="legend-item"><span className="seat selected" /> Selected</div>
            <div className="legend-item"><span className="seat booked" /> Booked</div>
          </div>

          {/* Seat Grid */}
          <div className="plane-body">
            {seatLayout.map((row, idx) => (
              <div key={idx} className="seat-row">
                {row.map((seat, i) => (
                  <React.Fragment key={seat}>
                    {i === 3 && <div className="aisle-gap" />}
                    <div
                      className={getSeatClass(seat)}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          <div className="selection-summary">
            <h3>Selected Seats:</h3>
            {selectedSeats.length > 0 ? (
              <p>{selectedSeats.join(', ')}</p>
            ) : (
              <p>No seats selected.</p>
            )}
          </div>

          {/* Proceed Button */}
          <button
            className="proceed-btn"
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SeatSelection;
