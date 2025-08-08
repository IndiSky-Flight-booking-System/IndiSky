import React, { createContext, useState } from 'react';
import Register from '../src/Pages/Register';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../src/Pages/Login';
import Home from '../src/Pages/Home';
import Passengers from '../src/Pages/Passengers';
import ShowFlights from '../src/Pages/ShowFlights';
import Contact from '../src/Pages/Contact';
import TermsPrivacy from '../src/Pages/TermsPrivacy';
import ReviewPayment from '../src/Pages/ReviewPayment';
import BookingConfirmation from '../src/Pages/BookingConfirmation';
import MyBookings from '../src/Pages/MyBookings';
import UserProfile from '../src/Pages/UserProfile';
import FlightStatus from '../src/Pages/FlightStatus';
import PaymentHistory from '../src/Pages/PaymentHistory';

import FlightDetails from './Pages/FlightDetails';
import UserDashBoard from './Pages/UserDashBoard';

import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageAirlines from './Pages/Admin/ManageAirlines';
import ManageAirports from './Pages/Admin/ManageAirports';
import ManageFlights from './Pages/Admin/ManageFlights';
import ManageSeats from './Pages/Admin/ManageSeats';
import AdminViewBookings from './Pages/Admin/AdminViewBookings';
import PaymentsManagement from './Pages/Admin/PaymentsManagement';
import PassengersList from './Pages/Admin/PassengersList';
import UserManagement from './Pages/Admin/UserManagement';
import ManageUsers from './Pages/Admin/ManageUsers';
import FlightStatusManagement from './Pages/Admin/ManageFlightStatus';
import SeatSelection from './Pages/SeatSelection';
import ProtectedRoute from './Component/ProtectedRoute';


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
  });

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
                {/* Public routes */}
                <Route path='/log' element={<Login />} />
                <Route path='/reg' element={<Register />} />
                <Route path='/' element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<TermsPrivacy />} />
                <Route path="/flight-status" element={<FlightStatus />} />

                {/* Protected routes */}
                <Route path='/pass' element={<ProtectedRoute><Passengers /></ProtectedRoute>} />
                <Route path='/show' element={<ProtectedRoute><ShowFlights /></ProtectedRoute>} />
                <Route path='/review' element={<ProtectedRoute><FlightDetails /></ProtectedRoute>} />
                <Route path='/dashboard' element={<ProtectedRoute><UserDashBoard /></ProtectedRoute>} />
                <Route path="/review-payment" element={<ProtectedRoute><ReviewPayment /></ProtectedRoute>} />
                <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
                <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
                <Route path="/show-flights" element={<ProtectedRoute><ShowFlights /></ProtectedRoute>} />
                <Route path="/seat-selection" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />

                {/* Admin Protected routes */}
                <Route path='/admin/dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path='/admin/airlines' element={<ProtectedRoute><ManageAirlines /></ProtectedRoute>} />
                <Route path='/admin/airports' element={<ProtectedRoute><ManageAirports /></ProtectedRoute>} />
                <Route path='/admin/flights' element={<ProtectedRoute><ManageFlights /></ProtectedRoute>} />
                <Route path='/admin/seats' element={<ProtectedRoute><ManageSeats /></ProtectedRoute>} />
                <Route path='/admin/users' element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
                <Route path='/admin/flight-status' element={<ProtectedRoute><FlightStatusManagement /></ProtectedRoute>} />
                <Route path="/admin/view-bookings" element={<ProtectedRoute><AdminViewBookings /></ProtectedRoute>} />
                <Route path="/admin/payments" element={<ProtectedRoute><PaymentsManagement /></ProtectedRoute>} />
                <Route path="/admin/passengers" element={<ProtectedRoute><PassengersList /></ProtectedRoute>} />
                <Route path="/admin/users-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
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
