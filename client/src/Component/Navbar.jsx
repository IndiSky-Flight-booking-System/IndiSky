import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SideBar.css';
import { Menu, X } from 'lucide-react'; // Optional: install lucide-react for icons
//import BookingConfirmation from './../Pages/User Pages/BookingConfirmation';

function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            {/* Toggle Button */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h4>IndiSky</h4>
                </div>
                <ul className="sidebar-nav">
                    <li><Link to="/" className="sidebar-link">Home</Link></li>
                    <li><Link to="/my-bookings" className="sidebar-link">My Bookings</Link></li>
                    <li><Link to="/profile" className="sidebar-link">Profile</Link></li>
                    <li><Link to="/flight-status" className="sidebar-link">Flight Status</Link></li>
                    <li><Link to="/contact" className="sidebar-link">Support</Link></li>
                    <li><Link to="/review-payment" className="sidebar-link">Review Payment</Link></li>
                    <li><Link to="/payment-history" className="sidebar-link">Payment History</Link></li>
                    <li><Link to="/booking-confirmation" className="sidebar-link">Booking Confirmation</Link></li>
                    {/* <li><Link to="/booking-confirmation" className="sidebar-link">Booking Cancellation</Link></li>
                     */}
                    <li><button className="sidebar-link logout-btn" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        </>
    );
}

export default SlideBar;
