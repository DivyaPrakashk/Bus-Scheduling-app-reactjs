import React, { useEffect,useState } from 'react';
import './userEdit.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserEdit(props) {
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
                navigate(`/users`)
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
                        className="form-control" onChange={handleChange} required minLength="3"/>
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
                        onChange={handleChange} required pattern="[6-9]{1}[0-9]{9}"/>
                </div>

                <div className="form-field1">
                    {/* <input type="radio" placeholder="Male" name="gender"/> */}
                    <input type="text" placeholder="Gender" value={crud.gender}
                     name="gender"
                     className="form-control"
                        onChange={handleChange} required
                        pattern="Male|Female"
                        />
                </div>

                <div className="form-field1">
                    {/* <input type="date" placeholder="Date Of Birth" name="Date Of Birth" required /> */}
                    <input type="text" name="dateOfBirth" 
                        className="form-control" placeholder="Date of Birth(DD-MM-YYYY)" value={crud.dateOfBirth}
                        onChange={handleChange} required 
                        pattern="(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})"
                           />
                </div>


                <div className="form-field1">
                    <button className="btn" type="submit">Update Profile</button>
                </div>
            </form>

        </div>
    );
}

export default UserEdit;