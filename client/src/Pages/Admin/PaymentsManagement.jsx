import React, { useState } from 'react';
import '../../css/PaymentsManagement.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";

const dummyPayments = [
  {
    bookingId: 'BK101',
    amount: 6500,
    method: 'UPI',
    status: 'Success',
  },
  {
    bookingId: 'BK102',
    amount: 7200,
    method: 'Credit Card',
    status: 'Pending',
  },
  {
    bookingId: 'BK103',
    amount: 5000,
    method: 'Net Banking',
    status: 'Failed',
  },
  {
    bookingId: 'BK104',
    amount: 8400,
    method: 'UPI',
    status: 'Success',
  },
];

function PaymentsManagement() {
  const [collapsed, setCollapsed] = useState(false);
  const [payments, setPayments] = useState(dummyPayments);
  const [filter, setFilter] = useState('');

  const resolvePayment = (id) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.bookingId === id ? { ...p, status: 'Success' } : p
      )
    );
  };

  const filteredPayments = payments.filter((p) =>
    !filter ? true : p.status === filter
  );

  return (
    <div className={`admin-layout d-flex ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="admin-main flex-grow-1">
       <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <div className="main-content container-fluid mt-5 pt-3 px-4">
          <h2 className="fw-bold mb-4">Payments Management</h2>

          {/* Filter */}
          <div className="card p-3 mb-4 shadow-sm">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Filter by Status</label>
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Amount (₹)</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.bookingId}>
                      <td>{payment.bookingId}</td>
                      <td>{payment.amount.toLocaleString()}</td>
                      <td>{payment.method}</td>
                      <td>
                        <span className={`badge ${getBadgeClass(payment.status)} py-2 px-3`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {payment.status !== 'Success' && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => resolvePayment(payment.bookingId)}
                          >
                            Mark as Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No payments found.</td>
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

// Badge styling
function getBadgeClass(status) {
  switch (status) {
    case 'Success': return 'bg-success';
    case 'Pending': return 'bg-warning text-dark';
    case 'Failed': return 'bg-danger';
    default: return 'bg-secondary';
  }
}

export default PaymentsManagement;
