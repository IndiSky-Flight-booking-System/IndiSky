// import React, { useContext } from 'react'
// import SlideBar from '../Component/SlideBar'
// import { useNavigate } from 'react-router-dom';
// import { flightDetailsContext, infoContext } from '../App';
// import { totalPriceContext } from './../App';

// function FlightDetails() {

//     const { info } = useContext(infoContext);
//     const {total} = useContext(totalPriceContext);
//     const { selectedOneway, selectedRoundtrip } = useContext(flightDetailsContext);

//     const navigate = useNavigate();
//     function confirmReview() {
//         navigate('/pass')
//     }

//     return (
//         <div>
//             <SlideBar />
//             <div className="container my-2">
//                 {/* one way  */}
//                 {selectedOneway && (
//                     <div className="row bg-light my-3 rounded p-2 border border-dark"
//                         key={selectedOneway.id}
//                     >
//                         <div>
//                             <h3 >{selectedOneway.from} <i className="fa-solid fa-arrow-right"></i> {selectedOneway.to}</h3>
//                             <p>{info.departure} - class - {selectedOneway.duration}</p>
//                         </div>

//                         <div>
//                             <h6> {selectedOneway.airline} | FlightNo</h6>
//                             <div className='d-flex justify-content-around'>
//                                 <div>
//                                     {/* user departure date added  */}
//                                     <h6>{info.departure}</h6>
//                                     <h4>{selectedOneway.dep}</h4>
//                                     <h5>{selectedOneway.from}</h5>
//                                     {/* <h5>Pune</h5> */}
//                                 </div>

//                                 <div className=' d-flex flex-column align-items-center'>
//                                     <p className='m-0 p-0'>{selectedOneway.duration} </p>
//                                     {/* <p className='m-0 p-0'>2hr </p> */}
//                                     <p className='m-0 p-0'>---------------------------</p>
//                                 </div>

//                                 <div>

//                                     <h6>Return date </h6>
//                                     <h4>{selectedOneway.arr}</h4>
//                                     <h5>{selectedOneway.to}</h5>

//                                     {/* <h4>04:20</h4>
//                                     <h5>Kochi</h5> */}
//                                 </div>

//                                 <div>
//                                     <h6>Baggage</h6>
//                                     <p><i className="fa-solid fa-cart-flatbed-suitcase mx-2"></i>
//                                         Cabin : <b>7 kg per adult </b>
//                                     </p>
//                                     <p><i className="fa-solid fa-suitcase-rolling mx-2"></i>
//                                         Check-in : <b>15 kg per piece, 1 piece per adult </b>
//                                     </p>
//                                 </div>

//                             </div>
//                         </div>


//                     </div>



//                 )}

//                 {/* roundtrip  */}
//                 {selectedRoundtrip && (
//                     <div className="row bg-light my-3 rounded p-2 border border-dark"
//                         key={selectedRoundtrip.id}
//                     >
//                         <div>
//                             <h3 >{selectedRoundtrip.from} <i className="fa-solid fa-arrow-right"></i> {selectedRoundtrip.to}</h3>
//                             <p>{info.departure} - class - {selectedRoundtrip.duration}</p>
//                         </div>

//                         <div>
//                             <h6> {selectedRoundtrip.airline} | FlightNo</h6>
//                             <div className='d-flex justify-content-around'>
//                                 <div>
//                                     {/* user departure date added  */}
//                                     <h6>{info.departure}</h6>
//                                     <h4>{selectedRoundtrip.dep}</h4>
//                                     <h5>{selectedRoundtrip.from}</h5>
//                                     {/* <h5>Pune</h5> */}
//                                 </div>

//                                 <div className=' d-flex flex-column align-items-center'>
//                                     <p className='m-0 p-0'>{selectedOneway.duration} </p>
//                                     {/* <p className='m-0 p-0'>2hr </p> */}
//                                     <p className='m-0 p-0'>---------------------------</p>
//                                 </div>

