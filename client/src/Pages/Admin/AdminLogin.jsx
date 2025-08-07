import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminLogin.css'; // Optional, for custom tweaks

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Static credentials
    const staticEmail = 'admin@indisky.com';
    const staticPassword = 'admin123';

    if (email === staticEmail && password === staticPassword) {
      setError('');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <img
            src="https://img.icons8.com/color/96/airport.png"
            alt="IndiSky Logo"
            className="mb-2"
          />
          <h3 className="fw-bold text-primary">IndiSky Admin</h3>
          <p className="text-muted">Sign in to continue</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@indisky.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <small className="text-muted">© 2025 IndiSky Admin Panel</small>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
