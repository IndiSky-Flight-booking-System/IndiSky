import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import '../css/UserProfile.css';
import Sidebar from '../Component/Sidebar';

function UserProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    first_name: 'Gaurav',
    last_name: 'Shimpi',
    dob: '2000-05-15',
    email: 'gaurav@example.com',
    phone: '9876543210',
    passport_no: 'X1234567'
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully (dummy)!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!passwords.oldPassword || !passwords.newPassword) {
      alert('Please enter both passwords');
      return;
    }
    alert('Password updated successfully (dummy)!');
    setPasswords({ oldPassword: '', newPassword: '' });
  };

  return (
    <div>
      <SlideBar />
      <Sidebar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 profile-title">User Profile</h2>
        <div className="row g-4">

          {/* Personal Info */}
          <div className="col-md-6">
            <div className="card profile-card shadow-sm p-4">
              <h5 className="mb-4 text-primary">Edit Personal Information</h5>
              <form onSubmit={handleProfileSave}>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Date of Birth</label>
                  <input
                    className="form-control"
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Passport Number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passport_no"
                    value={profile.passport_no}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/my-bookings')}
                  >
                    My Bookings
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Password Section */}
          <div className="col-md-6">
            <div className="card profile-card shadow-sm p-4">
              <h5 className="mb-4 text-success">Update Password</h5>
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                  <label>Old Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">Update Password</button>
              </form>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
