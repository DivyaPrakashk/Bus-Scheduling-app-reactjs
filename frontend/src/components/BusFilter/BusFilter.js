

// External css
import './BusFilter.css'


// Importing react an hooks
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// importing axios for api
import axios from "axios";

// importing toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing tootip from bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



// importing icons

import { BiBus } from "react-icons/bi";
import {BiArrowFromLeft} from 'react-icons/bi'
import {FcRating} from  "react-icons/fc";
import { BiLocationPlus } from "react-icons/bi";
import { MdAirlineSeatReclineNormal} from "react-icons/md";
import {FaCity} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";
import {ImPriceTag} from 'react-icons/im'

import {IoTimeOutline} from 'react-icons/io5'


function BusFilter(props) {
  
    const initialState = {
        startCity: "",
        destination: "",
        date: "",

    };


    const Cities = ['Delhi','Bombay','Kolkata','Mumbai'];

    const [crud, setCrud] = useState(initialState);
    const [bruds, setBruds] = useState([]);
    const [va, setVa] = useState("2");
    const navigate = useNavigate();
    let a  =1;
    useEffect(function(){
     console.log("check");
     async function getAllBuses(){
        try{
            const response = await axios.get(`http://localhost:4000/buses/getAllBus`);
            
            console.log(response.data);
            setBruds(response.data);
            // console.log(response.data[0].busNumber);
            
        }catch(error){
            console.log("error",error)
        }
        // console.log(bruds);
    }
    getAllBuses();
    },[va]);

    function handleSubmit(event){
        event.preventDefault();
        

        async function getAllBuses(){
            try{
                const response = await axios.get(`http://localhost:4000/buses/getBusByDateAndCity/${crud.startCity}/${crud.destination}/${crud.date}`);
                setBruds(response.data);
                console.log(response.data);
                // console.log(response.data[0].busNumber);
                            //    Notification on success from backend
                if(response.data.length>0)
                            toast.success(' Bus Available!', {
                              position: toast.POSITION.TOP_RIGHT
                          })
                else
                            toast.error(' Bus Not Available!', {
                              position: toast.POSITION.TOP_RIGHT
                          })
                 
                
            }catch(error){
                console.log("error",error)
                 //   Notification on error from backend
                 toast.error('Error Check Input !', {
                  position: toast.POSITION.TOP_CENTER
              });
            }
            // console.log(bruds);
        }
        getAllBuses();
        console.log(bruds);
        setVa("3")
    }

    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    function handleCancel(){
        navigate("/cruds");
    }
    const [tabsState, setTabsState] = React.useState([
        false,
        false,
        false,
        false,
        false,
      ]);
    
      const handleTabState = (value) => {
        var newState = [...tabsState];
        for (var i = 0; i < newState.length; i++) {
          if (i === value) {
            newState[i] = !newState[i];
          } else {
            newState[i] = false;
          }
        }
        setTabsState(newState);
      };
        // to capitalize letters
    function Capitalize(str){
        return str.toUpperCase();
        }
    



    return (
        <div className='w-100 p-3 '>
           
            
            <div >
            <h1>Search Bus</h1>
            <p>City1<BiArrowFromLeft/>City2</p>
            <p ><strong><BiBus/>fare start from 100</strong></p>
            </div>
            <hr />
            <div className=" w-100 p-3 form-div">
            <form onSubmit={handleSubmit} className="w-100 p-3 shadow-sm ">
                <div className="row">
                <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                <label className="form-label"><FaCity/>Start City</label>
                   
                    <select id="startCity"
                     className='form-control select-class'
                      name="startCity" 
                      value={crud.startCity}
                  
                       onChange={handleChange}>
                     <option value="0">Select Country</option>
                     {
                     
                     Cities.map((city) => {
                     return(
                      <option key={city} value={city}>{city}</option>
                     )
                    })
              

                  }      
               </select>
                </div>
                <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                  <label className="form-label"><FaCity/>Destination City</label>
                    <select id="destination"
                     className='form-control select-class'
                      name="destination" 
                      value={crud.destination}
                  
                       onChange={handleChange}>
                     <option value="0">Select Country</option>
                     {
                     
                     Cities.map((city) => {
                     return(
                      <option key={city} value={city}>{city}</option>
                     )
                    })
              

                  }      
               </select>
                </div>
                <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                <label className="form-label"><BsCalendar2DateFill/>Depart Date</label>
                    <input type="date"
                        name="date"
                        className="form-control"
                        value={crud.date}
                        onChange={handleChange}
                        required />
                </div>
                
               
                <div className="btn-group col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-3 m-3">
                    <input type="submit" value="Submit" className="btn btn-primary" />
    

                </div>
                </div>

  
           </form>

            </div>
            <hr></hr>
            <div >
                
               
                {
                    bruds.map((bus)=>{
                        return(
                         
                            <div className='out'>
                             <div className='busBox'>
                               <div className='busBoxSection1'>
                                   <div  className='busBoxSection11'>
                                          {Capitalize(bus.companyName)}
                                          <br></br>
                                          &nbsp;
                                          {Capitalize(bus.busType)}
                                   </div>
                                   <div className='busBoxSection12'>
                   
                                    <IoTimeOutline/> {bus.departTime}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                     {bus.startCity}<FaCity/>
                                   </div>
                                   <div className='busBoxSection13'>
                                  
                                    <div>Detination:{bus.destination}</div>
                                    &nbsp;
                                   </div>
                                   <div className='busBoxSection14'>
                                   <FcRating/>
                                <div>5</div>
                                   </div>
                                   <div className='busBoxSection15'>
                                   <div><ImPriceTag/>INR</div>
                                <div>{bus.pricePerSeat}</div>
                                 
                               </div>
                               <div className='busBoxSection16'>
                               <div></div>
                             <div>
                            <div><MdAirlineSeatReclineNormal/>{bus.seatsCol*bus.seatsRow }</div>
                             <div>Seats Total</div>
                            </div>
                          <div>
                         
                           </div>
                            </div>

                        
                                   

                               </div>
                               <div className='busBoxSection2'>
                                <div className='busBoxSection21'>
                            
                             
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Live Location</Tooltip>}>
                                          <span className="d-inline-block">
       
                                         <BiLocationPlus
                                         style={{
                                           fontWeight: "50",
                                           fontSize: "20px",
                                           marginRight: "9px",
                                           color: "grey",
                                         }}
                                         onClick={Location}
                                         />
                                           </span>
     
                                   </OverlayTrigger>

                                </div>

                               </div>
                               <div className='busBoxSection3'>
                              
                                  
                             
                                  <a href={`/selectSeats/${bus._id}`} className='link-div'>Select Seat</a>
                                
                                </div>
                               </div>
                             </div>
                           
                         
                   
                          
                        );
                       
                    })
                }
            </div>
              {/* Getting the notification */}
        <ToastContainer/> 
        </div>
    )

}
export default BusFilter;

