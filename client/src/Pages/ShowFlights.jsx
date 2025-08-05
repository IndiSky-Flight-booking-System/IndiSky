import SlideBar from '../Component/SlideBar';
import React, { useContext, useEffect, useState } from 'react'
import Search from '../Component/Search';
import { infoContext, flightDetailsContext, totalPriceContext, searchedFlightsContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { GetFlightSearch } from '../Service/flightSearch';


function ShowFlights() {

  const { info } = useContext(infoContext);
  const { total, setTotal } = useContext(totalPriceContext)
  const { selectedOneway, setSelectedOneway, selectedRoundtrip, setSelectedRoundtrip } = useContext(flightDetailsContext)
  const { searched } = useContext(searchedFlightsContext);

  const [oneWayFlights, setOneWayFlights] = useState([]); //displaying fligths according to search
  const [roundTripFlights, setRoundTripFlights] = useState([]);

  function formatDuration(dep, arr) {
    const depTime = new Date(dep);
    const arrTime = new Date(arr);
    const diffMs = arrTime - depTime;

    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  async function onGetFlightSearch() {
    const { trip, from, to, departure, arrival, Tclass, passenger } = info

    const result = await GetFlightSearch(trip, from, to, departure, arrival, Tclass, passenger)
    // console.log(result);

    if (result) {

      const onewayformat = (result.onewayFlights || []).map(f => ({
        id: f.flightId,
        airline: f.airline.airlineName,
        from: f.sourceAirport.iataCode, 
        to: f.destinationAirport.iataCode,
        sourceName : f.sourceAirport.city,
        destName: f.destinationAirport.city,
        dep: f.departureTime.split("T")[1].substring(0,5),
        arr: f.arrivalTime.split("T")[1].substring(0,5),
        depDate:f.departureTime.split("T")[0],
        arrDate:f.arrivalTime.split("T")[0],
        flightNo : f.flightNumber,
        duration: formatDuration(f.departureTime, f.arrivalTime),
        price: f.basePrice
      }));

      const roudtripformat = (result.roundTripFlights || []).map(f => ({
        id: f.flightId,
        airline: f.airline.airlineName,
        from: f.sourceAirport.iataCode,
        fromName : f.sourceAirport.city,
        toName: f.destinationAirport.city,
        to: f.destinationAirport.iataCode,
        dep: f.departureTime.split("T")[1].substring(0,5),
        arr: f.arrivalTime.split("T")[1].substring(0,5),
        depDate:f.departureTime.split("T")[0],
        arrDate:f.arrivalTime.split("T")[0],
        flightNo : f.flightNumber,
        duration: formatDuration(f.departureTime, f.arrivalTime),
        price: f.basePrice
      }));

      setOneWayFlights(onewayformat);
      setRoundTripFlights(roudtripformat);
    }
  }

  useEffect(() => {
    onGetFlightSearch();
  }, [])

  useEffect(() => {
    if (searched) {
      onGetFlightSearch();
    }

  }, [searched, info]);



  useEffect(() => {
    if (info.trip === 'OneWay') {
      setSelectedRoundtrip(null);
    }

    const cal = (selectedOneway ? selectedOneway.price : 0) + (selectedRoundtrip != null ? selectedRoundtrip.price : 0);

    setTotal(cal)

  }, [selectedOneway, selectedRoundtrip, info.trip])

  const navigate = useNavigate();
  function bookFlights() {
    navigate('/review')
  }

  return (
    <div>
      <SlideBar />
      <Search />
      <div className="container">
        <div className="row">

          <div className="col"></div>
          <div className="col-12 p-2">

            <div className="row text-center">

              {info.from && info.to && info.Tclass && (
                <div className="col-12 bg-dark text-light p-2  rounded d-flex align-items-center justify-content-around">

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
                  <label >{info.arrival != null ? info.arrival : ''}</label>

                </div>

                <div className='text-center'>
                  <label > {info.passenger} {info.Tclass == 'Premium_Economy' ? 'Premium' : info.Tclass}</label>
                </div>
              </div>
              )}
              

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

              {oneWayFlights.map(flight => (
                <div className={`col-11 rounded m-2 p-2 ${selectedOneway?.id === flight.id ? 'bg-success text-white' : 'bg-info'}`}
                  onClick={() => { setSelectedOneway(flight) }}
                  style={{ cursor: 'pointer' }}
                  key={flight.id}  >
                  <p className='mx-3'>{flight.airline}</p>
                  <div className='d-flex justify-content-around'>
                    <div>
                      {/* removing spaces and sperating time and date */}
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

              {roundTripFlights.map(flight => (
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
              {oneWayFlights.map(flight => (
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

              <div className='col-2 d-flex justify-content-around align-item-center   '>
                <h3 className='py-3'> Total ₹{total}</h3>
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
        <div className='fixed-bottom' style={{
          bottom:0,
          position:'fixed'
        }}>
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
                <h3 className='py-3'> Total  ₹{total}</h3>
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

      {oneWayFlights.length === 0 && info.trip === 'OneWay' && (
        <h3 className='text-center'>No one-way flights found for this route </h3>
      )}

      {roundTripFlights.length === 0 && oneWayFlights.length===0 && info.trip === 'RoundTrip'  && (
        <h3 className='text-center'>No Oneway and Round trip flights found for this route </h3>
      )}

      {roundTripFlights.length === 0 && info.trip === 'RoundTrip' && oneWayFlights.length>0 && (
        <h3 className='text-center mt-5'>No Round trip flights found for this route </h3>
      )}



    </div>
  )
}

export default ShowFlights
