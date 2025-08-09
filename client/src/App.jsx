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
import AdminLogin from './Pages/Admin/AdminLogin';



import ManageUsers from './Pages/Admin/ManageUsers';
import FlightStatusManagement from './Pages/Admin/ManageFlightStatus';

import SeatSelection from './Pages/SeatSelection';
import ProtectedRoute from './Component/ProtectedRoute';


export const infoContext = createContext();
export const flightDetailsContext = createContext();
export const totalPriceContext = createContext();
export const searchedFlightsContext = createContext();
export const passengerListContext = createContext();
export const selectedSeatsContext = createContext();
export const bookingContext = createContext();
export const passengerListResponseContext = createContext();

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
  const [passengerList, setPassengerList] = useState([]);
  const [searched, setSearched] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);

  const [mainBooking, setMainBooking] = useState([]);


  const [passengerRespList, setPassengerRespList] = useState([]);

  return (
    <div>
      <infoContext.Provider value={{ info, setInfo }}>
        <searchedFlightsContext.Provider value={{ searched, setSearched }} >
          <flightDetailsContext.Provider value={{ selectedOneway, setSelectedOneway, selectedRoundtrip, setSelectedRoundtrip }} >
            <totalPriceContext.Provider value={{ total, setTotal }} >
              <passengerListResponseContext.Provider value={{ passengerRespList, setPassengerRespList }} >
                <passengerListContext.Provider value={{ passengerList, setPassengerList }} >
                  <selectedSeatsContext.Provider value={{ selectedSeats, setSelectedSeats, selectedReturnSeats, setSelectedReturnSeats }} >
                    <bookingContext.Provider value={{ mainBooking, setMainBooking }} >
                      <Routes>
                        <Route path='/user/log' element={<Login />} />
                        <Route path='/admin/login' element={<AdminLogin />} />
                        <Route path='/reg' element={<Register />} />
                        <Route path='/' element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms" element={<TermsPrivacy />} />

                        {/* Admin Routes */}
                        

                        <Route path='/admin/dashboard' element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
                        

                        
                        <Route path='/admin/airlines' element={<ProtectedRoute requiredRole="ADMIN"><ManageAirlines /></ProtectedRoute>} />

                        
                        <Route path='/admin/airports' element={<ProtectedRoute requiredRole="ADMIN"><ManageAirports /></ProtectedRoute>} />

                        
                        <Route path='/admin/flights' element={<ProtectedRoute requiredRole="ADMIN"><ManageFlights /></ProtectedRoute>} />

                        
                        <Route path='/admin/seats' element={<ProtectedRoute requiredRole="ADMIN"><ManageSeats /></ProtectedRoute>} />

                        
                        <Route path='/admin/users' element={<ProtectedRoute requiredRole="ADMIN"><ManageUsers /></ProtectedRoute>} />

                        
                        <Route path='/admin/flight-status' element={<ProtectedRoute requiredRole="ADMIN"><FlightStatusManagement /></ProtectedRoute>} />

                        
                        <Route path="/admin/view-bookings" element={<ProtectedRoute requiredRole="ADMIN"><AdminViewBookings /></ProtectedRoute>} />

                        
                        <Route path="/admin/payments" element={<ProtectedRoute requiredRole="ADMIN"><PaymentsManagement /></ProtectedRoute>} />

                        
                        <Route path="/admin/passengers" element={<ProtectedRoute requiredRole="ADMIN"><PassengersList /></ProtectedRoute>} />

                        
                        <Route path="/admin/flight-status" element={<ProtectedRoute requiredRole="ADMIN"><FlightStatusManagement /></ProtectedRoute>} />

                        
                        <Route path="/admin/users-management" element={<ProtectedRoute requiredRole="ADMIN"><UserManagement /></ProtectedRoute>} />
                        {/* //<Route path="/admin/bookings/:bookingId" element={<AdminBookingDetails />} /> */}



                        {/* Protected User routes */}
                        <Route path="/flight-status" element={<ProtectedRoute requiredRole="USER"><FlightStatus /></ProtectedRoute>} />

                        <Route path='/pass' element={<ProtectedRoute requiredRole="USER"><Passengers /></ProtectedRoute>} />
                        
                        <Route path='/show' element={<ProtectedRoute requiredRole="USER"><ShowFlights /></ProtectedRoute>} />

                        <Route path='/review' element={<ProtectedRoute requiredRole="USER"><FlightDetails /></ProtectedRoute>} />

                        <Route path='/dashboard' element={<ProtectedRoute requiredRole="USER"><UserDashBoard /></ProtectedRoute>} />

                        <Route path="/review-payment" element={<ProtectedRoute requiredRole="USER"><ReviewPayment /></ProtectedRoute>} />

                        <Route path="/booking-confirmation" element={<ProtectedRoute requiredRole="USER"><BookingConfirmation /></ProtectedRoute>} />
                        
                        <Route path="/my-bookings" element={<ProtectedRoute requiredRole="USER"><MyBookings /></ProtectedRoute>} />

                        <Route path="/profile" element={<ProtectedRoute requiredRole="USER"><UserProfile /></ProtectedRoute>} />

                        <Route path="/payment-history" element={<ProtectedRoute requiredRole="USER"><PaymentHistory /></ProtectedRoute>} />

                        <Route path="/show-flights" element={<ProtectedRoute requiredRole="USER"><ShowFlights /></ProtectedRoute>} />

                        <Route path="/seat-selection" element={<ProtectedRoute requiredRole="USER"><SeatSelection /></ProtectedRoute>} />

                      </Routes>
                    </bookingContext.Provider>
                  </selectedSeatsContext.Provider>
                </passengerListContext.Provider>
              </passengerListResponseContext.Provider>
            </totalPriceContext.Provider>
          </flightDetailsContext.Provider>
        </searchedFlightsContext.Provider>
      </infoContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
