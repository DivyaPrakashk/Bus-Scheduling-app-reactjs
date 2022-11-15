import {NavLink} from "react-router-dom";
import './HomeNavbar.css';
import bus from '../../Images/bus.png';

const HomeNavbar =()=>{
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark" >
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" hrefLang="#" to={"/"}>
                        <img src={bus} id="logo"/>Travel Buddy
                        </NavLink>
                        <button className="navbar-toggler collapsed" 
                           type="button" 
                           data-bs-toggle="collapse" 
                           data-bs-target="#mobileMenu"
                            aria-controls="mobileMenu"
                             aria-expanded="false" 
                             aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon top-bar"></span>
                            <span className="navbar-toggler-icon middle-bar"></span>
                            <span className="navbar-toggler-icon bottom-bar"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse " id="mobileMenu">
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                     className="nav-link"
                                     activeClassName="active"
                                     to="/users/register">
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                     className="nav-link"
                                     activeClassName="active"
                                     to="/users/login">
                                        Login
                                    </NavLink>
                                </li>
                                </div>
                        </div>
                    </div>
                </nav>
        </>
    )
}

export default HomeNavbar;