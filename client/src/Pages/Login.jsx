// import {React,useContext,useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// // import { LoginBody } from '../services/user'
// import { toast } from 'react-toastify'
// // import { UserContext } from '../App'

// function Login() {
//     const [info, setInfo] = useState({
//         email: '',
//         password: ''
//     })

//     // const {setUser} =useContext(UserContext)
//     const navigate = useNavigate()

//     async function onLogin() {
//         if (info.email.length == 0) {
//             toast.error("Email cannot be Empty")
//         }
//         else if (info.password.length == 0) {
//             toast.error("Password cannot be Empty")
//         }
//         else {
//             const { email, password } = info
//             // const result = await LoginBody( email, password);
//             // console.log(result.data)
//             // if (result.status == 'success') {
//                 // const {token , full_name,phone_no,email,password,dob,passport_no}=result.data
//             //     sessionStorage.setItem('token',token)
//             //     sessionStorage.setItem('full_name',full_name)
//                 // sessionStorage.setItem('phone_no',phone_no)
//                 // sessionStorage.setItem('email',email)
//                 // sessionStorage.setItem('password',password)
//                 // sessionStorage.setItem('dob',dob)
//                 // sessionStorage.setItem('passport_no',passport_no)
//                 // setUser({full_name,email,password,phone_no,dob,passport_no});
//                 navigate('/home')
//                 toast.success("Welcome to Flightize")
//             // } else {
//             //     toast.error(result.error)
//             // }

//         }
//     }



//     return (
//         <div>
//             <div className="container">
//                 <br />
//                 <h1 style={{ textAlign: 'center ', margin: '10px' }}>User Login</h1>

//                 <hr />
//                 <br />
//                 <div className="row">
//                     <div className="col"></div>

//                     <div className="col">

//                         <div className="form-group m-2">
//                             <label >Email </label>
//                             <input type="email" className="form-control"
//                                 onChange={(e) => {
//                                     setInfo({ ...info, email: e.target.value })
//                                 }}
//                                 placeholder="virat@gmail.com" />
//                         </div>

//                         <div className="form-group m-2">
//                             <label >Password</label>
//                             <input type="password" className="form-control"
//                                 onChange={(e) => {
//                                     setInfo({ ...info, password: e.target.value })
//                                 }}
//                                 placeholder="Password " />
//                         </div>

//                         <div className='text-center'>
//                             <h6>Didn't Registered ? <Link to='/reg'>Register here</Link></h6>
//                             <button type="button" className="btn btn-success btn-block" onClick={onLogin}>Login</button>
//                         </div>


//                     </div>
//                     <div className="col"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Login.css';

function Login() {
    const [info, setInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onLogin = () => {
        if (!info.email) {
            toast.error('Email cannot be empty');
        } else if (!info.password) {
            toast.error('Password cannot be empty');
        } else {
            // Simulate login success
            navigate('/');
            toast.success('Welcome to Flightize!');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box shadow-lg rounded-4">
                <h2 className="text-center mb-4 text-primary">✈️ User Login</h2>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    />
                    <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setInfo({ ...info, password: e.target.value })}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <button className="btn btn-primary w-100 mb-3" onClick={onLogin}>
                    Login
                </button>

                <div className="text-center mt-3">
                    <p className="text-muted">
                        New user?{' '}
                        <Link
                            to="/reg"
                            className="register-link text-decoration-none fw-semibold">
                            Register here
                        </Link>
                    </p>
                </div>


            </div>
        </div>
    );
}

export default Login;
