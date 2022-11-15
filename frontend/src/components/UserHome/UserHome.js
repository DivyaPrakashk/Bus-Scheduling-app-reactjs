import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import './UserHome.css'

function UserHome(){
    return(
        <>
        <div id="bg-userhome" >
        <div className="col d-flex justify-content-center">
        <div class="card col-md-4" id="userhome-card" >
          <div class="card-body" >
          <h5 class="card-title">Looking to go on a trip?</h5>
          <p class="card-text">Use our app to book ticket</p>
          {/* <a href="#" class="btn btn-primary">Search For Buses</a> */}
          <Link to={`/busSearch`} className="btn btn-danger">
                    Search For Buses
                </Link>
          </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default UserHome;