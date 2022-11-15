import React, { useEffect,useState } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';

function Login(props) {
    const initialState = {
        email: "",
        password:"",
    };

    const [crud, setCrud] = useState(initialState);
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        async function postCrud(){
            try{
                const response = await axios.post("http://localhost:4000/users/authenticate",crud);
                localStorage.setItem("userId", response.data._id);
                localStorage.setItem("role",response.data.role);
                localStorage.setItem("name",response.data.userName);
                if(response.data.role == "Customer"){
                    navigate(`/users`)
                }
                else if(response.data.role == "Admin"){
                    navigate(`/admin`)
                }
                else{
                    navigate("/")
                }
                

            }catch(error){
                console.log(error);
                alert("wrong credentials!!");
            }
        }
        postCrud();
    }

    function handleChange(event){
        setCrud({...crud,[event.target.name]:event.target.value})
    }

    return (
        <div id='bg-login'>
            

            <div className="col d-flex justify-content-center"> 

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-field2">
                    <input type="email" className="form-control" name='email'
                        value={crud.email}
                        onChange={handleChange} placeholder="Email" required />
                </div>

                <div className="form-field2">
                    <input type="password" className="form-control" name='password'
                        value={crud.password}
                        onChange={handleChange} placeholder="Password" required />
                </div>

                <div className="form-field2">
                    <button className="btn btn-primary" type="submit">Log in</button>
                </div>
                <div id="create-account-wrap">
                    <p>Not a member? <Link to={`/users/register`}>Create Account</Link></p>
                </div>
                </div>
            </form>
</div>
        </div>
    );
}

export default Login;