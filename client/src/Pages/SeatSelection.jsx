import React, { useContext, useEffect, useState } from 'react';
import '../css/SeatSelection.css';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { getSeatsByFlightId } from '../Service/flightSeat';
import {
  bookingContext,
  flightDetailsContext,
  passengerListContext,
  selectedSeatsContext,
  totalPriceContext,
} from '../App';
import { createBooking } from '../Service/booking';
import { toast } from 'react-toastify';

function SeatSelection() {
  const { selectedOneway, selectedRoundtrip } = useContext(flightDetailsContext);
  const { passengerList } = useContext(passengerListContext);
  const { selectedSeats, setSelectedSeats ,selectedReturnSeats, setSelectedReturnSeats} = useContext(selectedSeatsContext);
  const [onewaySeats, setOnewaySeats] = useState([]);
  const [roundtripSeats, setRoundtripSeats] = useState([]);
  const { total } = useContext(totalPriceContext);
  const { setMainBooking } = useContext(bookingContext);

  const navigate = useNavigate();
  

  useEffect(() => {
    if (!selectedOneway?.id) return;

    const fetchSeats = async () => {
      const seatData = await getSeatsByFlightId(selectedOneway.id);
      setOnewaySeats(Array.isArray(seatData) ? seatData : []);
    };
    fetchSeats();
  }, [selectedOneway?.id]);

  useEffect(() => {
    if (!selectedRoundtrip?.id) return;

    const fetchSeats = async () => {
      const seatData = await getSeatsByFlightId(selectedRoundtrip.id);
      setRoundtripSeats(Array.isArray(seatData) ? seatData : []);
    };
    fetchSeats();
  }, [selectedRoundtrip?.id]);

  const getSeatDetails = (seatNumber, fromRoundtrip = false) => {
    const seats = fromRoundtrip ? roundtripSeats : onewaySeats;
    return seats.find((seat) => seat.seatNumber === seatNumber);
  };

  const toggleSeat = (seatNumber, fromRoundtrip = false) => {
    const seat = getSeatDetails(seatNumber, fromRoundtrip);
    if (!seat || seat.booked === true || seat.booked === 1 || seat.booked?.[0] === 1) return;

    if (fromRoundtrip) {
      const isAlreadySelected = selectedReturnSeats.find((s) => s.seatNumber === seatNumber);
      if (isAlreadySelected) {
        setSelectedReturnSeats((prev) => prev.filter((s) => s.seatNumber !== seatNumber));
      } else {
        if (selectedReturnSeats.length >= passengerList.length) return;
        setSelectedReturnSeats((prev) => [...prev, seat]);
      }
    } else {
      const isAlreadySelected = selectedSeats.find((s) => s.seatNumber === seatNumber);
      if (isAlreadySelected) {
        setSelectedSeats((prev) => prev.filter((s) => s.seatNumber !== seatNumber));
      } else {
        if (selectedSeats.length >= passengerList.length) return;
        setSelectedSeats((prev) => [...prev, seat]);
      }
    }
  };

  const getSeatClass = (seatNumber, fromRoundtrip = false) => {
    const seat = getSeatDetails(seatNumber, fromRoundtrip);
    if (!seat) return 'seat';

    let className = 'seat';

    if (seat.booked === true || seat.booked === 1 || seat.booked?.[0] === 1) {
      className += ' booked';
      return className;
    }

    const isSelected = fromRoundtrip
      ? selectedReturnSeats.some((s) => s.seatNumber === seatNumber)
      : selectedSeats.some((s) => s.seatNumber === seatNumber);

    if (isSelected) {
      className += ' selected';
    }

    switch (seat.seatClass) {
      case 'BUSINESS':
        className += ' business';
        break;
      case 'PREMIUM':
        className += ' premium';
        break;
      case 'ECONOMY':
        className += ' economy';
        break;
      case 'FIRST':
        className += ' first';
        break;
      default:
        break;
    }

    return className;
  };

  const renderSeatMap = (seats, fromRoundtrip = false) => {
    const groupedSeats = seats.reduce((acc, seat) => {
      const group = seat.seatClass || 'UNKNOWN';
      if (!acc[group]) acc[group] = [];
      acc[group].push(seat);
      return acc;
    }, {});

    return (
      <div className="plane-body">
        {Object.entries(groupedSeats).map(([className, seats]) => (
          <div key={className} className="seat-class-group">
            <h4>{className}</h4>
            <div className="seat-row">
              {seats
                .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber))
                .map((seat, i) => (
                  <React.Fragment key={seat.seatNumber}>
                    {i === 3 && <div className="aisle-gap" />}
                    <div
                      className={getSeatClass(seat.seatNumber, fromRoundtrip)}
                      onClick={() => toggleSeat(seat.seatNumber, fromRoundtrip)}
                    >
                      {seat.seatNumber}
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleProceed = async () => {
    const selectedSeatObjects = selectedSeats.map((s) => getSeatDetails(s.seatNumber));
    const seatIds = selectedSeatObjects.map((seat) => seat?.seatId).filter(Boolean);

    const returnSeatObjects = selectedReturnSeats.map((s) => getSeatDetails(s.seatNumber, true));
    const returnSeatIds = returnSeatObjects.map((seat) => seat?.seatId).filter(Boolean);

    console.log("selected seat object =>" +selectedSeatObjects);


    const basePayload = {
      userId: 2,
      flightId: selectedOneway?.id,
      seatIds,
      ticketType: selectedRoundtrip ? 'ROUND_TRIP' : 'ONE_WAY',
      ticketClass: selectedSeatObjects[0]?.seatClass || 'ECONOMY',
      totalPrice:
        selectedOneway?.price * passengerList.length +
        (selectedRoundtrip?.price || 0) * passengerList.length,
    };

    if (selectedRoundtrip?.id) {
      basePayload.returnFlightId = selectedRoundtrip.id;
      basePayload.returnSeatIds = returnSeatIds;
    }
    console.log(basePayload)
    try {
      const result = await createBooking(basePayload);
      if (result) {
        setMainBooking(result);
        navigate('/review-payment', { state : basePayload});
      }
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    }
  };

  return (
    <>
      <SlideBar />
      <div className="main-seat-container">
        <div className="seat-selection-container">
          <h2>Select Your Seat(s)</h2>

          <div className="legend">
            <div className="legend-item"><span className="seat economy" /> Economy</div>
            <div className="legend-item"><span className="seat premium" /> Premium Economy</div>
            <div className="legend-item"><span className="seat business" /> Business</div>
            <div className="legend-item"><span className="seat first" /> First Class</div>
            <div className="legend-item"><span className="seat selected" /> Selected</div>
            <div className="legend-item"><span className="seat booked" /> Booked</div>
          </div>

          <h3>Oneway Flight Seat Map</h3>
          {onewaySeats.length === 0 ? (
            <p style={{ color: 'red' }}>No seats available for oneway flight.</p>
          ) : (
            renderSeatMap(onewaySeats)
          )}

          {selectedRoundtrip?.id && (
            <>
              <h3 className="mt-4">Return Flight Seat Map</h3>
              {roundtripSeats.length === 0 ? (
                <p style={{ color: 'red' }}>No seats available for return flight.</p>
              ) : (
                renderSeatMap(roundtripSeats, true)
              )}
            </>
          )}

          <div className="selection-summary">
            <h3>Selected Seats:</h3>
            <p>
              Oneway:{' '}
              {selectedSeats.length > 0
                ? selectedSeats.map((s) => s.seatNumber).join(', ')
                : 'None'}
            </p>
            {selectedRoundtrip?.id && (
              <p>
                Return:{' '}
                {selectedReturnSeats.length > 0
                  ? selectedReturnSeats.map((s) => s.seatNumber).join(', ')
                  : 'None'}
              </p>
            )}
            <p>Total Passengers: {passengerList.length}</p>
          </div>

          <button
            className="proceed-btn"
            onClick={handleProceed}
            disabled={
              selectedSeats.length !== passengerList.length ||
              (selectedRoundtrip?.id && selectedReturnSeats.length !== passengerList.length)
            }
          >
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SeatSelection;
