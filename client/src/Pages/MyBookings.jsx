// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SlideBar from '../Component/SlideBar';
// import Footer from '../Component/Footer';
// import Sidebar from '../Component/Sidebar';
// import TicketModal from '../Component/TicketModal'; // import modal
// import '../css/MyBookings.css';

// function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedBookingId, setSelectedBookingId] = useState(null);

//   const userId = localStorage.getItem('userId') || 1;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/bookings/user/${userId}`)
//       .then((res) => {
//         setBookings(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Axios error:', err);
//         setError('Failed to load bookings. Please try again.');
//         setLoading(false);
//       });
//   }, []);

//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.put(`http://localhost:8080/api/bookings/${bookingId}/cancel`);
//       const updated = bookings.map((b) =>
//         b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b
//       );
//       setBookings(updated);
//     } catch (err) {
//       console.error('Error cancelling booking:', err);
//       alert('Failed to cancel booking. Try again.');
//     }
//   };

//   const handleViewTickets = (bookingId) => {
//     setSelectedBookingId(bookingId); // open modal with selected booking ID
//   };

//   return (
//     <div>
//       <SlideBar />
//       <Sidebar />
//       <div className="my-bookings-container">
//         <h2 className="heading">My Bookings</h2>

//         {loading && <p>Loading bookings...</p>}
//         {error && <p className="text-danger">{error}</p>}

//         {bookings.map((b, index) => (
//           <div key={index} className="booking-card">
//             <div className="booking-header">
//               <h5>
//                 <i className="bi bi-airplane-engines-fill icon" /> {b.sourceAirport} → {b.destinationAirport}
//               </h5>
//               <span className={`status-badge ${b.status === 'CANCELLED' ? 'cancelled' : 'confirmed'}`}>
//                 {b.status}
//               </span>
//             </div>
//             <hr />
//             <div className="booking-info">
//               <p><strong>Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>
//               <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
//             </div>
//             <div className="booking-actions">
//               <button className="view-btn" onClick={() => handleViewTickets(b.bookingId)}>View Ticket(s)</button>
//               {b.status !== 'CANCELLED' && (
//                 <button className="cancel-btn" onClick={() => handleCancel(b.bookingId)}>Cancel Booking</button>
//               )}
//             </div>
//           </div>
//         ))}

//         {selectedBookingId && (
//           <TicketModal
//             bookingId={selectedBookingId}
//             onClose={() => setSelectedBookingId(null)}
//           />
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default MyBookings;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import Sidebar from '../Component/Sidebar';
import TicketModal from '../Component/TicketModal'; // ✅ Your given modal
import '../css/MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/bookings/user/${userId}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Axios error:', err);
        setError('Failed to load bookings. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${bookingId}/cancel`);
      const updated = bookings.map((b) =>
        b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Try again.');
    }
  };

  const handleViewTickets = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />
      <div className="my-bookings-container">
        <h2 className="heading">My Bookings</h2>

        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-danger">{error}</p>}

        {bookings.map((b, index) => (
          <div key={index} className="booking-card">
            <div className="booking-header">
              <h5>
                <i className="bi bi-airplane-engines-fill icon" /> {b.sourceAirport} → {b.destinationAirport}
              </h5>
              <span className={`status-badge ${b.status === 'CANCELLED' ? 'cancelled' : 'confirmed'}`}>
                {b.status}
              </span>
            </div>
            <hr />
            <div className="booking-info">
              <p><strong>Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
            </div>
            <div className="booking-actions">
              <button className="view-btn" onClick={() => handleViewTickets(b.bookingId)}>View Ticket(s)</button>
              {b.status !== 'CANCELLED' && (
                <button className="cancel-btn" onClick={() => handleCancel(b.bookingId)}>Cancel Booking</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {/* Show ticket modal */}
      {showModal && (
        <TicketModal bookingId={selectedBookingId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default MyBookings;
