import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

function FlightStatus() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  // Dummy flight status data
  const dummyStatusData = {
    IS123: {
      flightNo: 'IS123',
      status: 'DELAYED',
      logs: [
        { time: '2025-08-05 07:00 AM', message: 'Flight check-in opened' },
        { time: '2025-08-05 08:00 AM', message: 'Delayed due to weather' },
        { time: '2025-08-05 08:30 AM', message: 'New departure time: 10:30 AM' }
      ]
    },
    BK001: {
      flightNo: 'IS456',
      status: 'SCHEDULED',
      logs: [
        { time: '2025-08-05 06:00 AM', message: 'Gate assigned: A12' },
        { time: '2025-08-05 07:15 AM', message: 'Boarding starts at 8:15 AM' }
      ]
    }
  };

  const handleCheckStatus = () => {
    if (!query) return alert('Please enter Flight Number or Booking ID');

    const data = dummyStatusData[query.toUpperCase()];
    if (data) setResult(data);
    else setResult({ error: 'No data found for entered input.' });
  };

  return (
    <div>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Flight Status Tracking</h2>

        <div className="border p-4 rounded bg-light shadow-sm">
          <div className="mb-3">
            <label className="form-label">Enter Flight Number or Booking ID</label>
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. IS123 or BK001"
            />
          </div>
          <button className="btn btn-primary" onClick={handleCheckStatus}>Check Status</button>
        </div>

        {result && (
          <div className="mt-4 border p-4 bg-light rounded shadow-sm">
            {result.error ? (
              <p className="text-danger">{result.error}</p>
            ) : (
              <>
                <p><b>Flight Number:</b> {result.flightNo}</p>
                <p><b>Status:</b> <span className={
                  result.status === 'CANCELLED' ? 'text-danger' :
                  result.status === 'DELAYED' ? 'text-warning' :
                  'text-success'
                }>{result.status}</span></p>

                <h5 className="mt-3">Update Logs:</h5>
                <ul className="list-group">
                  {result.logs.map((log, index) => (
                    <li key={index} className="list-group-item">
                      <b>{log.time}</b> – {log.message}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FlightStatus;
