import React, { createContext, useState } from 'react'
import Register from './Pages/Register'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Passengers from './Pages/Passengers'
import ShowFlights from './Pages/ShowFlights';

function App() {
  

  return (
    <div>
      <Routes> 
      <Route path='/log' element={<Login />}></Route>
      <Route path='/reg' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/pass' element={<Passengers/>}></Route>
      <Route path='/show' element={<ShowFlights/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
