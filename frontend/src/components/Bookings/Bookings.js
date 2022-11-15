import React,{ useEffect, useState } from 'react';
import './Bookings.css';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';





function Bookings(props){
    const [tickets, setTicket] = useState([]);
    const {_id} = useParams();
    const navigate = useNavigate();
    var userId = localStorage.getItem("userId");
    
    useEffect(function () {
		async function getTicket() {
			try {
				const response = await axios.get(`http://localhost:4000/tickets/getAllTickets/${userId}`);
				setTicket(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getTicket();
	}, []
    );

    

    return(
        <>
        <div id="backg"></div>
        <div id='cont2'>
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
                                <th>From Location</th>
                                <th>To Location</th>
                                <th>Date of Travel</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {tickets && tickets.map((ticket)=>{
                                    return(
                                        <tr className="table" key={ticket._id} >
                                            <td>{ticket._id}</td>
                                            <td><i className="fa fa-geo-alt-fill text-warning"></i>{ticket.busId.startCity}</td>
                                            <td>{ticket.busId.destination}</td>
                                            <td>{moment(ticket.busId.departDate).utc().format('DD MMMM YYYY - dddd')}</td>
                                            <td id="heading"> <Link to={`/tickets/getTicket/${ticket._id}`} className="btn btn-warning">View Ticket</Link></td>
                                            <td><Link
											to={`/tickets/getTicket/${ticket._id}/delete`}
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
        </>
    )
}

export default Bookings;