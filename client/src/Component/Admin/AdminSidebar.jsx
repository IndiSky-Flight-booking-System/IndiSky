import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/AdminSidebar.css';

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h4 className="text-center mb-4 text-white">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link 
            to="/admin/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/airlines"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Airlines
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/airports"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Airports
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/flights"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Flights
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/seats"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Flight Seats
          </Link>
        </li>
        {/* New Links for User and Flight Status Management */}
        <li className="nav-item">
          <Link 
            to="/admin/users"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Users
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/flight-status"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Flight Status Management
          </Link>
        </li>
      </ul>
    </div>
  );
}