//                                 <div>

//                                     <h6>{info.return} </h6>
//                                     <h4>{selectedRoundtrip.arr}</h4>
//                                     <h5>{selectedRoundtrip.to}</h5>

//                                     {/* <h4>04:20</h4>
//                                     <h5>Kochi</h5> */}
//                                 </div>

//                                 <div>
//                                     <h6>Baggage</h6>
//                                     <p><i className="fa-solid fa-cart-flatbed-suitcase mx-2"></i>
//                                         Cabin : <b>7 kg per adult </b>
//                                     </p>
//                                     <p><i className="fa-solid fa-suitcase-rolling mx-2"></i>
//                                         Check-in : <b>15 kg per piece, 1 piece per adult </b>
//                                     </p>
//                                 </div>

//                             </div>
//                         </div>


//                     </div>



//                 )}



//                 {/* footer  */}
//                 <div className='fixed-bottom'>
//                     <div className='container '>

//                         <div className="row bg-light text-center rounded  w-75 mx-auto">

//                             <div className='col d-flex justify-content-around   '>
//                                 {/* <h3 className='py-3'>₹{totalPrice}</h3> */}
//                                 <h3 className='pt-4'>₹ {total}</h3>
//                                 <div className='my-4'>
//                                     <button className='btn btn-success '
//                                         onClick={confirmReview}
//                                     >Next</button>
//                                 </div>

//                             </div>


//                         </div>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default FlightDetails

import React, { useContext } from 'react';
import SlideBar from '../Component/SlideBar';
import { useNavigate } from 'react-router-dom';
import { flightDetailsContext, infoContext, totalPriceContext } from '../App';
import '../css/FlightDetails.css';
import Sidebar from '../Component/Sidebar';

function FlightDetails() {
    const { info } = useContext(infoContext);
    const { total } = useContext(totalPriceContext);
    const { selectedOneway, selectedRoundtrip } = useContext(flightDetailsContext);
    const navigate = useNavigate();

    const confirmReview = () => {
        navigate('/pass');
    };

    const FlightCard = ({ flight, isRoundTrip }) => (
        <div className="flight-card shadow-lg rounded">
            <div className="flight-header">
                <h4>{flight.from} <i className="fa-solid fa-arrow-right"></i> {flight.to}</h4>
                <span className="flight-sub">
                    {isRoundTrip ? info.return : info.departure} | {flight.duration}
                </span>
            </div>
            <div className="flight-body">
                <div className="time-box">
                    <span className="date">{isRoundTrip ? info.return : info.departure}</span>
                    <h5 className="time">{flight.dep}</h5>
                    <span className="location">{flight.from}</span>
                </div>

                <div className="divider">
                    <span>{flight.duration}</span>
                    <hr />
                </div>

                <div className="time-box">
                    <span className="date">{isRoundTrip ? info.return : "Arrival"}</span>
                    <h5 className="time">{flight.arr}</h5>
                    <span className="location">{flight.to}</span>
                </div>

                <div className="baggage-info">
                    <h6>Baggage</h6>
                    <p><i className="fa-solid fa-cart-flatbed-suitcase"></i> Cabin: <strong>7 kg/adult</strong></p>
                    <p><i className="fa-solid fa-suitcase-rolling"></i> Check-in: <strong>15 kg/adult</strong></p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <SlideBar />
            <Sidebar />
            <div className="container flight-details-container">
                {selectedOneway && <FlightCard flight={selectedOneway} isRoundTrip={false} />}
                {selectedRoundtrip && <FlightCard flight={selectedRoundtrip} isRoundTrip={true} />}
            </div>

            <div className="footer-box shadow-lg">
                <div className="price-box">
                    <h4>Total Price:</h4>
                    <h3>₹ {total}</h3>
                </div>
                <button className="next-btn" onClick={confirmReview}>Next</button>
            </div>
        </div>
    );
}

export default FlightDetails;
