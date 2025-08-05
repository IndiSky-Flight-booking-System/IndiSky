import React from 'react'

function Footer() {
  return (
    <footer className=" py-4 bg-dark text-light mt-5" style={{
      bottom:0,
      width:'100%'
  
     } }>
      <div className="container text-center ">
        <h5 className="mb-3"> <img src="Logo.png" alt="logo"  style={{width:'30px',color: '#512888'}} />IndiSky</h5>
        <p className="mb-2">Your trusted partner for seamless flight bookings.</p>
        <div className="d-flex justify-content-center mb-2">
          <a href="#home" className="text-light mx-2 text-decoration-none">Home</a>
          <a href="#about" className="text-light mx-2 text-decoration-none">About Us</a>
          <a href="#contact" className="text-light mx-2 text-decoration-none">Contact</a>
          
          
          <a href="/terms" className="text-light mx-2 text-decoration-none">Terms & Privacy</a>
         
          <a href="/review-payment"  className="text-light mx-2 text-decoration-none">Review Payment</a>
          <a href="/booking-confirmation" className="text-light mx-2 text-decoration-none">Booking Confirmation</a>

         
        </div>

        <p style={ { margin:'0px' }}>  <b>  &copy; {new Date().getFullYear()}  IndiSky. All rights reserved. </b></p>
      </div>
      
    </footer>
  )
}

export default Footer
