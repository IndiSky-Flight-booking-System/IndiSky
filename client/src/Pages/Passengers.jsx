import SlideBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { infoContext } from '../App';
import { countries } from '../Component/country';
import { addPassenger } from '../Service/passenger';
import '../css/Passengers.css';
import Sidebar from '../Component/Sidebar';

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
      <Sidebar />
      <div className="container mt-4 mb-5">
        <h2 className="text-center title">Passenger Registration</h2>
        <hr />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {passengerList.map((passenger, index) => (
            <div className="col" key={index}>
              <div className="card shadow passenger-card">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">Passenger {index + 1}</h5>

                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Virat Kohli"
                      onChange={(e) => onPassengerChange(index, 'full_name', e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => onPassengerChange(index, 'dob', e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Passport Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="A1234567"
                      onChange={(e) => onPassengerChange(index, 'passport_no', e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Nationality</label>
                    <select
                      className="form-select"
                      value={passenger.nationality}
                      onChange={(e) => onPassengerChange(index, 'nationality', e.target.value)}
                    >
                      {countries.map((country, idx) => (
                        <option key={idx} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {passengerList.length !== 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-primary px-4 py-2 save-btn" onClick={onSave}>
              Save Passengers
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Passengers;
