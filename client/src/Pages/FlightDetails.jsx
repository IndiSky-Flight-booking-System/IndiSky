import React, { useContext } from 'react';
import SlideBar from '../Component/SlideBar';
import { useNavigate } from 'react-router-dom';
import { flightDetailsContext, infoContext, totalPriceContext } from '../App';
import '../css/FlightDetails.css';
import Sidebar from '../Component/Sidebar';

function FlightDetails() {
  const { info } = useContext(infoContext);
  const { total } = useContext(totalPriceContext);
  const { selectedOneway, selectedRoundtrip } = useContext(flightDetailsContext);
  const navigate = useNavigate();

  const confirmReview = () => {
    navigate('/pass');
  };

  const FlightCard = ({ flight, isRoundTrip }) => (
    <div className="flight-card shadow-lg rounded mb-4">
      <div className="flight-header">
        <h4>{flight.from} <i className="fa-solid fa-arrow-right"></i> {flight.to}</h4>
        <span className="flight-sub">
          {isRoundTrip ? info.return : info.departure} | {flight.duration}
        </span>
      </div>
      <div className="flight-body">
        <div className="time-box">
          <span className="date">{isRoundTrip ? info.return : info.departure}</span>
          <h5 className="time">{flight.dep}</h5>
          <span className="location">{flight.from}</span>
        </div>

        <div className="divider">
          <span>{flight.duration}</span>
          <hr />
        </div>

        <div className="time-box">
          <span className="date">{isRoundTrip ? info.return : "Arrival"}</span>
          <h5 className="time">{flight.arr}</h5>
          <span className="location">{flight.to}</span>
        </div>

        <div className="baggage-info">
          <h6>Baggage</h6>
          <p><i className="fa-solid fa-cart-flatbed-suitcase"></i> Cabin: <strong>7 kg/adult</strong></p>
          <p><i className="fa-solid fa-suitcase-rolling"></i> Check-in: <strong>15 kg/adult</strong></p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <SlideBar />
      <Sidebar />

      <div className="container flight-details-container">
        {selectedOneway && <FlightCard flight={selectedOneway} isRoundTrip={false} />}
        {selectedRoundtrip && <FlightCard flight={selectedRoundtrip} isRoundTrip={true} />}
      </div>

      <div className="footer-box shadow-lg">
        <div className="price-box">
          <h4>Total Price:</h4>
          <h3>₹ {total}</h3>
        </div>
        <button className="next-btn" onClick={confirmReview}>Next</button>
      </div>
    </div>
  );
}

export default FlightDetails;
