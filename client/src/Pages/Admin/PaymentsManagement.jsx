import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";
import "../../css/PaymentsManagement.css";
import { myAxios } from '../../Service/config';

function PaymentManagement() {
  const [collapsed, setCollapsed] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchPayments = async () => {
    try {
      const res = await myAxios.get('/admin/payment/getAll');
      // console.log(res.data);
      setPayments(res.data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    !filter ? true : payment.paymentStatus === filter
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
                <label className="form-label fw-semibold">Filter by Payment Status</label>
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Payment No.</th>
                  <th>Amount Paid (₹)</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <tr key={index}>
                      <td>{[index+1]}</td>
                      <td>{payment.amountPaid?.toLocaleString() || 'N/A'}</td>
                      <td>{payment.paymentMethod || 'N/A'}</td>
                      <td>
                        <span className={`badge ${getBadgeClass(payment.paymentStatus)} py-2 px-3`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td>{formatDate(payment.paymentDate)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No payments found.</td>
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

// Format Java Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Badge styling
function getBadgeClass(status) {
  switch (status) {
    case 'SUCCESS': return 'bg-success';
    case 'PENDING': return 'bg-warning text-dark';
    case 'FAILED': return 'bg-danger';
    default: return 'bg-secondary';
  }
}

export default PaymentManagement;
