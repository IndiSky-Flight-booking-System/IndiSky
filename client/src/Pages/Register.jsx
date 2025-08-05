
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { RegisterBody } from '../Service/user';
import '../css/Register.css';

function Register() {
  const [info, setInfo] = useState({
    role: 'USER',
    full_name: '',
    email: '',
    password: '',
    confirm_pass: '',
    phone_no: '',
    dob: '',
    passport_no: ''
  });

  const navigate = useNavigate();

  async function onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

    if (info.full_name.trim().length === 0) {
      toast.error('Name cannot be Empty');
    } else if (info.email.trim().length === 0) {
      toast.error('Email cannot be Empty');
    } else if (!emailRegex.test(info.email)) {
      toast.error('Invalid Email');
    } else if (info.password.trim().length === 0) {
      toast.error('Password cannot be Empty');
    } else if (info.password.length < 5) {
      toast.error('Not a Strong Password (at least 5 characters)');
    } else if (info.confirm_pass !== info.password) {
      toast.error("Password didn't match");
    } else if (info.phone_no.trim().length === 0) {
      toast.error('Phone Number cannot be Empty');
    } else if (info.phone_no.length !== 10) {
      toast.error('Invalid Phone Number');
    } else if (info.dob.trim().length === 0) {
      toast.error('Date of Birth cannot be Empty');
    } else if (info.passport_no.trim().length === 0) {
      toast.error('Passport Number cannot be Empty');
    } else if (info.passport_no.length < 8) {
      toast.error('Invalid Passport Number');
    } else {
      // Replace this with real API call
      toast.success('Registered Successfully!');
      navigate('/log');
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center mb-4">Create an Account</h2>
        <hr />

        {/* Role Selection */}
        <div className="form-group text-center mb-3">
          <label>Select Role</label>
          <div className="d-flex justify-content-center gap-4 mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="user"
                name="role"
                value="USER"
                checked={info.role === 'USER'}
                onChange={(e) => setInfo({ ...info, role: e.target.value })}
              />
              <label className="form-check-label" htmlFor="user">User</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="admin"
                name="role"
                value="ADMIN"
                checked={info.role === 'ADMIN'}
                onChange={(e) => setInfo({ ...info, role: e.target.value })}
              />
              <label className="form-check-label" htmlFor="admin">Admin</label>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        {[
          { label: 'Full Name', type: 'text', placeholder: 'Virat Kohli', key: 'full_name' },
          { label: 'Email', type: 'email', placeholder: 'virat@gmail.com', key: 'email' },
          { label: 'Password', type: 'password', placeholder: '********', key: 'password' },
          { label: 'Confirm Password', type: 'password', placeholder: '********', key: 'confirm_pass' },
          { label: 'Phone Number', type: 'tel', placeholder: '9876543210', key: 'phone_no' },
          { label: 'Date of Birth', type: 'date', placeholder: '', key: 'dob' },
          { label: 'Passport Number', type: 'text', placeholder: 'A1234567', key: 'passport_no' }
        ].map(({ label, type, placeholder, key }) => (
          <div className="form-group mb-3" key={key}>
            <label>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={info[key]}
              onChange={(e) => setInfo({ ...info, [key]: e.target.value })}
              className="form-control"
            />
          </div>
        ))}

        {/* Register Button */}
        <div className="text-center mt-4">
          <button className="btn btn-success w-100 fw-bold" onClick={onRegister}>
            Register
          </button>
          <p className="mt-4 text-muted">
            Already have an account?{' '}
            <Link to="/log" className="fw-bold text-decoration-none text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
