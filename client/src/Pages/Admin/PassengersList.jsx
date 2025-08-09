import React, { useEffect, useState } from 'react';
import { myAxios } from '../../Service/config';
import '../../css/PassengersList.css';
import AdminSidebar from '../../Component/Admin/AdminSidebar';
import "../../css/AdminHeader.css";

function PassengersList() {
  const [collapsed, setCollapsed] = useState(false);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await myAxios.get('/admin/passenger/getAll');
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchPassengers();
  }, []);

  return (
    <div className={`admin-layout d-flex ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="admin-main flex-grow-1">
        <h1 className="indisky-admin-heading">IndiSky Admin</h1>
        <div className="main-content container-fluid mt-5 pt-3 px-4">
          <h2 className="fw-bold mb-4">Passengers List</h2>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Passenger No.</th>
                  <th>Full Name</th>
                  <th>Date of Birth</th>
                  <th>Passport No</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {passengers.length > 0 ? (
                  passengers.map((p, index) => (
                    <tr key={index}>
                      <td>{[index+1]}</td>
                      <td>{p.fullName}</td>
                      <td>{p.dob}</td>
                      <td>{p.passportNo}</td>
                      <td>{p.nationality}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No passengers found.</td>
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

export default PassengersList;
