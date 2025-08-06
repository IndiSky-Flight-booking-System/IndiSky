import React, { useState } from 'react';
import '../../css/UserManagement.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";

const dummyUsers = [
  { id: 1, name: 'Gaurav Shimpi', email: 'gaurav@gmail.com', role: 'ROLE_USER', status: 'ACTIVE' },
  { id: 2, name: 'Kalpesh', email: 'kalpesh@admin.com', role: 'ROLE_ADMIN', status: 'ACTIVE' },
  { id: 3, name: 'Riya Sharma', email: 'riya@gmail.com', role: 'ROLE_USER', status: 'BLOCKED' },
  { id: 4, name: 'Nikhil Patil', email: 'nikhil@gmail.com', role: 'ROLE_USER', status: 'ACTIVE' },
];

function UserManagement() {
  const [users, setUsers] = useState(dummyUsers);
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredUsers = roleFilter === 'ALL' ? users : users.filter(user => user.role === roleFilter);

  const toggleBlockStatus = (id) => {
    const updated = users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' }
        : user
    );
    setUsers(updated);
  };

  const resetPassword = (id) => {
    alert(`Password reset link has been sent to user ID ${id}`);
  };

  return (
    <div className="container my-5">
     <AdminSidebar />
      <h2 className="text-center mb-4 fw-bold">User Management</h2>

      {/* Role Filter */}
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.id}</strong></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'ROLE_ADMIN' ? 'bg-primary' : 'bg-secondary'}`}>
                      {user.role.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className={`btn btn-sm me-2 ${user.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => toggleBlockStatus(user.id)}
                    >
                      {user.status === 'ACTIVE' ? 'Block' : 'Unblock'}
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => resetPassword(user.id)}
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
