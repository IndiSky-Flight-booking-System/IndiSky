import React, { createContext, useState } from 'react'
import Register from './Pages/Register'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Passengers from './Pages/Passengers'
import ShowFlights from './Pages/ShowFlights';


export const infoContext = createContext();

function App() {

  const [info, setInfo] = useState({
    trip: '',
    from: '',
    to: '',
    departure: '',
    return: '',
    passenger: '',
    class:''
  })


  return (
    <div>
      <infoContext.Provider value={{ info, setInfo }}>
        <Routes>
          <Route path='/log' element={<Login />}></Route>
          <Route path='/reg' element={<Register />}></Route>
          <Route path='/' element={<Home />}></Route>

          <Route path='/pass' element={<Passengers />}></Route>
          <Route path='/show' element={<ShowFlights />}></Route>
        </Routes>
      </infoContext.Provider>
      <ToastContainer />
    </div>
  )
}

export default App
