import React,{ useEffect, useState } from 'react';
import './userProfile.css';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import image from '../../Images/profilePic.png';

function UserProfile(props){
    const [crud, setCrud] = useState({});
    const {_id} = useParams();
    const navigate = useNavigate();

    useEffect(
        function () {
            async function getCrudById() {
                try {
                    const response = await axios.get(`http://localhost:4000/users/getUser/${_id}`);
                    
                    setCrud(response.data);
                } catch (error) {
                    console.log("error", error);
                }

            }
            getCrudById();
        }, [props]
    );

    async function handleDelete(){
        try{
            const response = await axios.delete(`http://localhost:4000/users/deleteUser/${_id}`);
            setCrud(response.data);
        }catch(error){
            console.log("error",error);
        }

    }
    return(
    
        
       <div id='bg-profile' className='col d-flex justify-content-center'>
        <div id="cont1" className='col-md-6'>
            <div className="row" id="pic">
                <div className='col-md-8 d-flex justify-content-flex-end'><img src={image} id='img'/></div>
                <div className='col-md-4' id='history'><Link to={`/users/travelhistory/${crud._id}`} className='btn btn-secondary'>My Bookings</Link></div>   
            </div>
            <div id='profile'>
            <h2>{crud.userName}</h2>
            <div id='contents'>
            <p>
                <b>Phone </b>: <a href={`tel:+${crud.phoneNumber}`}>{crud.phoneNumber}</a>
            </p>
            <p>
                <b>Email </b>: {crud.email}
            </p>
            <p>
                <b>Gender </b>: {crud.gender}
            </p>
            <p>
                <b>DOB </b>: {crud.dateOfBirth}
            </p>
            </div>
           
            <div className="btn-group" id='buttons'>
                <Link to={`/users/updateUser/${crud._id}`} className="btn btn-primary">
                    Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
                <Link to="/users" className="btn btn-secondary">
                    Close
                </Link>
                
                </div>
                </div>
            
        </div>
        
        
        </div>
       
    )
}
export default UserProfile;