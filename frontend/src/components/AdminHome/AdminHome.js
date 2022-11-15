import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import './AdminHome.css'

function AdminHome(){
    return(
        <>
        
        <div id="adminhome-1">
        <div className="col d-flex justify-content-center">
        <div class="card" id="adminhome-card1">
          <div class="card-body">
          <h5 class="card-title">Users</h5>
          <p class="card-text">Want to see all users?</p>
          {/* <a href="#" class="btn btn-primary">Search For Buses</a> */}
          <Link to={`/admin/allusers`} className="btn btn-danger">
                    Go
                </Link>
          </div>
        </div>
        <div class="card" id="adminhome-card2">
          <div class="card-body">
          <h5 class="card-title">Buses</h5>
          <p class="card-text">Want to view/update buses?</p>
          {/* <a href="#" class="btn btn-primary">Search For Buses</a> */}
          <Link to={`/admin/addbus`} className="btn btn-danger">
                    Go
                </Link>
          </div>
        </div>
        <div class="card" id="adminhome-card3">
          <div class="card-body">
          <h5 class="card-title">Feedback</h5>
          <p class="card-text">Want to view what users are saying?</p>
          {/* <a href="#" class="btn btn-primary">Search For Buses</a> */}
          <Link to={`/admin/viewallfeedback`} className="btn btn-danger">
                    Go
                </Link>
          </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default AdminHome;