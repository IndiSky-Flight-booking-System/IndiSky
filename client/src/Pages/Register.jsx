import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { UserContext } from './../App';


function Register() {



    const [info,setInfo]=useState({
        full_name:'',
        email:'',
        password:'',
        confirm_pass:'',
        phone_no:'',
        dob:'',
        passport_no:''
    })

    const navigate=useNavigate()

    async function onRegister(){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

        if(info.full_name.length==0){
            toast.error("Name cannot be Empty")
        }else if(info.email.length==0){
            toast.error("Email cannot be Empty")
        }
        else if( !emailRegex.test(info.email)){
            toast.error("Invalid Email ")
        }
        else if(info.password.length==0){
            toast.error("Password cannot be Empty")
        }
        else if(info.password.length < 5){
            toast.error("Not a Strong Password (atleast 5 char or digit) ")
        }
        else if(info.confirm_pass!=info.password){
            toast.error("Password didn't matched")
        }
        else if(info.phone_no.length==0){
            toast.error("Phone Num cannot be Empty")

        }else if(info.phone_no.length < 10){
            toast.error("Invalid phone not a 10 digit number")
        }
        else if(info.dob.length==0){
            toast.error("Date of Birth cannot be Empty")
        }
        else if(info.passport_no.length==0){
            toast.error("Phone Num cannot be Empty")
        }
        else if(info.passport_no.length<8){
            toast.error("Invalid Passport not 1 character and 6 digit")
        }
        else{
            const {full_name,email,password,phone_no,dob,passport_no}=info
            // const result=await RegisterBody(full_name,email,password,phone_no,dob,passport_no);
        
            // if(result.status=='success'){
                toast.success("Registered Successfully!")
            //     navigate('/')
            // }else{
            //     toast.error(result.error)
            // }
            
        }
    }


    return (
        <div className='p-4'>
            <div className="container">
                <h1 style={{ textAlign: 'center ' }}>User Registration</h1>

                <hr />
        
                <div className="row">
                    <div className="col"></div>
                   
                    <div className="col">

                        <div className="form-group">
                            <label >Full Name </label>
                            <input type="text" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, full_name:e.target.value})
                            }}
                            placeholder="Virat Kohli" />
                        </div>

                        <div className="form-group">
                            <label >Email </label>
                            <input type="email" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, email:e.target.value})
                            }}
                            placeholder="virat@gmail.com " />
                        </div>

                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, password:e.target.value})
                            }}
                            placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label >Confirm Password</label>
                            <input type="password" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, confirm_pass:e.target.value})
                            }}
                            placeholder="Confirm Password" />
                        </div>

                        <div className="form-group">
                            <label >Phone Number </label>
                            <input type="tel" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, phone_no:e.target.value})
                            }}
                            placeholder="9876543210" />
                        </div>

                        <div className="form-group">
                            <label >Enter Date of Birth </label>
                            <input type="date" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, dob:e.target.value})
                            }}
                             />
                        </div>

                        <div className="form-group">
                            <label >Enter Passport Number</label>
                            <input type="text" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, passport_no:e.target.value})
                            }}
                            placeholder="A1234567" />
                        </div>

                        <div>
                            <h6>Already Registered ? <Link to='/log'>Login here</Link></h6>
                            <button type="button"  className="btn btn-success btn-block " onClick={onRegister}>Create Account</button>
                        </div>


                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

export default Register
