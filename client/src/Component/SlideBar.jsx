import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Popup.css';
function SlideBar() {
  const navigate = useNavigate();
  // const fullname = sessionStorage.getItem('full_name');

  function onLogout() {
    // Uncomment if needed:
    // sessionStorage.clear();
    toast.success('Logout Successful');
    navigate('/log');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light px-5" style={{ backgroundColor: '#a1d5fbff' }}>
        <Link className="navbar-brand active" to="/" style={{ color: '#512888' }}>
          <img src="Logo.png" alt="logo" style={{ width: '30px' }} /> IndiSky
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-around text-dark"  id="navbarNav">
          <ul className="navbar-nav  ">
            <li className="nav-item active">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="">Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home#about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home#contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/flight-status">Flight Status</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/payment-history">Payment History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/my-bookings">My Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/show-flights">Show Flights</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <h6 className="mb-0 mr-3" style={{ color: '#0000D7' }}>
              Hello,
              {/* {fullname} */}
            </h6>
            <button type="button" className="btn btn-outline-light text-black" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SlideBar;
