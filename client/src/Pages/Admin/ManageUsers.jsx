import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";
import { myAxios } from '../../Service/config';

export default function ManageUsers() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await myAxios.get('/admin/user/users');
      console.log(res.data)
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await myAxios.put(`/admin/user/role/${userId}?role=${newRole}`);
      setUsers(users.map(user => user.id === userId ? { ...user, personRole: newRole } : user));
    } catch (err) {
      console.error("Failed to update role", err);
    }
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
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Passport No</th>
                <th>Birth Date</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{[index + 1]}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phoneNo}</td>
                  <td>{u.passportNo}</td>
                  <td>{u.birthDate}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {u.personRole}
                    </span>
                  </td>
                  <td>
                    <select
                      value={u.personRole}
                      className="form-select form-select-sm"
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}