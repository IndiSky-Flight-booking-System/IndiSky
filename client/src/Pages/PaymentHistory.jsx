import React from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

function PaymentHistory() {
  const payments = [
    {
      id: 'PAY001',
      date: '2025-08-05',
      amount: 4599,
      method: 'UPI',
      status: 'SUCCESS'
    },
    {
      id: 'PAY002',
      date: '2025-08-10',
      amount: 3899,
      method: 'DEBIT_CARD',
      status: 'PENDING'
    },
    {
      id: 'PAY003',
      date: '2025-08-15',
      amount: 2000,
      method: 'CREDIT_CARD',
      status: 'FAILED'
    },
    {
      id: 'PAY004',
      date: '2025-08-20',
      amount: 1200,
      method: 'NET_BANKING',
      status: 'REFUNDED'
    }
  ];

  const statusClass = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-success';
      case 'PENDING': return 'text-warning';
      case 'FAILED': return 'text-danger';
      case 'REFUNDED': return 'text-primary';
      default: return '';
    }
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Payment History</h2>

        <div className="table-responsive bg-light shadow-sm rounded p-3">
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Amount (₹)</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.date}</td>
                  <td>{p.amount}</td>
                  <td>{p.method.replace('_', ' ')}</td>
                  <td className={statusClass(p.status)}><b>{p.status}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentHistory;
