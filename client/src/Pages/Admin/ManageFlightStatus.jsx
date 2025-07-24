import React, { useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';

const initialFlights = [
  {
    flight_id: 1,
    flight_number: '6E234',
    status: 'SCHEDULED',
  },
  {
    flight_id: 2,
    flight_number: 'AI567',
    status: 'DELAYED',
  },
];

const initialLogs = [
  {
    log_id: 1,
    flight_id: 1,
    status: 'SCHEDULED',
    updated_at: '2025-07-24T08:00:00',
  },
  {
    log_id: 2,
    flight_id: 2,
    status: 'DELAYED',
    updated_at: '2025-07-23T12:30:00',
  },
];

export default function FlightStatusManagement() {
  const [flights, setFlights] = useState(initialFlights);
  const [logs, setLogs] = useState(initialLogs);

  const updateStatus = (flight_id, newStatus) => {
    // Update flight status
    setFlights(flights.map(f => f.flight_id === flight_id ? {...f, status: newStatus} : f));

    // Add new log entry
    const newLog = {
      log_id: logs.length + 1,
      flight_id,
      status: newStatus,
      updated_at: new Date().toISOString(),
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 w-100">
        <h2>Flight Status Management</h2>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Current Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(f => (
              <tr key={f.flight_id}>
                <td>{f.flight_number}</td>
                <td>{f.status}</td>
                <td>
                  <select
                    className="form-select w-auto"
                    value={f.status}
                    onChange={(e) => updateStatus(f.flight_id, e.target.value)}
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="DELAYED">Delayed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-5">Flight Status Logs</h3>
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Flight ID</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.log_id}>
                <td>{log.log_id}</td>
                <td>{log.flight_id}</td>
                <td>{log.status}</td>
                <td>{new Date(log.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
