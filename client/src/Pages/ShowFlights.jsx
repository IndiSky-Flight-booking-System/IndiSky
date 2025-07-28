import React from 'react'
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

function ShowFlights() {
  return (
    <div>
      <SlideBar/>

      <div className="container">

        <div className="row">

          <div className="col"></div>
          <div className="col-12 p-2">
            
            <div className="row text-center">

              <div className="col-12 bg-info p-2  rounded d-flex align-items-center justify-content-around">

                <div className='text-center'>
                  <label >Pune</label>
                  
                </div>
                
                <div className='text-center'>
                <label >Kochi</label>
                  
                </div>

                <div className='text-center'>
                  <label >11/05/2025</label>
                
                </div>

                <div className='text-center'>
                  <label >13/05/2025</label>
          
                </div>

                <div className='text-center'>
                  <label >1 Passenger</label>
          
                </div>

                

                </div>

            </div>



          </div>


          <div className="col"></div>
        </div>

      </div>
      
    </div>
  )
}

export default ShowFlights
