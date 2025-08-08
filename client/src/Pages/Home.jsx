import React from 'react'
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import '../css/HomeCustom.css';
import '../css/Popup.css';
import Sidebar from '../Component/SideBar';
import AdvertisementSlider from '../Component/AdvertisementSlider';


import { useLocation } from 'react-router-dom';
import Search from '../Component/Search';

function Home() {
  const location = useLocation();

  return (
    <div>
      <SlideBar />
      <Sidebar />
      {/* Advertisement Slider Section */}

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 p-2" id="home">
            {/* Hero Section */}
            <div className="hero-section">
              <h1>Find Your Perfect Flight with IndiSky</h1>
              <p>Book cheap flights, discover new destinations, and travel smarter.</p>
              <a href="#home" className="btn btn-light btn-lg mt-3">Start Booking</a>
            </div>

            {/* Search Component */}
            <Search />

            {/* Booking Steps */}
            <div className="booking-step d-flex justify-content-around flex-wrap mt-5">
              {["Search Flights", "Select & Review", "Enter Details", "Make Payment"].map((step, idx) => (
                <div key={idx} className="text-center mx-3 mb-4">
                  <div className="step-icon">{idx + 1}</div>
                  <div className="fw-semibold">{step}</div>
                </div>
              ))}
            </div>

            {/* Popular Flights */}
            <h4 className="section-title">Popular Flights</h4>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
              {[
                { from: 'Mumbai', to: 'Delhi', price: '₹3,499' },
                { from: 'Bangalore', to: 'Kolkata', price: '₹4,299' },
                { from: 'Pune', to: 'Goa', price: '₹2,199' },
              ].map((flight, idx) => (
                <div className="col" key={idx}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{flight.from} → {flight.to}</h5>
                      <p className="card-text text-muted">Starting from <b>{flight.price}</b></p>
                      <button className="btn btn-outline-primary">Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Advertisement Slider Section */}
            <AdvertisementSlider />
            
            {/* About Section */}
            <div className="indisky-about card shadow-sm border-0 my-5 p-4">
              <div className="card-body">
                <h4 className="section-title mb-3"><i className="fa-solid fa-plane-departure me-2 text-primary"></i>About IndiSky</h4>
                <p>
                  <b className="text-primary">IndiSky</b> is a modern and user-friendly flight booking platform, developed as a part of our <b>Travel Management System</b> project.
                  We are a team of passionate freshers, building this platform to make flight booking easy, efficient, and hassle-free for everyone.
                </p>
                <p>
                  Whether you're planning a <b>business trip</b>, a <b>family vacation</b>, or a <b>last-minute getaway</b>, IndiSky helps you search, compare, and book flights effortlessly.
                  It supports <b>one-way</b> and <b>round-trip</b> bookings, passenger customization, and upcoming features like <b>payment integration</b> and <b>booking history</b>.
                </p>
                <p>
                  We built IndiSky using <b>modern web technologies like React.js</b>, and we’re constantly improving the experience, performance, and functionality.
                </p>
              </div>
            </div>


            {/* Contact Section */}
           {/* Contact Section */}
<div className="contact-section card shadow-sm border-0 p-4 mb-5" id="contact">
  <h4 className="section-title mb-3"><i className="fa-solid fa-envelope me-2 text-success"></i>Contact Us</h4>
  <form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="139434f2-10a5-4470-af0f-2a41741bb7d6" />
    <input type="hidden" name="subject" value="New Contact from IndiSky Website" />

    <div className="row">
      <div className="col-md-4 mb-3">
        <label htmlFor="name" className="form-label"><i className="fa-solid fa-user me-2 text-dark"></i>Full Name</label>
        <input type="text" className="form-control" name="Name" id="name" placeholder="Virat Kohli" required />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="Email" className="form-label"><i className="fa-solid fa-envelope-open-text me-2 text-dark"></i>Email</label>
        <input type="email" className="form-control" name="Email" id="Email" placeholder="virat@gmail.com" required />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="phone" className="form-label"><i className="fa-solid fa-phone me-2 text-dark"></i>Phone</label>
        <input type="tel" className="form-control" name="PhoneNo" id="phone" placeholder="9876543210" required />
      </div>
    </div>

    <div className="row">
      <div className="col">
        <label htmlFor="Message" className="form-label"><i className="fa-solid fa-comment-dots me-2 text-dark"></i>Message</label>
        <textarea name="Message" id="Message" rows="3" className="form-control" required></textarea>
      </div>
    </div>

    <div className="text-center mt-4">
      <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
    </div>
  </form>
</div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home;
