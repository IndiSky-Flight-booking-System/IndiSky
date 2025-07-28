import React from 'react'

function Footer() {
  return (
    <footer className=" py-4 text-dark mt-5" style={{background:'#9cd9ff'} }>
      <div className="container text-center ">
        <h5 className="mb-3"> <img src="Logo.png" alt="logo"  style={{width:'30px',color: '#512888'}} />Flightize</h5>
        <p className="mb-2">Your trusted partner for seamless flight bookings.</p>
        <div className="d-flex justify-content-center mb-2">
          <a href="#home" className="text-dark mx-2">Home</a>
          <a href="#about" className="text-dark mx-2">About Us</a>
          <a href="#contact" className="text-dark mx-2">Contact</a>
          
          
          <a href="/terms" className="text-dark mx-2">Terms & Privacy</a>
         
          <a href="/review-payment" className="text-dark mx-2">Review Payment</a>
          <a href="/booking-confirmation" className="text-dark mx-2">Booking Confirmation</a>

         
        </div>

        <p style={ { margin:'0px' }}>  <b>  &copy; {new Date().getFullYear()}  Flightize. All rights reserved. </b></p>
      </div>
      
    </footer>
  )
}

export default Footer
