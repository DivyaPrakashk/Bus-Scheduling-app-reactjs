import React,{ useEffect, useState } from 'react';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";

function AdminViewAllFeedbacks(props){
    const [cruds, setCruds] = useState([]);
    useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:4000/feedbacks/");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
            console.log(cruds);
		}
		getCruds();
	}, []);
    return(
        <>
        <div id="backg"></div>
        <div id='cont2'>
            <h3 id='heading'>All Users Feedbacks</h3>
            <div className='container' id='table'>
                <div className="table-responsive">
                    <table className="table table-striped
                    table-hover	
                    table-borderless
                    align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Feedback Id</th>
                                <th>User Id</th>
                                <th>Feedback</th>
                                <th>Rating</th>
                                <th>Admin Reply</th>
                                <th>Edit/Give Feedback</th>
                                
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {cruds && cruds.map((crud)=>{
                                    return(
                                        <tr className="table" key={crud._id} >
                                            <td>{crud._id}</td>
                                            <td>{crud.userId}</td>
                                            <td>{crud.Feedback}</td>
                                            <td>{crud.Rating}</td>
                                            <td>{crud.Reply}</td>
                                            <td><Link
										to={`/admin/${crud._id}/editfeedback`}
										className="btn btn-primary btn-sm"
									>
										Edit Reply
									</Link></td>
                                           
                                            {/* <td id="heading"> <Link to={`/tickets/getTicketsByUser/${crud._id}`} className="btn btn-danger">Travel History</Link>
                                    </td> */}
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
        </>
    )
    }
export default AdminViewAllFeedbacks;