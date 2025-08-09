import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children, requiredRole }) {
  const token = sessionStorage.getItem('token');
  const storedRole = sessionStorage.getItem('role');
  const navigate = useNavigate();

  const normalizeRole = (role) => role?.replace('ROLE_', '').toUpperCase();

  // If token not found, redirect immediately
  if (!token) {
    return <Navigate to={requiredRole === 'ADMIN' ? '/admin/login' : '/user/log'} replace />;
  }else{
    useEffect(() => {
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const actualRole = normalizeRole(payload.Role || storedRole);
  
        // If role doesn't match requiredRole, redirect accordingly
        if (actualRole !== requiredRole) {
          sessionStorage.removeItem('token');
          navigate(actualRole === 'ADMIN' ? '/admin/login' : '/user/log', { replace: true });
        }
      } catch (e) {
        sessionStorage.removeItem('token');
        navigate(requiredRole === 'ADMIN' ? '/admin/login' : '/user/log', { replace: true });
      }
    }, [token, storedRole, requiredRole, navigate]);

  }


  return children;
}
