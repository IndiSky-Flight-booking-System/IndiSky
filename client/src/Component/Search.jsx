import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { infoContext } from '../App';
import '../css/SearchHeader.css';
import '../css/Search.css'; // ✅ New custom styling

function Search() {
  const { info, setInfo } = useContext(infoContext);
  const [child, setChild] = useState(0);
  const [adult, setAdult] = useState(1);
  const [senior, setSenior] = useState(0);
  const [trips, setTrips] = useState('OneWay');
  const [clas, setClas] = useState('');
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const next = new Date();
  next.setDate(next.getDate() + 1);
  const tom = next.toISOString().split('T')[0];

  let total = child + adult + senior;
  const maxTotal = 9;

  useEffect(() => {
    if (info) {
      setChild(info.child || 0);
      setAdult(info.adult || 1);
      setSenior(info.senior || 0);
      setTrips(info.trip || 'OneWay');
      setClas(info.class || '');
    }
  }, []);

  useEffect(() => {
    setInfo((e) => ({
      ...e,
      passenger: total,
      trip: trips,
      departure: e.departure || today,
      return: trips === 'OneWay' ? '' : (e.return || tom),
      class: clas,
      adult: adult,
      child: child,
      senior: senior,
    }));
  }, [total, trips, clas, adult, child, senior]);

  function onSearch() {
    if (!info.from?.length) {
      toast.error("Source location is Empty");
    } else if (!info.to?.length) {
      toast.error("Destination location is Empty");
    } else if (!info.departure?.length) {
      toast.error("Departure date is Empty");
    } else if (!info.class?.length) {
      toast.error("Class Not selected");
    } else {
      navigate('/show');
    }
  }

  return (
    <div className="container search-box shadow-lg rounded p-4">
      {/* Trip Type */}
      <div className="d-flex justify-content-center mb-3 gap-3">
        {["OneWay", "RoundTrip"].map((type) => (
          <div className="form-check form-check-inline" key={type}>
            <input
              className="form-check-input"
              type="radio"
              name="Trip"
              id={`trip-${type}`}
              value={type}
              checked={trips === type}
              onChange={(e) => setTrips(e.target.value)}
            />
            <label className="form-check-label fw-bold" htmlFor={`trip-${type}`}>
              {type === 'OneWay' ? 'One Way' : 'Round Trip'}
            </label>
          </div>
        ))}
      </div>

      {/* Main Fields */}
      <div className="row g-3">
        <div className="col-md">
          <label htmlFor="from" className="form-label">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            placeholder="Pune"
            value={info.from || ''}
            onChange={(e) => setInfo({ ...info, from: e.target.value })}
          />
        </div>
        <div className="col-md">
          <label htmlFor="to" className="form-label">To</label>
          <input
            type="text"
            className="form-control"
            id="to"
            placeholder="Delhi"
            value={info.to || ''}
            onChange={(e) => setInfo({ ...info, to: e.target.value })}
          />
        </div>
        <div className="col-md">
          <label htmlFor="dept" className="form-label">Departure</label>
          <input
            type="date"
            className="form-control"
            id="dept"
            min={today}
            value={info.departure || today}
            onChange={(e) => setInfo({ ...info, departure: e.target.value, return: '' })}
          />
        </div>
        <div className="col-md">
          <label htmlFor="ret" className="form-label">Return</label>
          <input
            type="date"
            className="form-control"
            id="ret"
            min={today}
            value={info.return || tom}
            onChange={(e) => setInfo({ ...info, return: e.target.value })}
            disabled={trips === 'OneWay'}
          />
        </div>
      </div>

      {/* Passenger and Class Dropdown */}
      <div className="dropdown mt-4">
        <label className="form-label">Passengers & Class</label>
        <button
          className="btn btn-outline-primary dropdown-toggle w-100"
          type="button"
          data-bs-toggle="dropdown"
        >
          {total} Travellers | {clas || 'Select Class'}
        </button>
        <ul className="dropdown-menu w-100 p-3" onClick={(e) => e.stopPropagation()}>
          {[
            { label: 'Child', key: 'child', value: child, setter: setChild },
            { label: 'Adult', key: 'adult', value: adult, setter: setAdult },
            { label: 'Senior Citizen', key: 'senior', value: senior, setter: setSenior },
          ].map(({ label, key, value, setter }) => (
            <li className="d-flex align-items-center justify-content-between my-2" key={key}>
              <span>{label}</span>
              <input
                type="range"
                className="form-range w-50"
                min={0}
                max={maxTotal - (key === 'child' ? adult + senior : key === 'adult' ? child + senior : adult + child)}
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
              />
              <span className="text-success">{value}</span>
            </li>
          ))}

          <hr />
          <label className="mb-1">Select Class</label>
          {['Economy', 'Premium_Economy', 'Business'].map((option) => (
            <div className="form-check" key={option}>
              <input
                className="form-check-input"
                type="radio"
                name="class"
                id={option}
                value={option}
                checked={clas === option}
                onChange={(e) => setClas(e.target.value)}
              />
              <label className="form-check-label" htmlFor={option}>
                {option.replace('_', ' ')}
              </label>
            </div>
          ))}
        </ul>
      </div>

      {/* Search Button */}
      <div className="text-center mt-4">
        <button className="btn btn-warning px-5 py-2 fw-bold" onClick={onSearch}>
          Search <i className="fa-solid fa-magnifying-glass ms-2"></i>
        </button>
      </div>
    </div>
  );
}

export default Search;
