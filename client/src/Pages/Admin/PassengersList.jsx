import React, { useState } from 'react';
import '../../css/PassengersList.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";

const dummyPassengers = [
  {
    id: 1,
    name: 'Amit Kumar',
    age: 32,
    gender: 'Male',
    bookingId: 'BK101',
    ticketId: 'TCK1001',
  },
  {
    id: 2,
    name: 'Rina Shah',
    age: 28,
    gender: 'Female',
    bookingId: 'BK102',
    ticketId: 'TCK1002',
  },
  {
    id: 3,
    name: 'Soham Mehta',
    age: 45,
    gender: 'Male',
    bookingId: 'BK103',
    ticketId: 'TCK1003',
  },
  {
    id: 4,
    name: 'Nikita Patil',
    age: 19,
    gender: 'Female',
    bookingId: 'BK104',
    ticketId: 'TCK1004',
  },
];

function PassengersList() {
  const [collapsed, setCollapsed] = useState(false);
  const [passengers] = useState(dummyPassengers);

  return (
    <div className={`admin-layout d-flex ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="admin-main flex-grow-1">
       <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <div className="main-content container-fluid mt-5 pt-3 px-4">
          <h2 className="fw-bold mb-4">Passengers List</h2>

          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Passenger Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Booking ID</th>
                  <th>Ticket ID</th>
                </tr>
              </thead>
              <tbody>
                {passengers.length > 0 ? (
                  passengers.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                      <td><span className="badge bg-primary">{p.bookingId}</span></td>
                      <td><span className="badge bg-secondary">{p.ticketId}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No passengers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengersList;
