
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { RegisterBody } from '../Service/user';
import '../css/Register.css';

function Register() {
 
   const [info, setInfo] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_pass: '',
        phone_no: '',
        dob: '',
        passport_no: ''
    })

    const navigate = useNavigate()

    async function onRegister() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

        if (info.full_name.length == 0) {
            toast.error("Name cannot be Empty")
        } else if (info.email.length == 0) {
            toast.error("Email cannot be Empty")
        }
        else if (!emailRegex.test(info.email)) {
            toast.error("Invalid Email ")
        }
        else if (info.password.length == 0) {
            toast.error("Password cannot be Empty")
        }
        else if (info.password.length < 5) {
            toast.error("Not a Strong Password (atleast 5 char or digit) ")
        }
        else if (info.confirm_pass != info.password) {
            toast.error("Password didn't matched")
        }
        else if (info.phone_no.length == 0) {
            toast.error("Phone Num cannot be Empty")

        } else if (info.phone_no.length < 10) {
            toast.error("Invalid phone not a 10 digit number")
        }
        else if (info.dob.length == 0) {
            toast.error("Date of Birth cannot be Empty")
        }
        else if (info.passport_no.length == 0) {
            toast.error("Phone Num cannot be Empty")
        }
        else if (info.passport_no.length < 8) {
            toast.error("Invalid Passport not 1 character and 6 digit")
        }
        else {

            const {  full_name, email, password, phone_no, dob, passport_no } = info
            const result = await RegisterBody( full_name, email, password, phone_no, dob, passport_no);
            console.log(result);
            if (result.status === 201) {
                toast.success(result.data);
            } else {
                toast.error(result.data)
            }



        }
    }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center mb-4">Create an Account</h2>
        <hr />

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
