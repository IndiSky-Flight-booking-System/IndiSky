import React, { useEffect, useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import '../css/PaymentHistory.css';
//import Sidebar from '../Component/Sidebar';
import { getPaymentsByUser } from '../Service/payment';

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  const userId = 2; // ✅ Replace with dynamic value if needed

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentsByUser(userId);
        setPayments(data);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history. Please try again later.');
      }
    };

    fetchPayments();
  }, []);

  const statusClass = (status) => {
    switch (status) {
      case 'SUCCESS': return 'status-success';
      case 'PENDING': return 'status-pending';
      case 'FAILED': return 'status-failed';
      case 'REFUNDED': return 'status-refunded';
      default: return '';
    }
  };

  return (
    <div>
      <SlideBar />
      {/* <Sidebar /> */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Payment History</h2>

        {error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="payment-history-container">
            <table className="payment-table table table-borderless">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Amount (₹)</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No payment records found.</td>
                  </tr>
                ) : (
                  payments.map((p, i) => (
                    <tr key={i}>
                      <td>{`PAY${String(p.paymentId).padStart(3, '0')}`}</td>
                      <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                      <td>₹{p.amountPaid}</td>
                      <td>{p.paymentMethod.replace('_', ' ')}</td>
                      <td>
                        <span className={`badge-status ${statusClass(p.paymentStatus)}`}>
                          {p.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PaymentHistory;
