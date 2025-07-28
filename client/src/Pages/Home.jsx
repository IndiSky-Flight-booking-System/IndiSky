import React from 'react'
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

import { useState } from 'react';
import '../css/Popup.css';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Search from '../Component/Search';


function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


  

  return (
    <div>
      <SlideBar />
      <div className="container mt-3">


        <div className="row">
          <div className="col"></div>

          <div className="col-12 p-2"  id='home' >
            <Search/>
          </div>

          <div className='d-flex flex-column'>
            <div>
              <h4>Popular Flights</h4>
            </div>


            <div id='about'>
              <h4>About Flightize </h4>
              <p> <b style={{ color: '#512888' }}> Flightize </b> is a user-friendly flight booking platform built as part of our Travel Management
                System project. Developed by a team of passionate freshers, our goal is to make flight booking easy, efficient,
                and hassle-free for everyone.</p>

              <p>Whether you're planning a business trip, a family vacation, or a last-minute getaway,
                Flightize helps you search, compare, and book flights with just a few clicks.
                The system supports one-way and round-trip bookings, passenger details
                customization, and future enhancements like payment integration and booking history</p>

              <p>We built Flightize using modern web technologies like React.js, and are focused on improving user experience, performance,
                and functionality with every update.</p>

            </div>

            <div style={ { background:'#e9ecef'}} className='p-3 rounded' id='contact'>
              <h4>Contact us</h4>
              <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="139434f2-10a5-4470-af0f-2a41741bb7d6"></input>
              <input type="hidden" name="subject" value="New Contact from Flightize Website" />

                <div class="row">
                  
                  <div class="col">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" className="form-control" name='Name' id='name' placeholder="Virat Kohli" />
                  </div>
                  <div class="col">
                    <label htmlFor="Email">Email</label>
                    <input type="email" className="form-control" name='Email' id='Email' placeholder="virat@gmail.com" />
                  </div>
                  <div class="col">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" className="form-control" name='PhoneNo' id='phone' placeholder="9876543210" />
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col">
                    <label htmlFor="Message"> Leave Message</label>
                    <textarea name="Message" id="Message"  rows="3" className="form-control" required ></textarea>
                  </div>

                  
                  
                </div>
                <div className="row mt-3 d-flex align-items-center justify-content-center">
                  <button type="submit" class="btn btn-outline-secondary">Submit</button>
                </div>

              </form>
            </div>

          

          </div>


          <div className="col"></div>
        </div>

      </div>
      <Footer/>

    </div>
  )
}

export default Home
