import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoContext } from '../App';
import { countries } from '../Component/country';
import { addPassenger } from '../Service/passenger';

function Passengers() {

    const { info } = useContext(infoContext);

    const [passengerList, setPassengerList] = useState([])


    useEffect(() => {
        let count = parseInt(info.passenger); //converted to int beacuse info.passeenger is stored in string
        console.log(count);

        //we are storing object into array
        const passArray = Array.from({ length: count }, () => ({
            full_name: '',
            dob: '',
            passport_no: '',
            nationality: 'IN',
        }))

        setPassengerList(passArray);
    }, [info.passenger])


    function onPassengerChange(index, field, value) {
        const newPass = [...passengerList]; //destructuring passengerlist from that selecting particular object and then from it 
        //particular field means key and appending in it as per the sequence
        newPass[index][field] = value;
        setPassengerList(newPass);//later updateing it 
    }

    const navigate = useNavigate();

    async function onSave() {

        for (let i = 0; i < passengerList.length; i++) {
            const p = passengerList[i];
            if (p.full_name.length == 0) {
                toast.error("Passenger " + i + 1 + " Name cannot be Empty")
                return;
            }
            else if (p.dob.length == 0) {
                toast.error("Passenger " + i + 1 + " Date of Birth cannot be Empty")
                return;
            }
            else if (p.passport_no.length == 0) {
                toast.error("Passenger " + i + 1 + " Phone Num cannot be Empty")
                return;
            }
            else if (p.passport_no.length < 8) {
                toast.error("Passenger " + i + 1 + " Invalid Passport not 1 character and 6 digit")
                return;
            }
        }

        // const { full_name, dob, passport_no } = pinfo
        // const result=await RegisterBody(full_name,dob,passport_no);

        const result = await addPassenger(passengerList)
        if (result.status == 'success') {
            toast.success("Passenger Saved Successfully!")
            navigate('/')
        } else {
            toast.error(result.error)
        }
    }

    return (
        <div>
            <SlideBar />
            <div className='p-4'>
                <div className="container">
                    <h1 style={{ textAlign: 'center ' }}>Passenger Registration</h1>

                    <hr />

                    <div className="row mt-0 row-cols-2">
                        {/* <div className="col"></div> */}

                        {passengerList.map((passenger, ind) => (
                            <div className="col-3 mt-4 " key={ind}>
                                <h3 className='text-warning'>Passenger {ind + 1}</h3>
                                <div className="form-group m-2">
                                    <label htmlFor='name'>Full Name </label>
                                    <input type="text" className="form-control w-75"
                                        onChange={(e) => {
                                            onPassengerChange(ind, 'full_name', e.target.value)
                                        }} id='name'
                                        placeholder="Virat Kohli" />
                                </div>

                                <div className="form-group m-2">
                                    <label htmlFor='date'>Date of Birth </label>
                                    <input type="date" className="form-control w-75" 
                                        onChange={(e) => {
                                            onPassengerChange(ind, 'dob', e.target.value)
                                        }} id='date'
                                    />
                                </div>

                                <div className="form-group m-2">
                                    <label htmlFor='pno'>Passport Number</label>
                                    <input type="text" className="form-control w-75"
                                        onChange={(e) => {
                                            onPassengerChange(ind, 'passport_no', e.target.value)
                                        }} id='pno'
                                        placeholder="A1234567" />
                                </div>

                                <div className="form-group col-md-4 m-2 w-75" >
                                    <label for="inputState">Nationality</label>
                                    <select id="inputState" className="form-select w-75"
                                        value={passenger.nationality}
                                        onChange={(e) => {
                                            onPassengerChange(ind, 'nationality', e.target.value)
                                        }}
                                    >
                                        {
                                            countries.map((ele, index) => {
                                                return (
                                                    <option key={index} value={ele.code}  >{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        ))}
                        {/* <div className="col"></div> */}


                    </div>
                </div>

                {passengerList != 0 && (
                    <div className='m-3 text-center'>
                        <button type="button" className="btn btn-success btn-block " onClick={onSave}>Save Passenger</button>
                    </div>

                )}


            </div>

        </div>
    )
}

export default Passengers
