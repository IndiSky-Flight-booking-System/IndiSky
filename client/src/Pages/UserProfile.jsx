import React, { useState } from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    alert('Password updated (dummy)');
    setPasswords({ oldPassword: '', newPassword: '' });
  };

  return (
    <div>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>User Profile</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="border p-4 bg-light rounded shadow-sm">
              <h5 className="mb-3">Personal Info</h5>
              <p><b>First Name:</b> {profile.first_name}</p>
              <p><b>Last Name:</b> {profile.last_name}</p>
              <p><b>Date of Birth:</b> {profile.dob}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Passport No:</b> {profile.passport_no}</p>

              <div className='d-flex align-items-center justify-content-center gap-4'> 
              <button className="btn btn-outline-info mt-3" onClick={() => navigate('/my-bookings')}>
                View Booking History
              </button>
              <button className='btn btn-outline-warning mt-3' onClick={()=>{
                navigate('/update-user')
              }} >Update Profile</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border p-4 bg-light rounded shadow-sm">
              <h5 className="mb-3">Update Password</h5>
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                  <label className="form-label">Old Password</label>
                  <input type="password" className="form-control" required
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-success">Update</button>
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
