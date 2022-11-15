import React,{ useEffect, useState } from 'react';
import './travelHistory.css';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

function TravelHistory(props){
    const [cruds, setCrud] = useState([]);
    const {_id} = useParams();
    useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:4000/tickets/getTicketsByUser/${_id}`);
				setCrud(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []
    );

    return(
        <>
        <div id="backg">
        <div className='col d-flex justify-content-center'>
        <div id='cont2' className='col-md-8'>
            <h3 id='heading'>My Bookings</h3>
            <div className='container' id='table'>
                <div className="table-responsive">
                    <table className="table table-striped
                    table-hover	
                    table-borderless
                    align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Ticket Id</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date of Travel</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {cruds && cruds.map((crud)=>{
                                    return(
                                        <tr className="table" key={crud._id} >
                                            <td>{crud._id}</td>
                                            <td>{crud.busId.startCity}</td>
                                            <td>{crud.busId.destination}</td>
                                            <td>{moment(crud.busId.departDate).utc().format('DD MMMM YYYY - dddd')}</td>
                                            <td id="heading"> <Link to={`/tickets/getTicket/${crud._id}`} className="btn btn-warning">view ticket</Link></td>
                                            <td><Link
											to={`/tickets/getTicket/${crud._id}/delete`}
											className="btn btn-danger">
											Cancel Ticket
										</Link></td>
                                        </tr>
                                    );
                                })}
                                
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                    </table>
                </div>
                
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default TravelHistory;