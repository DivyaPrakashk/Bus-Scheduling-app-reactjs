import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './UserRegistration.css';
function UserRegistration(props){
    const initialState={
        userName:"",
        email:"",
        phoneNumber:"",
        gender:"",
        dateOfBirth:"",
        password:"",
    };

    const [crud, setCrud] = useState(initialState);
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        async function postCrud(){
            try{
                const response = await axios.post("http://localhost:4000/users/addUser",crud);
                navigate(`/users/login`)

            }catch(error){
                alert("Email and/or password already exists.");
                console.log(error);
            }
        }
        postCrud();
    }

    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    function handleCancel(){
        navigate("/");
    }

    return(
        // <div className="container" style={{ maxWidth: "400px" }}>
    <div className="col d-flex justify-content-center" id="bg-registration">
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                {/* <label className="form-label">Name</label> */}
                <input type="text"
                    name="userName"
                    placeholder="Enter Name"
                    className="form-control"
                    value={crud.userName}
                    onChange={handleChange}
                    required />
            </div>
            <div className="form-field">
                {/* <label className="form-label">Email</label> */}
                <input type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={crud.email}
                    onChange={handleChange}
                    pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                    required
                />
            </div>
            <div className="form-field">
                {/* <label className="form-label">Phone</label> */}
                <input type="text"
                    name="phoneNumber"
                    placeholder="Enter Phone No."
                    className="form-control"
                    value={crud.phoneNumber}
                    onChange={handleChange}
                    pattern="[6-9]{1}[0-9]{9}"
                    required
                />
                {/* <small>Format : XXXXXXXXXX</small> */}
            </div>
           
            <div className="form-field">
                {/* <label className="form-label">Gender</label> */}
                <input type="text"
                    name="gender"
                    className="form-control"
                    placeholder="Enter Gender"
                    value={crud.gender}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                {/* <label className="form-label">Date Of Birth</label> */}
                <input type="text"
                    name="dateOfBirth"
                    placeholder="DD-MM-YYYY"
                    className="form-control"
                    value={crud.dateOfBirth}
                    onChange={handleChange}
                />
                
            </div>
            <div className="form-field">
                {/* <label className="form-label">Password</label> */}
                <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={crud.password}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <input type="submit" value="Submit" className="btn btn-primary" />
                &nbsp;&nbsp;
                <button
                 type="button"
                 onClick={handleCancel}
                 className="btn btn-secondary">
                    Cancel
                </button>

            </div>

        </form>
        </div>

    )

}
export default UserRegistration;