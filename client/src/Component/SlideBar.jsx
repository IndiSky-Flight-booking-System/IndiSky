import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Popup.css';
import { HashLink } from 'react-router-hash-link';
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
      <nav className="navbar navbar-expand-lg navbar-light px-5 bg-dark " >
        <Link className="navbar-brand active text-light" to="/" >
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
          <ul className="navbar-nav mx-auto  fs-6">
            <li className="nav-item active">
              <Link className="nav-link text-light small" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light small" to="/show-flights">Show Flights</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light small" to="/dashboard">DashBoard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light small" to="/flight-status">Flight Status</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light small" to="/payment-history">Payment History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light small" to="/my-bookings">My Bookings</Link>
            </li>
            <li className="nav-item">
              <HashLink smooth className="nav-link text-light small"  to="/#about">About Us</HashLink>  
              {/* imported hashlink to have smooth  */}
            </li>
            <li className="nav-item">
              <HashLink smooth className="nav-link text-light small" to="/#contact">Contact Us</HashLink>
            </li>
            
          </ul>

          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0 mr-3 text-light">
              Hello ,
              {/* {fullname} */}
            </h6>
            <Link className="btn btn-outline-light btn-sm" to="/profile">User Profile</Link>
          
            <button type="button" className="btn btn-light text-dark btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SlideBar;
