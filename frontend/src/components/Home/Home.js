import React,{useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import './Home.css';
function Home(){
    return(
        <div id="bg-home" >
            <div className="col d-flex justify-content-center">    
        <div class="card col-md-4" id="home-card">
          <div class="card-body">
          <h5 class="card-title">Looking to go on a trip?</h5>
          <p class="card-text">plan your journey by logging in!!</p>
          {/* <a href="#" class="btn btn-primary">Search For Buses</a> */}
          <Link to={`/users/login`} className="btn btn-danger">
                    login
                </Link>
          </div>
        </div>
        </div>
        </div>
    )
}

export default Home;