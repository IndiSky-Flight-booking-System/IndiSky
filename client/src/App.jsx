
import React, { createContext, useState } from 'react';
import Register from './Pages/Register';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Passengers from './Pages/Passengers';
import ShowFlights from './Pages/ShowFlights';

import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageAirlines from './Pages/Admin/ManageAirlines';
import ManageAirports from './Pages/Admin/ManageAirports';
import ManageFlights from './Pages/Admin/ManageFlights';
import ManageSeats from './Pages/Admin/ManageSeats';

import ManageUsers from './Pages/Admin/ManageUsers';
import FlightStatusManagement from './Pages/Admin/ManageFlightStatus';

export const infoContext = createContext();

function App() {
  const [info, setInfo] = useState({
    trip: '',
    from: '',
    to: '',
    departure: '',
    return: '',
    passenger: '',
    class: ''
  });

  return (
    <infoContext.Provider value={{ info, setInfo }}>
      <Routes>
        {/* User Routes */}
        <Route path='/log' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/pass' element={<Passengers />} />
        <Route path='/show' element={<ShowFlights />} />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/airlines' element={<ManageAirlines />} />
        <Route path='/admin/airports' element={<ManageAirports />} />
        <Route path='/admin/flights' element={<ManageFlights />} />
        <Route path='/admin/seats' element={<ManageSeats />} />
        <Route path='/admin/users' element={<ManageUsers />} />
        <Route path='/admin/flight-status' element={<FlightStatusManagement />} />
      </Routes>
      <ToastContainer />
    </infoContext.Provider>
  );
}

export default App;
