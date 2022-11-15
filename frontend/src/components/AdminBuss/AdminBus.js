
// External css
import './AdminBus.css'



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
import {FcRating} from  "react-icons/fc";
import {CiDiscount1} from "react-icons/ci";
import {GiCharging,GiWifiRouter,GiWaterBottle} from "react-icons/gi";
import { BiLocationPlus } from "react-icons/bi";
import { MdDriveFileRenameOutline,MdFormatListNumberedRtl,MdAirlineSeatReclineNormal,MdViewColumn} from "react-icons/md";
import {FaCity} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";
import {ImPriceTag} from 'react-icons/im'
import {CgRowFirst} from 'react-icons/cg'
import {GiCarSeat} from 'react-icons/gi'
import {IoTimeOutline} from 'react-icons/io5'



// using functional component 
function AddBus(props) {
    
    // Navigation
    const navigate = useNavigate();

    // array of constants used in select
    const Cities = ['Delhi','Bombay','Kolkata','Mumbai'];
    const Types = ['Sleeper','seater','Ac','Non-Ac'];

    // initialisation of bus state
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
        driverName: "",
        driverNumber: ""

    };

    // state variables
    const [busform, setBusform] = useState(initialState);

    // for bud data
    const [busData, setBusdata] = useState([]);

    // for upating buss list
    const [va, setVa] = useState("2");



    // function to check the bus state variable and change it value inputting from form 
    function handleChange(event){
        setBusform({...busform,[event.target.name]:event.target.value})
    }



    // function for handling form variable and submitting them to backend
    function handleSubmit(event){

        // for preventing reload of page 
        event.preventDefault();
        console.log(busform);
        //  posting data to backend 
        async function postBusForm(){
            try{
            // after this line, our function will wait for the `axioss()` call to be settled
            // the `aios()` call will either return a Response or throw an error
                const response = await axios.post("http://localhost:4000/buses/addBus",busform);
                // console.log(response);
             
            //    Notification on success from backend
                toast.success(' Bus state created Successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                })
            
            // for updating bus list 
            setVa("1");

 
            }catch(error){
                //   Notification on error from backend
                toast.error('Error Check Input !', {
                    position: toast.POSITION.TOP_CENTER
                });
                // 
                console.log(error);
            }
        }
        // consuming the function
        postBusForm();
        
    }

    // Getting bus Data
    useEffect(function(){
        
        // 
        async function getAllBuses(){
           try{

               const response = await axios.get(`http://localhost:4000/buses/getAllBus`);
               setBusdata(response.data);
           
           }catch(error){
               console.log("error",error)
   
           }
           // console.log(bruds);
       }
       getAllBuses();
       },[va]);


    // navigating hanle
  
    // to capitalize letters
    function Capitalize(str){
        return str.toUpperCase();
        }
    
 

    
   return (
    //  100% of width 
      <div className='w-100 p-3 '>
        {/* form for bus state */}
        <div className='form-div'>
           {/*  */}
            <form className="w-100 p-3 shadow-sm  " onSubmit={handleSubmit}>
               {/* first row */}
                <div className='row mb-1'>
                    {/* Dynamic spacing used for responsive form */}
                    <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                        <label className="form-label"><MdDriveFileRenameOutline/>CompanyName</label>
                        <input type="text"
                           name="companyName"
                           className="form-control"
                           value={busform.companyName}
                           onChange={handleChange}
                           pattern = "[0-9a-zA-Z]{3,}"
                           placeholder='Enter Bus CompanyName'
                            required 
                        />
                        <small>Format : Atleast 3 characters</small>
                
                   </div>
                   <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                       <label className="form-label"><MdFormatListNumberedRtl/>BusNumber</label>
                       <input type="text"
                           name="busNumber"
                           className="form-control"
                           value={busform.busNumber}
                           onChange={handleChange}
                           pattern = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$"
                           placeholder='Enter Bus Registration Number'
                           required />
                        <small>Format : XX 00 XX 0000</small>
                   </div>
                   <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                      <label className="form-label"><FaCity/>Start City</label>
                   
                      <select id="startCity"
                         className='form-control select-class'
                         name="startCity" 
                         value={busform.startCity}
                  
                         onChange={handleChange}
                         required
                      >
                     <option >Select City</option>
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
                <div class="row mb-1">
                   <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><FaCity/>Destination City</label>
                    <select id="destination"
                       className='form-control select-class'
                       name="destination" 
                       value={busform.destination}
                       onChange={handleChange}
                       required
                    >
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
                      value={busform.busType}
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
                        value={busform.departDate}
                        onChange={handleChange}
                        required
                     />
                    </div>
                </div>
                <div class="row mb-1">
               
                  <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><ImPriceTag/>PricePerSeat</label>
                   <input type="number"
                       name="pricePerSeat"
                       className="form-control"
                       value={busform.pricePerSeat}
                       onChange={handleChange}
                       pattern = "[1-9][0-9]{2,3}"
                       min="100"
                       max= "9999"
                       placeholder='Enter PricePerSeat'
                       required />
                       <small>Format : 100-9999</small>
                  </div>
                  <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><CgRowFirst/>SeatsRow</label>
                   <input type="number"
                       name="seatsRow"
                       className="form-control"
                       value={busform.seatsRow}
                       onChange={handleChange}
                       min = "1"
                       max= "10"
                       placeholder='Enter Number of SeatRows'
                       required />
                    <small>Format : 1-10</small>
                  </div>
                  <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><MdViewColumn/>Seat Columns</label>
                   <input type="number"
                       name="seatsCol"
                       className="form-control"
                       value={busform.seatsCol}
                       onChange={handleChange}
                       pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                       min = "1"
                       max= "10"
                       placeholder='Enter Number of SeatColumns'
                       required />
                       <small>Format : 1-10</small>
                  </div>
              
                </div>

                <div class="row mb-1">
               
                   <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><GiCarSeat/>Driver Name</label>
                   <input type="text"
                       name="driverName"
                       className="form-control"
                       value={busform.driverName}
                       onChange={handleChange}
                       pattern = "[0-9a-zA-Z]{3,}"
                       placeholder='Enter Drivers Name'
                       required />
                    <small>Format : Atleast 3 characters</small>
                   </div>
                   <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12 m-1">
                   <label className="form-label"><GiCarSeat/>Driver Number</label>
                   <input type="number"
                       name="driverNumber"
                       className="form-control"
                       value={busform.driverNumber}
                       onChange={handleChange}
                       min="6000000000"
                       max = "9999999999"
                       placeholder='Enter Drivers Number'
                       required />
                    <small>Format : [6-9]XXXXXXXXX</small>
                   </div>
                   <div className="form-group col-lg-3 col-md-12 col-sm-12 col-xs-12 m-1">
                    <label className="form-label"><IoTimeOutline/>DepartTime</label>
                    <input type="time"
                        name="departTime"
                        className="form-control"
                        value={busform.departTime}
                        onChange={handleChange}
                        placeholder='Enter Depart Time'
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
               
                <input type="submit" value="Submit" className="btn btn-primary btn-work" />
    

                
                
      
            </form>

        </div>
       {/* Getting the notification */}
        <ToastContainer/> 

        {/* Getting bus list */}

        <hr></hr>
      
      <div className='list-data-div'>

      {
                    busData.map((bus)=>{
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
                               
                                   
                                   <a href={`/admin/editbus/${bus._id}`} className='link-div'>Edit</a>
                                   &nbsp;
                                   {/* <a href={`/addbus/editbus/${bus._id}`} className='link-div'>Data</a> */}
                                   {/* &nbsp; */}
                                   <a href={`/selectSeats/${bus._id}`} className='link-div'>selectSeat</a>
                                   
                                 </div>
                                </div>
                              </div>
                            
                          
                    
                           
                         );
                       
                    })
                }
      </div>

      </div>
   
   )


}

// exporting the component
export default AddBus;
