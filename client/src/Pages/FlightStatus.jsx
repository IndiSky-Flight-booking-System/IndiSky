// import React, { useState } from 'react';
// import SlideBar from '../Component/SlideBar';
// import Footer from '../Component/Footer';
// import Sidebar from '../Component/Sidebar';

// import '../css/FlightStatus.css'; // ✅ New custom styles


// function FlightStatus() {
//   const [query, setQuery] = useState('');
//   const [result, setResult] = useState(null);

//   const dummyStatusData = {
//     IS123: {
//       flightNo: 'IS123',
//       status: 'DELAYED',
//       logs: [
//         { time: '2025-08-05 07:00 AM', message: 'Flight check-in opened' },
//         { time: '2025-08-05 08:00 AM', message: 'Delayed due to weather' },
//         { time: '2025-08-05 08:30 AM', message: 'New departure time: 10:30 AM' }
//       ]
//     },
//     BK001: {
//       flightNo: 'IS456',
//       status: 'SCHEDULED',
//       logs: [
//         { time: '2025-08-05 06:00 AM', message: 'Gate assigned: A12' },
//         { time: '2025-08-05 07:15 AM', message: 'Boarding starts at 8:15 AM' }
//       ]
//     }
//   };

//   const handleCheckStatus = () => {
//     if (!query) return alert('Please enter Flight Number or Booking ID');
//     const data = dummyStatusData[query.toUpperCase()];
//     setResult(data || { error: 'No data found for entered input.' });
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'CANCELLED': return 'badge badge-danger';
//       case 'DELAYED': return 'badge badge-warning';
//       case 'SCHEDULED': return 'badge badge-info';
//       case 'ON TIME': return 'badge badge-success';
//       default: return 'badge badge-secondary';
//     }
//   };

//   return (
//     <div>
//       <SlideBar />
//       <Sidebar />
//       <div className="container mt-5 mb-5">
//         <h2 className="text-center mb-4 title-purple">Flight Status Tracking</h2>

//         <div className="status-box shadow-sm">
//           <div className="form-group mb-3">
//             <label className="form-label">Enter Flight Number or Booking ID</label>
//             <input
//               type="text"
//               className="form-control"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="e.g. IS123 or BK001"
//             />
//           </div>
//           <button className="btn btn-primary" onClick={handleCheckStatus}>Check Status</button>
//         </div>

//         {result && (
//           <div className="result-box mt-4 shadow-sm">
//             {result.error ? (
//               <p className="text-danger"><b>{result.error}</b></p>
//             ) : (
//               <>
//                 <p><b>Flight Number:</b> {result.flightNo}</p>
//                 <p><b>Status:</b> <span className={getStatusBadge(result.status)}>{result.status}</span></p>

//                 <h5 className="mt-3">Update Logs:</h5>
//                 <ul className="list-group custom-log-list">
//                   {result.logs.map((log, index) => (
//                     <li key={index} className="list-group-item">
//                       <b>{log.time}</b> – {log.message}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default FlightStatus;

import React, { useState } from 'react';
import axios from 'axios';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import Sidebar from '../Component/Sidebar';
import '../css/FlightStatus.css';

function FlightStatus() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheckStatus = async () => {
    setError('');
    setResult(null);
    if (!query) {
      alert('Please enter Flight Number');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/flights/status`, {
        params: { flightNumber: query }
      });
      const data = response.data;

      // Map backend data to frontend expected structure
      const flightData = {
        flightNo: query.toUpperCase(),
        status: data.status,
        updatedAt: data.updatedAt
      };

      setResult(flightData);
    } catch (err) {
      console.error(err);
      setError('Flight not found or backend error occurred.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CANCELLED': return 'badge badge-danger';
      case 'DELAYED': return 'badge badge-warning';
      case 'SCHEDULED': return 'badge badge-info';
      case 'ON TIME': return 'badge badge-success';
      default: return 'badge badge-secondary';
    }
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />

      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 title-purple">Flight Status Tracking</h2>

        <div className="status-box shadow-sm">
          <div className="form-group mb-3">
            <label className="form-label">Enter Flight Number</label>
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. IN101"
            />
          </div>
          <button className="btn btn-primary" onClick={handleCheckStatus}>Check Status</button>
        </div>

        {error && (
          <div className="result-box mt-4 shadow-sm">
            <p className="text-danger"><b>{error}</b></p>
          </div>
        )}

        {result && (
          <div className="result-box mt-4 shadow-sm">
            <p><b>Flight Number:</b> {result.flightNo}</p>
            <p><b>Status:</b> <span className={getStatusBadge(result.status)}>{result.status}</span></p>
            <p><b>Last Updated:</b> {new Date(result.updatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default FlightStatus;
