import React, { useState } from 'react';
import '../css/FlightStatusManagement.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";
const dummyFlights = [
    {
        flightId: 'AI202',
        airline: 'Air India',
        from: 'Delhi',
        to: 'Mumbai',
        departure: '2025-08-08 10:00',
        status: 'SCHEDULED',
    },
    {
        flightId: '6E303',
        airline: 'IndiGo',
        from: 'Pune',
        to: 'Hyderabad',
        departure: '2025-08-09 14:30',
        status: 'DELAYED',
    },
    {
        flightId: 'SG404',
        airline: 'SpiceJet',
        from: 'Chennai',
        to: 'Kolkata',
        departure: '2025-08-10 09:15',
        status: 'CANCELLED',
    },
];

function FlightStatusManagement() {
    const [flights, setFlights] = useState(dummyFlights);
    const [logs, setLogs] = useState([]);

    const updateStatus = (id, newStatus) => {
        const updatedFlights = flights.map(f =>
            f.flightId === id ? { ...f, status: newStatus } : f
        );
        const flight = flights.find(f => f.flightId === id);
        setFlights(updatedFlights);
        setLogs(prev => [
            ...prev,
            {
                flightId: id,
                time: new Date().toLocaleString(),
                fromStatus: flight.status,
                toStatus: newStatus,
            },
        ]);
    };

    return (
        <div className="admin-layout d-flex">
            <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="admin-main flex-grow-1">

                

                <div className="main-content container-fluid mt-5 pt-3 px-4">
                    <h2 className="text-center fw-bold mb-4">Flight Status Management</h2>


                    {/* Flights Table */}
                    <div className="table-responsive mb-5 shadow-sm rounded">
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Flight</th>
                                    <th>Route</th>
                                    <th>Departure</th>
                                    <th>Status</th>
                                    <th className="text-center">Update Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((f) => (
                                    <tr key={f.flightId}>
                                        <td><strong>{f.flightId}</strong><br /><small>{f.airline}</small></td>
                                        <td>{f.from} → {f.to}</td>
                                        <td>{f.departure}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(f.status)} py-2 px-3`}>
                                                {f.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <select
                                                className="form-select"
                                                value={f.status}
                                                onChange={(e) => updateStatus(f.flightId, e.target.value)}
                                                disabled={f.status === 'CANCELLED'}
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
                    </div>

                    {/* Logs */}
                    <h4 className="fw-bold mb-3">Flight Status Logs</h4>
                    <div className="table-responsive shadow-sm rounded">
                        <table className="table table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Time</th>
                                    <th>Status Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <tr key={index}>
                                            <td>{log.flightId}</td>
                                            <td>{log.time}</td>
                                            <td>
                                                <span className="text-muted">{log.fromStatus}</span>
                                                {' → '}
                                                <strong>{log.toStatus}</strong>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-3">No logs yet.</td>
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

function getStatusBadge(status) {
    switch (status) {
        case 'SCHEDULED': return 'bg-success';
        case 'DELAYED': return 'bg-warning text-dark';
        case 'CANCELLED': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

export default FlightStatusManagement;
