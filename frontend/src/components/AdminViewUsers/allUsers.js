import React,{ useEffect, useState } from 'react';
import './allUsers.css';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";


function AllUsers(){
    const [cruds, setCruds] = useState([]);
    useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:4000/users/getAllUsers");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);


    return(
        <div >
        <div id="backgr">
        <div className='col d-flex justify-content-center'>
        <div id='cont2'  className='col-md-8'>
            <h3 id='heading'>All Users Details</h3>
            <div className='container' id='table'>
                <div className="table-responsive">
                    <table className="table table-striped
                    table-hover	
                    table-borderless
                    align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>User Id</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>DOB</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {cruds && cruds.map((crud)=>{
                                    return(
                                        <tr className="table" key={crud._id} >
                                            <td>{crud._id}</td>
                                            <td>{crud.userName}</td>
                                            <td>{crud.email}</td>
                                            <td>{crud.phoneNumber}</td>
                                            <td>{crud.gender}</td>
                                            <td>{crud.dateOfBirth}</td>
                                            <td id="heading"> <Link to={`/admin/travelhistory/${crud._id}`} className="btn btn-danger">Travel History</Link>
                                    </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                            <Link to="/admin" className="btn btn-secondary">Go to Home</Link>  
                            </tfoot>
                    </table>
                    
                </div>
                
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default AllUsers;