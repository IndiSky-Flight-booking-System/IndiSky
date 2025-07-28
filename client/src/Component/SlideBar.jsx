import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';


function SlideBar() {

    const navigate = useNavigate();
    // const fullname =sessionStorage.getItem('full_name')


    function onLogout() {
        // sessionStorage.removeItem('token')
        // sessionStorage.removeItem('full_name')
        // sessionStorage.removeItem('phone_no')
        // sessionStorage.removeItem('email')
        // sessionStorage.removeItem('password')
        // sessionStorage.removeItem('dob')
        // sessionStorage.removeItem('passport_no')
        toast.success('Logout Successful')
        navigate('/log')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light px-5 " style={{ backgroundColor: '#e3f2fd' }}>

                <div className='ml-3' >
                    <Link className='navbar-brand active ' to='/' style={{ color: '#512888' }}>
                        <img src="Logo.png" alt="logo" style={{ width: '30px' }} /> IndiSky</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse d-flex  justify-content-around" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item active">
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to=''>Bookings</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className='nav-link' to='/home#about'>About Us</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className='nav-link' to='/home#contact'>Contact us</Link>
                        </li>
                    </ul>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <h6 style={{ margin: '5px', padding: '5px', color: '#0000D7' }}> Hello,
                        {/* {fullname} */}
                    </h6>
                    <button type="button" className="btn btn-outline-info " onClick={onLogout}>Logout</button>
                </div>
                
            </nav>
        </div>
    )
}

export default SlideBar
