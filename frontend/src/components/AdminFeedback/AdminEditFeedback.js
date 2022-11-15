import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../AdminFeedback/EmojicCss.css'
function AdminFeedbackEditdetails(props){
    const initialState ={
        userId: " ",
        Feedback: '',
        Reply: '',
        Rating: '',
    }
    const [crud, setCrud] = useState(initialState);
    
    const navigate = useNavigate();
    
    const {_id} = useParams();

    useEffect( 
        function(){
            async function getCrud(){
                try{
                    const response = await axios.get(`http://localhost:4000/feedbacks/view-feedback/${_id}`)
                    setCrud(response.data)
                }catch(error){
                    console.log("error",error);

                }
            }
            getCrud()
        },[props]
    )

    function handleSubmit(event){
        event.preventDefault()

        async function updateCrud(){
            try{
                const response = await axios.put(`http://localhost:4000/feedbacks/update-feedback/${crud._id}`,crud)
                navigate(`/admin/viewallfeedback`)
            }catch(error){
                console.log("error",error);
            }
        }
        updateCrud()
    }
    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    function handleCancel(){
        navigate(`/cruds/${_id}`);
    }


    return(
        <>
        <br /><br />
        <h1 align="center">Admin Reply</h1>
        <br />
        <div >
        
        <div className="container"style={{ maxWidth: "400px" }}>
            
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">User Feedback</label>
                    <textarea
                        name="Feedback"
                        row = "10"
                        className="form-control"
                        value={crud.Feedback}
                        onChange={handleChange}
                        disabled="true"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Admin Reply</label>
                    <textarea
                        name="Reply"
                    
                        className="form-control"
                        value={crud.Reply}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Rating</label>
                    <input 
                    type="text" 
                    name="Name"
                    className="form-control"
                    onChange={handleChange}
                    value ={crud.Rating}
                    required = "true"
                    disabled="true" />
                </div>
                <br />
                <div className="btn-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    <button
                     type="button"
                     onClick={handleCancel}
                     className="btn btn-secondary">
                        Cancel
                    </button>
                    </div>
            </form>
        </div>
        </div>
        <br/>
        </>
    )
}
export default AdminFeedbackEditdetails