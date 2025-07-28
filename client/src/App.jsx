
import React, { createContext, useState } from 'react';
import Register from './Pages/Register';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Passengers from './Pages/Passengers';
import ShowFlights from './Pages/ShowFlights';

import FlightDetails from './Pages/FlightDetails'
import UserDashBoard from './Pages/UserDashBoard'

import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageAirlines from './Pages/Admin/ManageAirlines';
import ManageAirports from './Pages/Admin/ManageAirports';
import ManageFlights from './Pages/Admin/ManageFlights';
import ManageSeats from './Pages/Admin/ManageSeats';

import ManageUsers from './Pages/Admin/ManageUsers';
import FlightStatusManagement from './Pages/Admin/ManageFlightStatus';

export const infoContext = createContext();
export const flightDetailsContext = createContext();
export const totalPriceContext = createContext();

function App() {
  const [info, setInfo] = useState({
    trip: '',
    from: '',
    to: '',
    departure: '',
    return: '',
    passenger: '',
    class: '',
    adult: '',
    child: '',
    senior: ''
  })

  const [selectedOneway, setSelectedOneway] = useState(null);
  const [selectedRoundtrip, setSelectedRoundtrip] = useState(null);
  const [total, setTotal] = useState(0);


  return (
    <div>
      <infoContext.Provider value={{ info, setInfo }}>
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
            </Routes>
          </totalPriceContext.Provider>
        </flightDetailsContext.Provider>
      </infoContext.Provider>
      <ToastContainer />
   </div>
  );
}

export default App;
