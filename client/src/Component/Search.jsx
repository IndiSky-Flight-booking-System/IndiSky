import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import '../css/SearchHeader.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { infoContext, searchedFlightsContext } from '../App';


function Search() {

    const { info, setInfo } = useContext(infoContext)
    const {setSearched} =useContext(searchedFlightsContext);

    const [child, setChild] = useState(0);
    const [adult, setAdult] = useState(1);
    const [senior, setSenior] = useState(0);
    const [trips, setTrips] = useState('OneWay');
    const [clas, setClas] = useState('');

    useEffect(() => {
        if (info) {
            setChild(info.child || 0);
            setAdult(info.adult || 1);
            setSenior(info.senior || 0);
            setTrips(info.trip || 'OneWay');
            setClas(info.Tclass || '');
        }
    }, []);

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const next = new Date();
    next.setDate(next.getDate() + 1);
    const tom = next.toISOString().split('T')[0]
    // console.log(tom)

    let total = child + adult + senior;
    const maxTotal = 9;

    //It was just giving default value when changed to roundtrip and summation of total
    //It was not Synchronizing properly  therefore used useEffect to update it simultaneously 
    //did for both in single useEffect  
    useEffect(() => {
        setInfo(e => ({
            ...e, passenger: total,
            trip: trips,
            departure: e.departure || today,
            arrival: trips == 'OneWay' ? '' : (e.arrival || tom),
            Tclass: clas,
            adult: adult,
            child: child,
            senior: senior
        }));

    }, [total, trips, clas ,adult,child,senior])


    const navigate = useNavigate();
    function onSearch() {

        if (info.from.length == 0) {
            toast.error("Source location is Empty")
        } else if (info.to.length == 0) {
            toast.error("Destination location is Empty")
        } else if (info.departure.length === 0) {
            toast.error("Departure date is Empty")
        } else if (info.Tclass.length == 0) {
            toast.error("Class Not selected")
        }
        else {
            navigate('/show')
            setSearched(true);
        }

    }

    return (
        <div>

            <div class="container bg-light bg-gradient py-2 " >
                <div className="trips" >
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Trip" id="inlineRadio1" checked={trips == 'OneWay'} value="OneWay"
                            onChange={(e) => {
                                setTrips(e.target.value)
                            }}
                        />
                        <label className="form-check-label" for="inlineRadio1">One way</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Trip" id="inlineRadio2" value="RoundTrip" checked={trips == 'RoundTrip'}
                            onChange={(e) => {
                                setTrips(e.target.value)
                            }}
                        />
                        <label className="form-check-label" for="inlineRadio2">Round Trip</label>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-around">
                    <div className='group'>
                        <label htmlFor="from">From</label>
                        <input type="search" className='rounded border px-2 py-1 form-control ' placeholder='Pune' value={info.from || ''}
                            onChange={(e) => {
                                setInfo({ ...info, from: e.target.value })
                            }}
                            id='from' />
                    </div>

                    <div className='group'>
                        <label htmlFor="to">To</label>
                        <input type="search" className='rounded border px-2 py-1 form-control' placeholder='Kochi' value={info.to || ''}
                            onChange={(e) => {
                                setInfo({ ...info, to: e.target.value })
                            }}
                            id='to' />
                    </div>

                    <div className='group'>
                        <label htmlFor="dept">Departure</label>
                        <input type="date" className='rounded border px-2 py-1 form-control'
                            min={today} value={info.departure || today}

                            onChange={(e) => {
                                setInfo({ ...info, departure: e.target.value, arrival: '' })
                            }}
                            id='dept' />
                    </div>

                    <div className='group'>

                        <label htmlFor="ret">Return</label>

                        {trips == "RoundTrip" ? (
                            <input type="date" className='rounded border px-2 py-1 form-control '
                                min={today} value={info.arrival || tom}
                                onChange={(e) => {
                                    setInfo({ ...info, arrival: e.target.value })
                                }}
                                id='ret' />) :

                            (<input type="date" className='rounded border px-2 py-1 form-control '
                                min={today} value={info.arrival || tom}
                                disabled id='ret' />)
                        }



                    </div>

                    <div className="group dropdown">
                        <label >Passengers & class</label>
                        <span className='text-success '>{clas}</span>
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="trav"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Travellers ({total || info.passenger})
                        </button>

                        {/* when clicked on label name the drop down was getting closed automatically beccause of bootstrap
                        therefore used inbuild method stop Propagation  */}
                        <ul className="dropdown-menu " style={{ width: "350px" }} aria-labelledby="trav"
                            onClick={(e) => e.stopPropagation()}>
                            <li className='d-flex align-items-center justify-content-center  ' ><label className="dropdown-item m-0">Child </label>
                                <input className="form-range ms-0" type="range" name="child" value={info.child || child} min={0}
                                    max={Math.min(5, maxTotal - adult - senior)} onChange={(e) =>
                                        setChild(Number(e.target.value))  //used NUmber beacuse to convert string to integer
                                        //here range is by deafult string thats why Number

                                    } ></input>
                                <span className="mx-2 text-success">{info.child || child}</span>
                            </li>

                            <li className='d-flex align-items-center justify-content-center ' ><label className="dropdown-item m-0">Adult </label>
                                <input className="form-range ms-1" type="range" name="adult" value={info.adult || adult} min={0}
                                    max={Math.min(9, maxTotal - child - senior)}
                                    onChange={(e) => {
                                        setAdult(Number(e.target.value));
                                        if (adult === 0 && senior === 0) {
                                            toast.error("At one adult or Senior Citizen is required ")
                                        }
                                    }
                                    } ></input>
                                <span className="mx-2 text-success">{info.adult || adult}</span>
                            </li>



                            <li className='d-flex align-items-center justify-content-center ' ><label className="dropdown-item m-0">Senior Citizen </label>
                                <input className="form-range ms-0" type="range" name="senior" value={info.senior ||senior} min={0}
                                    max={Math.min(5, maxTotal - adult - child)} onChange={(e) => {
                                        setSenior(Number(e.target.value))
                                        if (adult === 0 && senior === 0) {
                                            toast.error("At one adult or Senior Citizen is required ")
                                        }
                                    }

                                    } ></input>
                                <span className="mx-2 text-success " >{info.senior ||senior}</span>
                            </li>
                            <li className='d-flex  align-items-start justify-content-around bg-light text-black'>

                                <label className='pt-4'>Class</label>

                                <div className='d-flex align-items-start justify-content-center flex-column '>
                                    <div className='m-1 form-check form-switch '>
                                        <input className="form-check-input" type="radio" name="class" id="eco"
                                            onChange={(e) => {
                                                setClas(e.target.value)
                                            }}

                                            checked={clas == 'Economy'}
                                            value="Economy" />
                                        <label className="form-check-label" htmlFor="eco">Economy</label>
                                    </div>
                                    <div className='form-check form-switch m-1 '>
                                        <input className="form-check-input" type="radio" name="class" id="preeco"
                                            onChange={(e) => {
                                                setClas(e.target.value)
                                            }}

                                            checked={clas == 'Premium_Economy'}
                                            value="Premium_Economy" />
                                        <label className="form-check-label" htmlFor="preeco">Premium Economy</label>
                                    </div>
                                    <div className='form-check form-switch m-1'>
                                        <input className="form-check-input" type="radio" name="class" id="bus"
                                            onChange={(e) => {
                                                setClas(e.target.value)
                                            }}

                                            checked={clas == 'Business'}
                                            value="Business" />
                                        <label className="form-check-label" htmlFor="bus">Business</label>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>

                    <div >
                        <button className='btn btn-warning' onClick={onSearch}>Search <i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default Search

