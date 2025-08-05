import React, { useContext, useEffect } from 'react';
import SlideBar from '../Component/SlideBar';
import Search from '../Component/Search';
import { infoContext, flightDetailsContext, totalPriceContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../css/ShowFlights.css';
import Sidebar from '../Component/Sidebar';

function FlightCard({ flight, isSelected, onSelect }) {
  return (
    <div
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
      className={`flight-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(flight)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(flight)}
    >
      <p className="flight-airline">{flight.airline}</p>
      <div className="flight-details">
        <div className="flight-time">
          <h4>{flight.dep}</h4>
          <h5>{flight.from}</h5>
        </div>
        <div className="flight-duration">
          <p>{flight.duration}</p>
          <hr />
        </div>
        <div className="flight-time">
          <h4>{flight.arr}</h4>
          <h5>{flight.to}</h5>
        </div>
        <div className="flight-price">₹{flight.price}</div>
      </div>
    </div>
  );
}

function ShowFlights() {
  const { info } = useContext(infoContext);
  const { total, setTotal } = useContext(totalPriceContext);
  const {
    selectedOneway,
    setSelectedOneway,
    selectedRoundtrip,
    setSelectedRoundtrip,
  } = useContext(flightDetailsContext);

  const navigate = useNavigate();

  const oneWayFlights = [
    { id: 1, airline: 'IndiGo', from: 'PUNE', to: 'Kochi', dep: '04:30', arr: '06:30', duration: '2hr', price: 4000 },
    { id: 2, airline: 'Air India', from: 'PUNE', to: 'Kochi', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 3, airline: 'Emirates', from: 'London', to: 'MUMBAI', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 4, airline: 'Air India', from: 'Delhi', to: 'MUMBAI', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
  ];

  const roundTripFlights = [
    { id: 1, airline: 'Air India Express', from: 'Kochi', to: 'PUNE', dep: '14:00', arr: '16:00', duration: '2hr', price: 4100 },
    { id: 2, airline: 'IndiGo', from: 'Kochi', to: 'PUNE', dep: '18:00', arr: '20:00', duration: '2hr', price: 4300 },
    { id: 3, airline: 'Emirates', from: 'MUMBAI', to: 'London', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 4, airline: 'Air India', from: 'MUMBAI', to: 'Delhi', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
  ];

  useEffect(() => {
    if (info.trip === 'OneWay') {
      setSelectedRoundtrip(null);
    }
    const totalPrice =
      (selectedOneway ? selectedOneway.price : 0) + (selectedRoundtrip ? selectedRoundtrip.price : 0);
    setTotal(totalPrice);
  }, [selectedOneway, selectedRoundtrip, info.trip, setSelectedRoundtrip, setTotal]);

  const filteredOneWay = oneWayFlights.filter(
    (flight) =>
      flight.from.toLowerCase() === info.from.toLowerCase() &&
      flight.to.toLowerCase() === info.to.toLowerCase()
  );

  const filteredRoundTrip = roundTripFlights.filter(
    (flight) =>
      flight.from.toLowerCase() === info.to.toLowerCase() &&
      flight.to.toLowerCase() === info.from.toLowerCase()
  );

  const bookFlights = () => navigate('/review');

  return (
    <>
      <SlideBar />
      <Sidebar />
      <Search />

      <div className="container my-3">
        {/* Search summary bar */}
        <div className="trip-summary d-flex justify-content-around bg-info p-3 rounded text-white mb-4">
          <span>{info.from}</span>
          <span>{info.to}</span>
          <span>{info.departure}</span>
          <span>{info.return || ''}</span>
          <span>
            {info.passenger} {info.class === 'Premium_Economy' ? 'Premium' : info.class}
          </span>
        </div>

        {/* Trip Type Tabs */}
        {/* <div className="row text-center mb-3">
          <div className={`col ${info.trip === 'OneWay' ? 'tab-active' : 'tab'}`}>
            One Way
          </div>
          {info.trip === 'RoundTrip' && <div className="col tab-active">Round Trip</div>}
        </div> */}

        <div className="row text-center mb-3 trip-tabs" role="tablist">
          <div
            role="tab"
            tabIndex={0}
            aria-selected={info.trip === 'OneWay'}
            className={`col tab ${info.trip === 'OneWay' ? 'tab-active' : ''}`}
            onClick={() => {
              setInfo({ ...info, trip: 'OneWay' });
            }}
            onKeyDown={e => { if (e.key === 'Enter') {/* set trip to OneWay */ } }}
          >
            One Way
          </div>

          {info.trip === 'RoundTrip' && (
            <div
              role="tab"
              tabIndex={0}
              aria-selected={info.trip === 'RoundTrip'}
              className="col tab tab-active"
              onClick={() => {
                setInfo({ ...info, trip: 'RoundTrip' });
              }}
              onKeyDown={e => { if (e.key === 'Enter') {/* set trip to RoundTrip */ } }}
            >
              Round Trip
            </div>
          )}
        </div>




        {/* Flights Listing */}
        <div className="row">
          {info.trip === 'RoundTrip' ? (
            <>
              <div className="col-6 d-flex flex-column align-items-center">
                {filteredOneWay.length > 0 ? (
                  filteredOneWay.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      isSelected={selectedOneway?.id === flight.id}
                      onSelect={setSelectedOneway}
                    />
                  ))
                ) : (
                  <p className="text-muted">No one-way flights found for this route.</p>
                )}
              </div>
              <div className="col-6 d-flex flex-column align-items-center">
                {filteredRoundTrip.length > 0 ? (
                  filteredRoundTrip.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      isSelected={selectedRoundtrip?.id === flight.id}
                      onSelect={setSelectedRoundtrip}
                    />
                  ))
                ) : (
                  <p className="text-muted">No round trip flights found for this route.</p>
                )}
              </div>
            </>
          ) : (
            <div className="col d-flex flex-column align-items-center">
              {filteredOneWay.length > 0 ? (
                filteredOneWay.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={selectedOneway?.id === flight.id}
                    onSelect={setSelectedOneway}
                  />
                ))
              ) : (
                <p className="text-muted">No one-way flights found for this route.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Summary Bar */}
      {(info.trip === 'OneWay' && selectedOneway) ||
        (info.trip === 'RoundTrip' && selectedOneway && selectedRoundtrip) ? (
        <div className="fixed-bottom booking-summary-container p-3 bg-light shadow-lg">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="booking-flight-details d-flex">
              <div className="booking-flight-card">
                <p>{selectedOneway.airline}</p>
                <div className="d-flex justify-content-around">
                  <span>{selectedOneway.from}</span>
                  <span>{selectedOneway.to}</span>
                  <span>₹{selectedOneway.price}</span>
                </div>
              </div>

              {info.trip === 'RoundTrip' && selectedRoundtrip && (
                <div className="booking-flight-card ms-4">
                  <p>{selectedRoundtrip.airline}</p>
                  <div className="d-flex justify-content-around">
                    <span>{selectedRoundtrip.from}</span>
                    <span>{selectedRoundtrip.to}</span>
                    <span>₹{selectedRoundtrip.price}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="booking-total d-flex align-items-center">
              <h3 className="me-3">₹{total}</h3>
              <button className="btn btn-success btn-lg" onClick={bookFlights}>
                Book
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShowFlights;
