import React,{ useEffect, useState } from 'react';
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";

function UserViewFeedback(props){
    
    const [cruds, setCrud] = useState([]);
    const {_id} = useParams();
    useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:4000/feedbacks/getFeedbacksByUser/${_id}`);
				setCrud(response.data);
                console.log(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
        
		getCruds();
	}, []
    );

    return(
        <>
        <div id="backg"></div>
        <div id='cont2'>
            <h3 id='heading'>Feedbacks</h3>
            <div className='container' id='table'>
                <div className="table-responsive">
                    <table className="table table-striped
                    table-hover	
                    table-borderless
                    align-middle">
                        <thead className="table-light">
                            <tr>
                                
                                <th>Feedback Id</th>
                                <th>Feedback</th>
                                <th>Rating</th>
                                <th>Reply</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {cruds && cruds.map((crud)=>{
                                    return(
                                        <tr className="table" key={crud._id} >
                                            <td>{crud._id}</td>
                                            <td>{crud.Feedback}</td>
                                            <td>{crud.Rating}</td>
                                            <td>{crud.Reply}</td>
                                           
                                        </tr>
                                    );
                                })}
                                
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                    </table>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default UserViewFeedback;