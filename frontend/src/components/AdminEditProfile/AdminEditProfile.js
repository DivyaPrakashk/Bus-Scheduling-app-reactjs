import React, { useEffect,useState } from 'react';
import './userEdit.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminEdit(props) {
    const initialState = {
        userName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
    };
    const [crud, setCrud] = useState(initialState);
    const navigate = useNavigate();
    const {_id} = useParams();

    useEffect(
        function(){
            async function getCrud(){
                try{
                    const response = await axios.get(`http://localhost:4000/users/getUser/${_id}`);
                    setCrud(response.data)
                }catch(error){
                    console.log("error",error);
                }
            }
            getCrud();
        },
        [props]
    );

    function handleSubmit(event){
        event.preventDefault();
        async function udpateCrud(){
            try{
                const response = await axios.patch(`http://localhost:4000/users/updateUser/${crud._id}`,crud);
                navigate(`/admin`)
            }catch(error){
                console.log(error);
            }
        }
        udpateCrud();
    }

    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    function handleCancel(){
        navigate(`/cruds/${_id}`);
    }

    return (
        <div className='col d-flex justify-content-center' id='body-edit'>      
            <form onSubmit={handleSubmit}>
                <div className="form-field1">
                    <input type="text" placeholder="Name" value={crud.userName}
                        name="userName"
                        className="form-control" onChange={handleChange} required />
                </div>
                
                <div className="form-field1">
                    <input type="email" placeholder="Email" value={crud.email}
                     name="email"
                     className="form-control"
                        onChange={handleChange} required />
                </div>

                <div className="form-field1">
                    <input type="text" placeholder="Mobile No." value={crud.phoneNumber}
                     name="phoneNumber"
                     className="form-control"
                        onChange={handleChange} required />
                </div>

                <div className="form-field1">
                    {/* <input type="radio" placeholder="Male" name="gender"/> */}
                    <input type="text" placeholder="Gender" value={crud.gender}
                     name="gender"
                     className="form-control"
                        onChange={handleChange} />
                </div>

                <div className="form-field1">
                    {/* <input type="date" placeholder="Date Of Birth" name="Date Of Birth" required /> */}
                    <input type="text" name="dateOfBirth" 
                        className="form-control" placeholder="Date of Birth(DD-MM-YYYY)" value={crud.dateOfBirth}
                        onChange={handleChange} required 
                    
                           />
                </div>


                <div className="form-field1">
                    <button className="btn" type="submit">Update Profile</button>
                </div>
            </form>

        </div>
    );
}

export default AdminEdit;