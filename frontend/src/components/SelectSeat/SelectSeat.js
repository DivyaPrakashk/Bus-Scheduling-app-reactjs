// External css
import './SelectSeat.css'



// Importing react an hooks
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// importing axios for api
import axios from "axios";

// importing toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing tootip from bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Per Seat template
import { PerSeat } from "./PerSeat";

// icons
import {MdOutlineDonutSmall} from "react-icons/md";
import { MdOutlineAirlineSeatReclineNormal} from 'react-icons/md'
import {GiCarSeat} from "react-icons/gi";

import { MdFiberManualRecord } from "react-icons/md";
import { TbArmchair } from "react-icons/tb";

function Seats(props){

    const initialState = {
        _id : "",
        busNumber: "",
        companyName: "",
        busType: "",
        startCity: "",
        destination: "",
        departTime: "",
        departDate: "",
        pricePerSeat: "",
        seatsRow: "",
        seatsCol: "",
        driver:{
            name: "",
            phoneNumber: "",
        },
        ForEverySeat : []
        

    };
    // Navigation
    const navigate = useNavigate();

      const [crud, setCrud] = useState(initialState);
     
    
    const {id} = useParams();
  
    const [alreadyBookedSeats, setAlreadyBookedSeats] = useState([]);
    useEffect(
        function(){
            async function getCrud(){
                try{
                    const response = await axios.get(`http://localhost:4000/buses/getBusById/${id}`);
                    var time = response.data.departTime;
                    var data = response.data;
                    var seat = [];
                    
                   for(var  i = 0 ; i<response.data.ForEverySeat.length;i++)
                   {  if(response.data.ForEverySeat[i])
                       seat.push(i+1);
                    }
                    setAlreadyBookedSeats(seat);
                    console.log("alreadyInside1",response.data.ForEverySeat);
                  console.log("alreadyInside2",alreadyBookedSeats);
                  console.log(response.data);
                  var myDate = document.querySelector(myDate);
                  var today = new Date();
                  response.data.departDate =  today.toISOString().substr(0, 10);
                 console.log(response.data);
                 
                    setCrud(response.data)
                }catch(error){
                    console.log("error",error);
                }
            }
            getCrud();
        },
        []
    );


     var row =  new Array(crud.seatsRow).fill().map((_, i) => i+1);
     var col =  new Array(crud.seatsCol).fill().map((_, i) => i+1);
     
     const [selectedSeats, setSelectedSeats] = React.useState([]);
     const handleSelectedSeats = (seatNo) => {
        if (selectedSeats.includes(seatNo)) {
          const arr = selectedSeats.filter((item) => item !== seatNo);
          setSelectedSeats(arr);
        } else {
          setSelectedSeats([...selectedSeats, seatNo]);
        }
      };
      function handlePayment(params) {
        localStorage.setItem('seatArray', JSON.stringify(selectedSeats));
        localStorage.setItem('busId',id);
        navigate('/payment')
      }


    return(
        <>
         <div className='mainContainer'>
         <div className='mainContainer1'>
         <div className='mainContainer1Left'>
               <MdOutlineDonutSmall/>
              <GiCarSeat className='driver'/>
         </div>
         <div className='mainContainer1Right'>
          {console.log("alreadyInsidex",alreadyBookedSeats)}
         {
        row.map((r,indexr)=>{
            return <div>
                {col.map((c,indexc)=>{
                    return <>
                       <PerSeat
                  key={(r)*(c)}
                  seatNo={c+(r-1)*col.length}
                  alreadyBookedSeats = {alreadyBookedSeats}
                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                />
                   </>
                })}
                <br/>
            </div>
          
           
        })
      }

         </div>
         </div>
         
      

         {selectedSeats.length === 0 && (
        <div className='mainContainer2'>
          <div className='mainContainer21'>
            <div style={{ fontWeight: "bold" }}>SEAT LEGEND</div>
            <div>
              <div>
                <TbArmchair
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "0px",
                  }}
                />
                &nbsp;&nbsp;
                <span>Available</span>
              </div>
              <div>
                <MdOutlineAirlineSeatReclineNormal
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "0px",
                  }}
                />
                &nbsp;&nbsp;
                <span>Selected</span>
              </div>
              &nbsp;&nbsp;
              <div>
                <MdOutlineAirlineSeatReclineNormal
                  style={{
                    backgroundColor: "black",
                    borderRadius: "4px",
                    border: "0px",
                    color:"white"
                  }}
                />
                &nbsp;&nbsp;
                <span>Already Booked</span>
              </div>
            </div>
          </div>
 
        </div>
      )}
      {selectedSeats.length > 0 && (
        <div className='mainContainer3'>
          <div className='mainContainer31'>
 
          </div>
          <div className='mainContainer32'>
            <div>
              <div>
                <span style={{ fontSize: "16px", color: "#3e3e52" }}>
                  <MdFiberManualRecord style={{ fontSize: "12px" }} />
                  &nbsp;&nbsp; Start City
                </span>
                <br />{" "}
                <span style={{ fontSize: "14px", color: "#7e7e8c" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {crud.startCity}
                </span>
              </div>
            </div>
            <div
              style={{ fontSize: "16px", color: "#4a4a4a", fontWeight: "700" }}
            >
              {/* {busDepartureTime}:00
               */}
               {crud.departTime}
            </div>
          </div>
          <div className='mainContainer33'>
            <div>
              <div>
                <span style={{ fontSize: "16px", color: "#3e3e52" }}>
                  <MdFiberManualRecord style={{ fontSize: "12px" }} />
                  &nbsp;&nbsp;Destination City
                </span>
                <br></br>
                <span style={{ fontSize: "14px", color: "#7e7e8c" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {crud.destination}
                </span>
              </div>
            </div>
            <div
              style={{ fontSize: "16px", color: "#4a4a4a", fontWeight: "700" }}
            >
              Reaching Time may Vary
            </div>
          </div>
          <hr />
          <div className='mainContainer34'>
            <div>Seat No.</div>
            <div>{selectedSeats.join(", ")}</div>
          </div>
          <r />
          <div className='mainContainer35'>Fare Details</div>
          <div className='mainContainer36'>
            <div>
              <span style={{ fontSize: "14px", color: "#3e3e52" }}>Amount</span>
              <br></br>
              <span
                style={{ fontSize: "10px", color: "#838083", marginTop: "5px" }}
              >
                Taxes will be calculated during payment
              </span>
            </div>
            <div>
              
              {selectedSeats.length * crud.pricePerSeat}
            </div>
          </div>
          <button onClick={handlePayment} >Pay for Seats</button>
   
        </div>
      )}

      </div>
    </>
    );
}

export default Seats;