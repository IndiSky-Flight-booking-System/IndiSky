import React, { useContext, useEffect, useState } from 'react'
import SlideBar from './../Component/SlideBar';
import Search from '../Component/Search';
import { infoContext , flightDetailsContext, totalPriceContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShowFlights() {

  const { info } = useContext(infoContext);
   const {total, setTotal} = useContext(totalPriceContext)
  const {selectedOneway, setSelectedOneway,selectedRoundtrip, setSelectedRoundtrip} = useContext(flightDetailsContext)
  

  const oneWayFlights = [
    { id: 1, airline: 'IndiGo', from: 'PUNE', to: 'Kochi', dep: '04:30', arr: '06:30', duration: '2hr', price: 4000 },
    { id: 2, airline: 'Air India', from: 'PUNE', to: 'Kochi', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 3, airline: 'Emirates', from: 'London', to: 'MUMBAI', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 4, airline: 'Air India', from: 'Delhi', to: 'MUMBAI', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },

  ];

  const roundTripFlights = [
    { id: 1, airline: 'Air India Express', from: 'Kochi', to: 'PUNE', dep: '14:00', arr: '16:00', duration: '2hr', price: 4100 },
    { id: 2, airline: 'IndiGo', from: 'Kochi', to: 'PUNE', dep: '18:00', arr: '20:00', duration: '2hr', price: 4300 },
    { id: 3, airline: 'Emirates', from: 'MUMBAI', to: 'London', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
    { id: 4, airline: 'Air India', from: 'MUMBAI', to: 'Delhi', dep: '10:00', arr: '12:00', duration: '2hr', price: 4200 },
  ];

  

  useEffect( ()=>{
    if(info.trip === 'OneWay'){
      setSelectedRoundtrip(null);
    }

    const cal = (selectedOneway ? selectedOneway.price : 0) +  (selectedRoundtrip !=null ? selectedRoundtrip.price : 0) ;

    setTotal(cal)

  },[selectedOneway,selectedRoundtrip,info.trip])

  const navigate = useNavigate();
  function bookFlights() {
    navigate('/review')
  }

  const filteredOneWay = oneWayFlights.filter(flight => 
    flight.from.toLowerCase() === info.from.toLowerCase() && flight.to.toLowerCase() === info.to.toLowerCase()
  )

  const filteredRoundTripWay = roundTripFlights.filter(flight => 
    flight.from.toLowerCase() === info.to.toLowerCase() && flight.to.toLowerCase() === info.from.toLowerCase()
    )

  return (
    <div>
      <SlideBar />
      <Search />
      <div className="container">
        <div className="row">

          <div className="col"></div>
          <div className="col-12 p-2">

            <div className="row text-center">

              <div className="col-12 bg-info p-2  rounded d-flex align-items-center justify-content-around">

                <div className='text-center'>
                  <label >{info.from}</label>
                </div>

                <div className='text-center'>
                  <label >{info.to}</label>

                </div>

                <div className='text-center'>
                  <label >{info.departure}</label>

                </div>

                <div className='text-center'>
                  <label >{info.return != null ? info.return : ''}</label>

                </div>

                <div className='text-center'>
                  <label > {info.passenger} {info.class =='Premium_Economy'? 'Premium' :info.class }</label>
                </div>
              </div>
            </div>
          </div>


          <div className="col"></div>
        </div>

        <br />


        {(info.trip == 'RoundTrip') ? (
          <div className="row text-center  rounded m-0">
            <div className="col bg-light rounded">
              <h3>One Way</h3>
            </div>
            <div className="col bg-dark rounded text-white">
              <h3>Round Trip</h3>
            </div>
          </div>
        ) : (
          <div className="row text-center  rounded m-0">
            <div className="col bg-light rounded">
              <h3>One Way</h3>
            </div>
          </div>
        )}
        <br />
      </div>

      {/* add else */}
      {info.trip == 'RoundTrip' && (
        <div className="container">
          <div className="row  row-col-2">

            {/* oneway cards  */}
            <div className='col-6  d-flex flex-column align-items-center' >
              {/* flight card  */}

              {filteredOneWay.map(flight => (
                <div className={`col-11 rounded m-2 p-2 ${selectedOneway?.id === flight.id ? 'bg-success text-white' : 'bg-info'}`}
                  onClick={() => { setSelectedOneway(flight) }}
                  style={{ cursor: 'pointer' }}
                  key={flight.id}  >
                  <p className='mx-3'>{flight.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h4>{flight.dep}</h4>
                      <h5>{flight.from}</h5>
                    </div>

                    <div className=' d-flex flex-column align-items-center'>
                      <p className='m-0 p-0'>{flight.duration} </p>
                      <p className='m-0 p-0'>---------------------------</p>
                    </div>

                    <div>
                      <h4>{flight.arr}</h4>
                      <h5>{flight.to}</h5>
                    </div>
                    <div>
                      <h2>₹{flight.price}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* roundtrip cards  */}
            <div className='col-6  d-flex flex-column align-items-center'>
              {/* flight card  */}

              {filteredRoundTripWay.map(flight => (
                <div className={`col-11 rounded m-2 p-2 ${selectedRoundtrip?.id === flight.id ? 'bg-success text-white' : 'bg-info'}`}
                  onClick={() => { setSelectedRoundtrip(flight) }}
                  style={{ cursor: 'pointer' }}
                  key={flight.id}>
                  <p className='mx-3'>{flight.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h4>{flight.dep}</h4>
                      <h5>{flight.from}</h5>
                    </div>

                    <div className=' d-flex flex-column align-items-center'>
                      <p className='m-0 p-0'>{flight.duration} </p>
                      <p className='m-0 p-0'>---------------------------</p>
                    </div>

                    <div>
                      <h4>{flight.arr}</h4>
                      <h5>{flight.to}</h5>
                    </div>
                    <div>
                      <h2>₹{flight.price}</h2>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
      )}

      {info.trip === 'OneWay' && (
        <div className="container">
          <div className="row ">

            {/* oneway cards  */}
            <div className='col  d-flex flex-column align-items-center'>
              {/* flight card  */}
              {filteredOneWay.map(flight => (
                <div className={`col-11 rounded m-2 p-2 ${selectedOneway?.id === flight.id ? 'bg-success text-white' : 'bg-info'}`}
                  onClick={() => { setSelectedOneway(flight) }}
                  style={{ cursor: 'pointer' }}
                  key={flight.id}>
                  <p className='mx-3'>{flight.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h4>{flight.dep}</h4>
                      <h5>{flight.from}</h5>
                    </div>

                    <div className=' d-flex flex-column align-items-center'>
                      <p className='m-0 p-0'>{flight.duration} </p>
                      <p className='m-0 p-0'>---------------------------</p>
                    </div>

                    <div>
                      <h4>{flight.arr}</h4>
                      <h5>{flight.to}</h5>
                    </div>
                    <div>
                      <h2>₹{flight.price}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      )}

      {/* bottom */}
      {info.trip === 'RoundTrip' && selectedOneway && selectedRoundtrip && (

        <div className='fixed-bottom'>
          <div className='container '>

            <div className="row bg-light text-center rounded ">

              <div className="col-5  border border-right border-dark rounded">
                <div className='col-11  rounded m-2 d-flex flex-column  '>
                  <p className='mx-3'>{selectedOneway.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h5>{selectedOneway.from}</h5>
                    </div>
                    <div>
                      <h5>{selectedOneway.to}</h5>
                    </div>
                    <div>
                      <h2>₹{selectedOneway.price}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-5  border border-right border-dark  rounded">
                <div className='col-11  rounded m-2 d-flex flex-column  '>
                  <p className='mx-3'>{selectedRoundtrip.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h5>{selectedRoundtrip.from}</h5>
                    </div>
                    <div>

                      <h5>{selectedRoundtrip.to}</h5>
                    </div>
                    <div>
                      <h2>₹{selectedRoundtrip.price}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2 d-flex justify-content-around align-item-center  '>
                <h3 className='py-3'>₹{total}</h3>
                <div className='my-4'>
                  <button className='btn btn-success '
                  onClick={bookFlights}
                  >Book</button>
                </div>

              </div>


            </div>
          </div>
        </div>

      )}

      {info.trip === 'OneWay' && selectedOneway && (
        <div className='fixed-bottom'>
          <div className='container '>

            <div className="row bg-light text-center rounded ">

              <div className="col  border border-right border-dark rounded">
                <div className='col-11  rounded m-2 d-flex flex-column  '>
                  <p className='mx-3'>{selectedOneway.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      <h5>{selectedOneway.from}</h5>
                    </div>
                    <div>
                      <h5>{selectedOneway.to}</h5>
                    </div>
                    <div>
                      <h2>₹{selectedOneway.price}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col d-flex justify-content-around align-item-center  '>
                <h3 className='py-3'>₹{total}</h3>
                <div className='my-4'>
                  <button className='btn btn-success '
                    onClick={bookFlights}
                  >Book</button>
                </div>

              </div>


            </div>
          </div>
        </div>
      )}

      {filteredOneWay.length === 0 && info.trip === 'OneWay' &&(
        <h3 className='text-center'>No one-way flights found for this route.</h3>
      )}

      {filteredRoundTripWay.length === 0 && info.trip === 'RoundTrip' && (
        <h3 className='text-center'>No Round trip flights found for this route.</h3>
      )}

    </div>
  )
}

export default ShowFlights
