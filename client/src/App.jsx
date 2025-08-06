import React, { createContext, useState } from 'react'
import Register from '../src/Pages/Register';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-icons/font/bootstrap-icons.css';

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




import FlightDetails from './Pages/FlightDetails'
import UserDashBoard from './Pages/UserDashBoard'

import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageAirlines from './Pages/Admin/ManageAirlines';
import ManageAirports from './Pages/Admin/ManageAirports';
import ManageFlights from './Pages/Admin/ManageFlights';
import ManageSeats from './Pages/Admin/ManageSeats';

import ManageUsers from './Pages/Admin/ManageUsers';
import FlightStatusManagement from './Pages/Admin/ManageFlightStatus';
import UpdateUser from './Pages/UpdateUser';
export const infoContext = createContext();
export const flightDetailsContext = createContext();
export const totalPriceContext = createContext();
export const searchedFlightsContext = createContext();

function App() {
  const [info, setInfo] = useState({
    trip: '',
    from: '',
    to: '',
    departure: '',
    arrival: '',
    passenger: '',
    Tclass: '',
    adult: '',
    child: '',
    senior: ''
  })

  const [selectedOneway, setSelectedOneway] = useState(null);
  const [selectedRoundtrip, setSelectedRoundtrip] = useState(null);
  const [total, setTotal] = useState(0);

  const [searched, setSearched] = useState(false);

  return (
    <div>

      <infoContext.Provider value={{ info, setInfo }}>
        <searchedFlightsContext.Provider value={{ searched, setSearched }} >
          <flightDetailsContext.Provider value={{ selectedOneway, setSelectedOneway, selectedRoundtrip, setSelectedRoundtrip }} >
            <totalPriceContext.Provider value={{ total, setTotal }} >
              <Routes>
                <Route path='/log' element={<Login />}></Route>
                <Route path='/reg' element={<Register />}></Route>
                <Route path='/' element={<Home />}></Route>

                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/airlines' element={<ManageAirlines />} />
                <Route path='/admin/airports' element={<ManageAirports />} />
                <Route path='/admin/flights' element={<ManageFlights />} />
                <Route path='/admin/seats' element={<ManageSeats />} />
                <Route path='/admin/users' element={<ManageUsers />} />
                <Route path='/admin/flight-status' element={<FlightStatusManagement />} />

                <Route path='/pass' element={<Passengers />}></Route>
                <Route path='/show' element={<ShowFlights />}></Route>
                <Route path='/review' element={<FlightDetails />}></Route>
                <Route path='/dashboard' element={<UserDashBoard />}></Route>
                <Route path='/update-user' element={<UpdateUser/>} ></Route>

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
            </totalPriceContext.Provider>
          </flightDetailsContext.Provider>
        </searchedFlightsContext.Provider>
      </infoContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
