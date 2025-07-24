import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/AdminSidebar.css';

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h4 className="text-center mb-4 text-white">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink 
            to="/admin/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/admin/airlines"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Airlines
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/admin/airports"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Airports
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/admin/flights"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Flights
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/admin/seats"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Flight Seats
          </NavLink>
        </li>
        {/* New Links for User and Flight Status Management */}
        <li className="nav-item">
          <NavLink 
            to="/admin/users"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Manage Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/admin/flight-status"
            className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
          >
            Flight Status Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
