import React from 'react'
import { useNavigate } from "react-router-dom";
import { Modal,ModalHeader,ModalBody,Row,Col } from 'reactstrap'
import { useState } from 'react'
import axios from 'axios'
import "./EmojicCss.css"



function UserGiveFeedback() {
    const initialState ={
        userId: localStorage.getItem("userId"),
        Feedback: " ",
        Reply: " ",
        Rating: " "
    }

const [crud,setCrud] = useState(initialState)
const navigate = useNavigate();
    
// const [modal,setmodal] = useState(false)

function handleSubmit(event){
    event.preventDefault()
    async function postCrud(){
        try{
            const response = await axios.post("http://localhost:4000/feedbacks/give-feedback",crud)
            navigate(`/users`)
            alert("thanks for your feedback")
        } catch(error){
            console.log(error);
        }
    }
    postCrud()
    console.log(crud);
}

function handleChange(event){
    setCrud({...crud,[event.target.name]:event.target.value})
}
function handleCancel(){
    navigate("/");
}
function navigation(){
  const ids = localStorage.getItem("userId")
  
  navigate(`/users/viewfeedback/${ids}`)
}


    return (
      <>
       <div className='container'>
         <form onSubmit={handleSubmit} className="col-lg-12">
          <Row>
            <Col lg={12}>
                  <div>
                    <label htmlFor='cnfrmNewPassword'>
                      <h3>Please Share your feedback</h3>
                    </label>
                    
                    <textarea
                    type='text'
                    value={crud.Feedback}
                    onChange={handleChange}
                    className='form-control'
                    placeholder='Your Feedback is very Valuable'
                    name='Feedback'
                    required='true'/>
                  </div>
                  <div>

                  </div>
                  <br /> <br />
            </Col>
            <h4>Please Rate Your Experience</h4>
            <Col lg={12}>
    <div className='items'>
              
    <div className="item">
      <label for="0">
      <input className="radio" type="radio" name="Rating" id="0" value="1" onClick={handleChange}/>
      <span>🤬</span>
    </label>
    </div>

    <div className="item">
      <label for="1">
      <input className="radio" type="radio" name="Rating" id="1" value="2" onClick={handleChange}/>
      <span>🙁</span>
    </label>
    </div>

    <div className="item">
      <label for="2">
      <input className="radio" type="radio" name="Rating" id="2" value="3"  onClick={handleChange}/>
      <span>😶</span>
    </label>
    </div>

    <div className="item">
      <label for="3">
      <input className="radio" type="radio" name="Rating" id="3" value="4"  onClick={handleChange}/>
      <span>😁</span>
    </label>
    </div>

    <div className="item">
      <label for="4">
      <input className="radio" type="radio" name="Rating" id="4" value="5"onChangeCapture={handleChange}/>
      <span>😍</span>
    </label>
    </div>

  </div>
            </Col>
           
          </Row>
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
        
        <button className='btn btn-primary mt-3' align="center" onClick={navigation}>View Feedback</button>
       </div>
       
      </>
    )
  }


export default UserGiveFeedback