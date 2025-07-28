import React, { createContext, useState } from 'react'
import Register from './Pages/Register'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Passengers from './Pages/Passengers'
import ShowFlights from './Pages/ShowFlights';
import FlightDetails from './Pages/FlightDetails'
import UserDashBoard from './Pages/UserDashBoard'


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
  )
}

export default App
