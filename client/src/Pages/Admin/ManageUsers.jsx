import React, { useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';

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
  const [users, setUsers] = useState(initialUsers);

  const handleBlockToggle = (id) => {
    setUsers(users.map(user => 
      user.user_id === id ? {...user, blocked: !user.blocked} : user
    ));
  };

  const handleResetPassword = (id) => {
    // For demo, just alert. In real app, trigger backend password reset flow.
    alert(`Reset password requested for user ID: ${id}`);
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 w-100">
        <h2>User Management</h2>
        <table className="table table-bordered mt-3">
          <thead>
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
            {users.map(u => (
              <tr key={u.user_id} style={{opacity: u.blocked ? 0.5 : 1}}>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role.replace('ROLE_', '')}</td>
                <td>{u.blocked ? 'Blocked' : 'Active'}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
