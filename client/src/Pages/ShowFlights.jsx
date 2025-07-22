import React, { useContext } from 'react'
import SlideBar from './../Component/SlideBar';
import Search from '../Component/Search';
import { infoContext } from '../App';


function ShowFlights() {

  const {info} = useContext(infoContext);

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
                  <label >{info.from}</label>
                  
                </div>
                
                <div className='text-center'>
                <label >{info.to}</label>
                  
                </div>

                <div className='text-center'>
                  <label >{info.departure}</label>
                
                </div>

                <div className='text-center'>
                  <label >{info.return !=null ? info.return : ''}</label>
          
                </div>

                <div className='text-center'>
                  <label >{info.passenger} {info.class}</label>
          
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
