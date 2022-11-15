import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Footer.css';
import bus from '../../Images/bus.png'

function Footer(){
    return(
        <>
        
        <div id="footer" >
        <div className="col d-flex justify-content-center">
            <div id="div-1">
                <b>Popular Cities</b>
                <ul id="list-1">
                    <li>Hyderabad</li>
                    <li>Chennai</li>
                    <li>Bengaluru</li>
                    <li>Mumbai</li>
                    <li>Delhi</li>
                    <li>Kolkata</li>
                </ul> 
            </div>
            <div id="div-2">  
                <b>Popular Routes</b>
                <ul id="list-2">
                    <li>Hyderabad to Chennai</li>
                    <li>Chennai to Bengaluru</li>
                    <li>Bengaluru to Mumbai</li>
                    <li>Mumbai to Delhi</li>
                    <li>Delhi to Kolkata</li>
                    <li>Kolkata to Bengaluru</li>
                </ul>  

            </div>
            <div id="div-4">
                <b>Developers</b>
                <ul id="list-4">
                    <li>Divya P</li>
                    <li>Hemanth A R</li>
                    <li>Manasa Joshi</li>
                    <li>Manav Kapoor</li>
                    <li>Piyush Jain</li>
                </ul> 
            </div>
            <div id="div-5">
                <b><img src={bus} id="logo"/> About Us</b>
                <p id= "list-5">In this day and age of technology, <br/>offline modes of bus ticket booking are no more a preference. <br/>Online ticket booking is easy, fast and hassle-free. <br/>
                Travel Buddy ticks off all three with our easy app and website navigation.</p>
                <b>Connect with Us on:</b>
                <p id= "list-5">📧 travelbuddy@gmail.com<br/> ☏ <a href={`tel:+`} id="ph"> 040-123456</a></p>
                
            </div>
        </div>
        </div>
        </>
    )
}

export default Footer;