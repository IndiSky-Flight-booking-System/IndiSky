import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Popup.css';
import '../css/SlideBar.css'; // ✅ NEW CSS file

function SlideBar() {
  const navigate = useNavigate();

  function onLogout() {
    toast.success('Logout Successful');
    sessionStorage.removeItem("token");
    navigate('/user/log');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar px-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="Logo.png" alt="logo" className="brand-logo" />
          <span className="brand-name ms-2">IndiSky</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {[
              { name: 'Home', path: '/' },
              //{ name: 'Bookings', path: '/bookings' },
              //{ name: 'About Us', path: '/home#about' },
              //{ name: 'Contact Us', path: '/home#contact' },
              { name: 'Flight Status', path: '/flight-status' },
             // { name: 'Payment History', path: '/payment-history' },
              { name: 'Profile', path: '/profile' },
              { name: 'My Bookings', path: '/my-bookings' },
              { name: 'Search Flights', path: '/show-flights' },

              {/* { name: 'Review Payment', path: '/review-payment' },
              { name: 'Booking Confirmation', path: '/booking-confirmation' }, */}
            ].map((link, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link nav-hover" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <span className="welcome-text">Hello, {/* fullname */}</span>
            <button type="button" className="btn btn-outline-light logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SlideBar;
