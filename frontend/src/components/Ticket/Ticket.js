//import { render } from '@testing-library/react'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Ticket.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Link , useParams} from 'react-router-dom';
import moment from "moment";


function Ticket(props) {
    //var ticketId = localStorage.getItem("ticketId");
    const [ticket, setTicket] = useState({});
    const [user, setUser] = useState({});
    const [bus, setBus] = useState({});
    const {_id} = useParams();
    //const navigate = useNavigate();

    useEffect(
        function () {
            async function getTicketById() {
                try {
                    const response = await axios.get(`http://localhost:4000/tickets/getTicket/${_id}`);
                    setTicket(response.data);
                    console.log(response.data);
                    const userid = response.data.userId;
                    const busid = response.data.busId;
                    
                    async function getUser(){
                        try{
                            const res = await axios.get(`http://localhost:4000/users/getUser/${userid}`);
                            setUser(res.data)
                        }catch(error){
                            console.log("error",error);
                        }
                    }
                    getUser();
                    async function getBus(){
                        try{
                            const resp = await axios.get(`http://localhost:4000/buses/getBusById/${busid}`);
                            setBus(resp.data)
                        }catch(error){
                            console.log("error",error);
                        }
                    }
                    getBus(); 

                } catch (error) {
                    console.log("error", error);
                }
            }
            getTicketById();
        },
        [props]
    );
    
    function generatePDF() {
        
        const input = document.getElementById("outerbox")
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("p", "pt", "a4")
            pdf.addImage(imgData, "JPEG", 0, 50, 600, 600)
            pdf.save("myTicket.pdf")
        })
    }

    return (
        <div id="outerbox">
            <div className="outerbox">
                <div className="ticket">
                    <header>
                        <div> Travel Buddy </div>
                    </header>
                    <div className="row route my-2 mx-1 py-2">
                        <div className="col-md-4 col-md-6">
                            <h6><i className="bi bi-calendar3"></i> {moment(bus.departDate).utc().format('DD MMMM YYYY')}</h6>
                            <h6>{moment(bus.departDate).utc().format('dddd')}</h6>
                        </div>
                        <div className="col-md-4 col-md-6">
                            <h6><i class="bi bi-truck-front-fill"></i> Bus Name : {bus.companyName}</h6>
                            <h6>Bus Number : {bus.busNumber}</h6>
                        </div>
                    </div>
                    <h6>Ticket Id : {ticket._id}</h6><hr style={{ margin: "0 30px", color: 'white', height: '3px', width: 'fit' }} />
                    <div className="row my-3 mx-1 pt-2">
                        <div className="col-md-4 col-sm-6">
                            <h5>FROM : {bus.startCity}<i class="bi bi-geo-alt"></i></h5>
                            <h6> Pick Up Point</h6>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h5 >{bus.departTime}  </h5>
                            <h6> -------------- </h6>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h5> TO : {bus.destination} <i class="bi bi-geo-alt-fill"></i></h5>
                            <h6> Dropping Point </h6>
                        </div>
                    </div>
                </div>
                <div className="tdetails">
                <div className="row route my-2 mx-1 py-2">
                        <div className="col-md-4 col-md-6">
                            <h6 className="SeatNo"><i class="bi bi-person-circle"></i> Passenger Details : </h6>
                        </div>
                        <div className="col-md-4 col-md-6">
                            <h6>{user.userName}</h6>
                            <h6>{user.email}</h6>
                            <h6>{user.phoneNumber}</h6>
                        </div>
                    </div><hr style={{ margin: "0 30px", color: 'black', height: '3px', width: 'fit' }} />
                    
                    <div className="row route my-2 mx-1 py-2">
                        <div className="col-md-4 col-md-6">
                            <h6 className="SeatNo">Seats Booked : </h6>
                        </div>
                        <div className="col-md-4 col-md-6">
                            <h6>{ticket.ForEverySelectedSeat} </h6>
                        </div>
                    </div><hr style={{ margin: "0 30px", color: 'black', height: '3px', width: 'fit' }} />
                    <div className="row route my-2 mx-1 py-2">
                        <div className="col-md-4 col-md-6">
                            <h6>Total Fare : </h6>
                        </div>
                        <div className="col-md-4 col-md-6">
                            <h6> {'\u20B9'}{bus.pricePerSeat*ticket.ForEverySelectedSeat?.length} </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ color: 'green', paddingTop: '20px', textAlign:'center' }}>
                <h6>* During bus journey, one of the passenger on an e-ticket appears should carry <br/>the original identity card such as:
                    Driving License, Election Card, AdharCard, Passport.</h6>
                <h5 > * WISH YOU HAPPY JOURNEY * </h5>
            </div>
            <div className="button">
                <button className="btn btn-success" onClick={generatePDF}>Download</button>&nbsp;&nbsp;
            </div>

        </div>
    )

}

export default Ticket;