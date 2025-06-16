import React from 'react'
import SlideBar from './../Component/SlideBar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Passengers() {

     const [info,setInfo]=useState({
            full_name:'',
            dob:'',
            passport_no:''
        })
    
        const navigate=useNavigate();

    async function onSave(){

        if(info.full_name.length==0){
            toast.error("Name cannot be Empty")
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
            const {full_name,dob,passport_no}=info
            // const result=await RegisterBody(full_name,dob,passport_no);
        
            // if(result.status=='success'){
                toast.success("Passenger Saved Successfully!")
            //     navigate('/')
            // }else{
            //     toast.error(result.error)
            // }
            
        }
    }

    return (
        <div>
            <SlideBar />
            <div className='p-4'>
                <div className="container">
                    <h1 style={{ textAlign: 'center ' }}>Passenger Registration</h1>

                    <hr />

                    <div className="row">
                        <div className="col"></div>
 
                        <div className="col">

                            <div className="form-group">
                                <label >Passenger Full Name </label>
                                <input type="text" className="form-control"
                                    onChange={(e) => {
                                        setInfo({ ...info, full_name: e.target.value })
                                    }}
                                    placeholder="Virat Kohli" />
                            </div>

    

                            <div className="form-group">
                                <label >Passenger Date of Birth </label>
                                <input type="date" className="form-control"
                                    onChange={(e) => {
                                        setInfo({ ...info, dob: e.target.value })
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label >Passenger Passport Number</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => {
                                        setInfo({ ...info, passport_no: e.target.value })
                                    }}
                                    placeholder="A1234567" />
                            </div>

                            <div>
                                <button type="button" className="btn btn-success btn-block " onClick={onSave}>Save Passenger</button>
                            </div>


                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Passengers
