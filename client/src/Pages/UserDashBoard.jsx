import React from 'react'
import SlideBar from '../Component/SlideBar'
import Search from './../Component/Search';

function UserDashBoard() {
    return (
        <div>
            <SlideBar />
            <Search />

            <div className="container my-3">
                <h3 className='text-center'>Upcoming Bookings</h3>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12">
                        <table className="table table-hover ">
                            <thead className="table-dark">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Flight</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#BKG1234</td>
                                    <td>2024-07-24</td>
                                    <td>Air India</td>
                                    <td><span className="badge text-bg-success">CONFIRMED</span></td>
                                    <td>₹8,500</td>
                                </tr>
                                <tr>
                                    <td>#BKG1233</td>
                                    <td>2024-07-24</td>
                                    <td>Indigo</td>
                                    <td><span className="badge text-bg-warning">PENDING</span></td>
                                    <td>₹9,500</td>
                                </tr>
                                <tr>
                                   <td>#BKG1235</td>
                                    <td>2024-07-24</td>
                                    <td>Emirates</td>
                                    <td><span className="badge text-bg-danger">CANCELLED</span></td>
                                    <td>₹7,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col"></div>
                </div>
            </div>

        </div>
    )
}

export default UserDashBoard
