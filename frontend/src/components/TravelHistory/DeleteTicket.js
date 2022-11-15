import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function DeleteTicket(props) {
	const [ticket, setTicket] = useState({});
	const [bus, setBus] = useState({});
	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function deleteTicketById() {
				try {
					const response = await axios.get(`http://localhost:4000/tickets/getTicket/${_id}`);
					setTicket(response.data);
					const userid = response.data.userId;
					const busid = response.data.busId;
					async function getBus() {
						try {
							const resp = await axios.get(`http://localhost:4000/buses/getBusById/${busid}`);
							setBus(resp.data)
						} catch (error) {
							console.log("error", error);
						}
					}
					getBus();
				} catch (error) {
					console.log("error", error);
				}
			}
			deleteTicketById();
		},
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`http://localhost:4000/tickets/deleteTicket/${_id}`);
			alert("Your Ticket Cancelled Successfully!!! \n Thank You");
			navigate(`/users/travelhistory/${localStorage.getItem("userId")}`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{bus.companyName}</h2>
			<p><b>From</b>: {bus.startCity}</p>
			<p><b>To</b>: {bus.destination}</p>
			<p><b>Date</b>: {moment(bus.departDate).utc().format('DD MMMM YYYY')}</p>
			<p><b>Ticket ID</b>: {ticket._id}</p>
			<div className="btn-group">
				<button className="btn btn-danger"
					onClick={() => {
						const confirmBox = window.confirm(
							"Do you really want to cancel the Ticket?"
						)
						if (confirmBox === true) {
							handleDelete();
						}
					}}>Cancel Ticket
				</button>&nbsp;
				<Link to={`/users/travelhistory/${localStorage.getItem("userId")}`} className="btn btn-success">Back</Link>
			</div>
		</div>
	);
}

export default DeleteTicket;