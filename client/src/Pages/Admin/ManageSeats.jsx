// /src/Pages/Admin/ManageSeats.jsx
import React, { useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import '../../css/ManageSeats.css'; // Optional CSS if you created one
import "../../css/AdminHeader.css";

const dummySeats = [
  { seat_id: 1, seat_number: '1A', seat_class: 'ECONOMY', is_booked: false, flight_id: 101 },
  { seat_id: 2, seat_number: '1B', seat_class: 'ECONOMY', is_booked: true, flight_id: 101 },
  { seat_id: 3, seat_number: '1C', seat_class: 'BUSINESS', is_booked: false, flight_id: 102 },
];

export default function ManageSeats() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // ✅ Added this
  const [seats, setSeats] = useState(dummySeats);
  const [form, setForm] = useState({ seat_id: '', seat_number: '', seat_class: 'ECONOMY', is_booked: false, flight_id: '' });
  const [editing, setEditing] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      setSeats(prev => prev.map(s => s.seat_id === form.seat_id ? form : s));
    } else {
      setSeats(prev => [...prev, { ...form, seat_id: Date.now() }]);
    }
    setForm({ seat_id: '', seat_number: '', seat_class: 'ECONOMY', is_booked: false, flight_id: '' });
    setEditing(false);
  };

  const handleEdit = seat => {
    setForm(seat);
    setEditing(true);
  };

  const handleDelete = id => {
    setSeats(prev => prev.filter(s => s.seat_id !== id));
  };

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="admin-main p-4">
       <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <h2>Manage Flight Seats</h2>

        <form onSubmit={handleSubmit} className="row g-3 mb-4">
          <div className="col-md-3">
            <input className="form-control" name="seat_number" placeholder="Seat Number" value={form.seat_number} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <select className="form-select" name="seat_class" value={form.seat_class} onChange={handleChange} required>
              <option value="ECONOMY">Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
          <div className="col-md-2">
            <input className="form-control" name="flight_id" placeholder="Flight ID" value={form.flight_id} onChange={handleChange} required />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="is_booked" checked={form.is_booked} onChange={handleChange} />
              <label className="form-check-label">Booked</label>
            </div>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">{editing ? 'Update' : 'Add'}</button>
          </div>
        </form>

        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Seat Number</th>
              <th>Class</th>
              <th>Booked</th>
              <th>Flight ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seats.map(seat => (
              <tr key={seat.seat_id}>
                <td>{seat.seat_id}</td>
                <td>{seat.seat_number}</td>
                <td>{seat.seat_class}</td>
                <td>{seat.is_booked ? 'Yes' : 'No'}</td>
                <td>{seat.flight_id}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(seat)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(seat.seat_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
