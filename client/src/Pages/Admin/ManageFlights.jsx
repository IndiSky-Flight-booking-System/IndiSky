
import React, { useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';

export default function ManageFlights() {
  const [flights, setFlights] = useState([
    {
      flight_id: 1,
      flight_number: '6E234',
      airline: 'IndiGo',
      source: 'DEL',
      destination: 'BOM',
      departure_time: '2025-08-01T08:00',
      arrival_time: '2025-08-01T10:00',
      status: 'SCHEDULED',
      base_price: 4500.0
    }
  ]);

  const [form, setForm] = useState({
    flight_id: null,
    flight_number: '',
    airline: '',
    source: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
    status: 'SCHEDULED',
    base_price: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.flight_id === null) {
      const newFlight = { ...form, flight_id: flights.length + 1 };
      setFlights([...flights, newFlight]);
    } else {
      setFlights(
        flights.map(f => f.flight_id === form.flight_id ? form : f)
      );
    }
    setForm({
      flight_id: null,
      flight_number: '',
      airline: '',
      source: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      status: 'SCHEDULED',
      base_price: ''
    });
  };

  const handleEdit = (flight) => {
    setForm(flight);
  };

  const handleDelete = (id) => {
    setFlights(flights.filter(f => f.flight_id !== id));
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 w-100">
        <h2>Manage Flights</h2>

        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <input type="text" className="form-control" name="flight_number" placeholder="Flight No" value={form.flight_number} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="airline" placeholder="Airline" value={form.airline} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" name="source" placeholder="Source" value={form.source} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" name="base_price" placeholder="Price" value={form.base_price} onChange={handleChange} required />
          </div>

          <div className="col-md-3">
            <input type="datetime-local" className="form-control" name="departure_time" value={form.departure_time} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="datetime-local" className="form-control" name="arrival_time" value={form.arrival_time} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <select name="status" className="form-select" value={form.status} onChange={handleChange}>
              <option value="SCHEDULED">Scheduled</option>
              <option value="DELAYED">Delayed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" type="submit">
              {form.flight_id === null ? 'Add Flight' : 'Update Flight'}
            </button>
          </div>
        </form>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Airline</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(f => (
              <tr key={f.flight_id}>
                <td>{f.flight_number}</td>
                <td>{f.airline}</td>
                <td>{f.source}</td>
                <td>{f.destination}</td>
                <td>{f.departure_time}</td>
                <td>{f.arrival_time}</td>
                <td>{f.status}</td>
                <td>{f.base_price}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(f)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(f.flight_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
