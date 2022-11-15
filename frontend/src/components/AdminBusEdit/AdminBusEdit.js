
// External css
import './AdminBus.css'



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



// importing icons
import { MdDriveFileRenameOutline,MdFormatListNumberedRtl,MdAirlineSeatReclineNormal,MdViewColumn} from "react-icons/md";
import {FaCity} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";
import {ImPriceTag} from 'react-icons/im'
import {CgRowFirst} from 'react-icons/cg'
import {GiCarSeat} from 'react-icons/gi'
import {IoTimeOutline} from 'react-icons/io5'
import { BiBus } from "react-icons/bi";
import {BiArrowFromLeft} from 'react-icons/bi'


function EditBus(props) {
  
    const initialState = {

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
        }
        

    };
    const [crud, setCrud] = useState(initialState);
    const {id} = useParams();
    useEffect(
        function(){
            async function getCrud(){
                try{
                    const response = await axios.get(`http://localhost:4000/buses/getBusById/${id}`);
                    var time = response.data.departTime;
                  
                    
              
                  console.log(response.data.departDate);
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
        [props]
    );


    const Cities = ['Delhi','Bombay','Kolkata','Mumbai'];
    const Types = ['Sleeper','Non-Sleeper'];

   
    const [bruds, setBruds] = useState([]);
    const [va, setVa] = useState("2");
    const navigate = useNavigate();
    
    let a  =1;


    function handleSubmit(event){
        
  
        event.preventDefault();
        async function postCrud(){
            try{
                const response = await axios.put(`http://localhost:4000/buses/editBusAll/${id}`,crud);
                
                console.log(response);
                setVa("1");
                toast.success('Edited Successfully', {
                    position: toast.POSITION.TOP_RIGHT
                })
                
               

            }catch(error){
                alert("Email and/or password already exists.");
                console.log(error);
                toast.success('error', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
        postCrud();
        
        
        // setVa("3")
        console.log(crud);
      
    }

    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    function handleCancel(){
        navigate(`/admin/addbus`);
    }

   console.log(crud.driver);


    return (
        <div className='w-100 p-3 '>
           
            
            <div className='filtertop'>
            <h1>Edit Bus</h1>
            <p>{crud.startCity}<BiArrowFromLeft/>{crud.destination}</p>
            <p ><strong><BiBus/>fare start from 100</strong></p>
            </div>
            <hr />
            <div>
            
            <form className="w-100 p-3 shadow-sm  " onSubmit={handleSubmit}>
            <div class="row">
                 <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><MdDriveFileRenameOutline/>CompanyName</label>
                    <input type="text"
                        name="companyName"
                        className="form-control"
                        value={crud.companyName}
                        onChange={handleChange}
                        pattern = "[0-9a-zA-Z]{3,}"
                        required />
                         <small>Format : Atleast 3 characters</small>
                </div>
                <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><MdFormatListNumberedRtl/>BusNumber</label>
                    <input type="text"
                        name="busNumber"
                        className="form-control"
                        value={crud.busNumber}
                        onChange={handleChange}
                        pattern = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$"
                        required />
                        <small>Format : XX 00 XX 0000</small>
                </div>
                <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><FaCity/>Start City</label>
                   
                    <select id="startCity"
                     className='form-control select-class'
                      name="startCity" 
                      value={crud.startCity}
                  
                       onChange={handleChange}
                       required>
                     <option value="0">Select City</option>
                     {
                     
                     Cities.map((city) => {
                     return(
                      <option key={city} value={city}>{city}</option>
                     )
                    })
              

                  }      
               </select>
                </div>
            </div>
            <div class="row">
                <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><FaCity/>Destination City</label>
                    <select id="destination"
                     className='form-control select-class'
                      name="destination" 
                      value={crud.destination}
                  
                       onChange={handleChange}
                       required>
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

                <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><MdAirlineSeatReclineNormal/>BusType</label>
                    <select id="busType"
                     className='form-control select-class'
                      name="busType" 
                      value={crud.busType}
                  
                       onChange={handleChange}
                       required>
                     <option value="0">Select BusType</option>
                     {
                     
                     Types.map((city) => {
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
                        name="departDate"
                        className="form-control"
                        value={crud.departDate}
                        onChange={handleChange}
                        required />
                </div>
            </div>
            <div class="row">
               
                <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><ImPriceTag/>PricePerSeat</label>
                    <input type="number"
                        name="pricePerSeat"
                        className="form-control"
                        value={crud.pricePerSeat}
                        onChange={handleChange}
                        pattern = "[1-9][0-9]{2,3}"
                        min="100"
                        max= "9999"
                        required />
                        <small>Format : 100-9999</small>
                </div>
                <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><CgRowFirst/>seatsRow</label>
                    <input type="number"
                        name="seatsRow"
                        className="form-control"
                        value={crud.seatsRow}
                        onChange={handleChange}
                        min = "1"
                        max= "10"
                        required />
                        <small>Format : 1-10</small>
                </div>
                <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><MdViewColumn/>seatsCol</label>
                    <input type="number"
                        name="seatsCol"
                        className="form-control"
                        value={crud.seatsCol}
                        onChange={handleChange}
                        pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                        min = "1"
                        max= "10"
                        required />
                        <small>Format : 1-10</small>
                </div>
               
            </div>

            <div class="row">
               
               <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><GiCarSeat/>Driver Name</label>
                   <input type="text"
                       name="driver.name"
                       className="form-control"
                       value={crud.driver.name}
                       onChange={handleChange}
                       pattern = "[0-9a-zA-Z]{3,}"
                       required />
                       <small>Format : Atleast 3 characters</small>
               </div>
               <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><GiCarSeat/>Driver Number</label>
                   <input type="number"
                       name="driver.phoneNumber"
                       className="form-control"
                       value={crud.driver.phoneNumber}
                       onChange={handleChange}
                       min="6000000000"
                       max = "9999999999"
                       required />
                       <small>Format : [6-9]XXXXXXXXX</small>
               </div>
               <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><IoTimeOutline/>DepartTime</label>
                    <input type="time"
                        name="departTime"
                        className="form-control"
                        value={crud.departTime}
                        onChange={handleChange}
                        required />
                </div>
               {/* <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label">seatsCol</label>
                   <input type="number"
                       name="seatsCol"
                       className="form-control"
                       value={crud.seatsCol}
                       onChange={handleChange}
                       required />
               </div> */}
              
           </div>
               
                <div className="btn-group  m-3 btn-main">
                    <input type="submit" value="Submit" className="btn btn-primary btn-work" />
                    <button onClick={handleCancel}>Cancel</button>

                </div>

  
           </form>

            </div>
            


            
            <ToastContainer />
        </div>
    )

}
export default EditBus;

