// import React from 'react'
// import SlideBar from '../Component/SlideBar'
// import Search from './../Component/Search';

// function UserDashBoard() {
//     return (
//         <div>
//             <SlideBar />
//             <Search />

//             <div className="container my-3">
//                 <h3 className='text-center'>Upcoming Bookings</h3>
//                 <div className="row">
//                     <div className="col"></div>
//                     <div className="col-12">
//                         <table className="table table-hover ">
//                             <thead className="table-dark">
//                                 <tr>
//                                     <th>Booking ID</th>
//                                     <th>Date</th>
//                                     <th>Flight</th>
//                                     <th>Status</th>
//                                     <th>Total Price</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>#BKG1234</td>
//                                     <td>2024-07-24</td>
//                                     <td>Air India</td>
//                                     <td><span className="badge text-bg-success">CONFIRMED</span></td>
//                                     <td>₹8,500</td>
//                                 </tr>
//                                 <tr>
//                                     <td>#BKG1233</td>
//                                     <td>2024-07-24</td>
//                                     <td>Indigo</td>
//                                     <td><span className="badge text-bg-warning">PENDING</span></td>
//                                     <td>₹9,500</td>
//                                 </tr>
//                                 <tr>
//                                    <td>#BKG1235</td>
//                                     <td>2024-07-24</td>
//                                     <td>Emirates</td>
//                                     <td><span className="badge text-bg-danger">CANCELLED</span></td>
//                                     <td>₹7,000</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="col"></div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default UserDashBoard

import React from 'react';
import SlideBar from '../Component/SlideBar';
import Search from './../Component/Search';
import '../css/UserDashBoard.css';
import Sidebar from '../Component/Navbar';

function UserDashBoard() {
  const bookings = [
    { id: '#BKG1234', date: '2024-07-24', flight: 'Air India', status: 'CONFIRMED', price: 8500 },
    { id: '#BKG1233', date: '2024-07-24', flight: 'Indigo', status: 'PENDING', price: 9500 },
    { id: '#BKG1235', date: '2024-07-24', flight: 'Emirates', status: 'CANCELLED', price: 7000 },
  ];

  // Helper to get badge color class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-success';
      case 'PENDING':
        return 'bg-warning text-dark';
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />
      <Search />

      <div className="container my-4">
        <h3 className="text-center mb-4 fw-bold">Upcoming Bookings</h3>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Booking ID</th>
                <th scope="col">Date</th>
                <th scope="col">Flight</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.flight}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(booking.status)} py-2 px-3`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="text-end">₹{booking.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
