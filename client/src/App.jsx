import React, { createContext, useState } from 'react'
import Register from '../src/Pages/Register';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../src/Pages/Login';
import Home from '../src/Pages/Home';
import Passengers from '../src/Pages/Passengers'
import ShowFlights from '../src/Pages/ShowFlights';
import Contact from '../src/Pages/Contact';
import TermsPrivacy from '../src/Pages/TermsPrivacy';
import ReviewPayment from '../src/Pages/ReviewPayment';
import BookingConfirmation from '../src/Pages/BookingConfirmation';
import MyBookings from '../src/Pages/MyBookings';
import UserProfile from '../src/Pages/UserProfile';
import FlightStatus from '../src/Pages/FlightStatus';
import PaymentHistory from '../src/Pages/PaymentHistory';



function App() {
  

  return (
    <div>
      <Routes> 
      <Route path='/' element={<Login />}></Route>
      <Route path='/reg' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/pass' element={<Passengers/>}></Route>
      <Route path='/show' element={<ShowFlights/>}></Route>

      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<TermsPrivacy />} />
      <Route path="/review-payment" element={<ReviewPayment />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/flight-status" element={<FlightStatus />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
      <Route path="/show-flights" element={<ShowFlights />} />
      




      





      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
