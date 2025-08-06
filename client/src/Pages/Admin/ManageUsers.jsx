import React, { useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";

const initialUsers = [
  {
    user_id: 1,
    first_name: 'Akash',
    last_name: 'Bhadange',
    email: 'akash@example.com',
    phone: '1234567890',
    role: 'ROLE_USER',
    blocked: false,
  },
  {
    user_id: 2,
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    phone: '0987654321',
    role: 'ROLE_ADMIN',
    blocked: false,
  },
];

export default function ManageUsers() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const handleBlockToggle = (id) => {
    setUsers(users.map(user =>
      user.user_id === id ? { ...user, blocked: !user.blocked } : user
    ));
  };

  const handleResetPassword = (id) => {
    alert(`Reset password requested for user ID: ${id}`);
  };

  return (
    <div className={`admin-layout d-flex ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="admin-main flex-grow-1 p-4">
       <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <h2 className="fw-bold mb-4">User Management</h2>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id} style={{ opacity: u.blocked ? 0.6 : 1 }}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {u.role.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.blocked ? 'bg-danger' : 'bg-success'}`}>
                      {u.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${u.blocked ? 'btn-success' : 'btn-danger'} me-2`}
                      onClick={() => handleBlockToggle(u.user_id)}
                    >
                      {u.blocked ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleResetPassword(u.user_id)}
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No users available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
