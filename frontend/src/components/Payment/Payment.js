import { useState, useEffect } from "react";
import "./Payment.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import image1 from "../../Images/visamasterc.png"
import image2 from "../../Images/jcb.jpg"
import image3 from "../../Images/express.png"
//import Alert from 'react-bootstrap/Alert'
import moment from 'moment';

function Payment() {
    var seats = localStorage.getItem("seatArray");
    seats = JSON.parse(seats);
    console.log(seats);
    const initialValues = { cardnumber: "", name: "", expiry: "", cvv: "" };
    const ticketValues = {
        userId: (localStorage.getItem("userId")),
        busId: (localStorage.getItem("busId")),
        ForEverySelectedSeat: seats,

    };
    const [ticket, setTicket] = useState(ticketValues);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState({});
    const [bus, setBus] = useState({});
    const { _id } = useParams();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`http://localhost:4000/users/getUser/${ticketValues.userId}`);
                setUser(response.data)

            } catch (error) {
                console.log("error", error);
            }
        }
        async function getBus() {
            try {
                const response = await axios.get(`http://localhost:4000/buses/getBusById/${ticketValues.busId}`);
                console.log(response.data);
                var ts = localStorage.getItem("seatArray");
                var ts  = JSON.parse(ts);
                for (var i = 0; i < ts.length; i++) {
                    response.data.ForEverySeat[ts[i]-1] = 1;
                  }
                console.log(response.data);
                setBus(response.data)

            } catch (error) {
                console.log("error", error);
            }
        }
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            async function postTicket() {
                try {
                    const response = await axios.post("http://localhost:4000/tickets/addTicket", ticket);
                    //var id=response.data._id;
                    //localStorage.setItem("ticketId",id);
                    const response2 = await axios.put(`http://localhost:4000/buses/selectseats/${ticketValues.busId}`, bus);
                    console.log(response2);
                    alert("Payment done Successfully!!! \n Thank You");
                    navigate(`/tickets/getTicket/${response.data._id}`);

                } catch (error) {
                    console.log(error);
                }
            }
            postTicket();

        }
        getUser();
        getBus();
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};

        if (!values.cardnumber) {
            errors.cardnumber = "CardNumber is required!";
        } else if (values.cardnumber.length < 16) {
            errors.cardnumber = "Card Number must be 16 digits";
        } else if (values.cardnumber.length > 16) {
            errors.cardnumber = "Card Number must be 16 digits";
        }
        if (!values.name) {
            errors.name = "Name is required!";
        } else if (values.name.length < 4) {
            errors.name = "Name should be more than 3 letters!";
        }
        if (!values.expiry) {
            errors.expiry = "Expiry Date is required!";
        }
        if (!values.cvv) {
            errors.cvv = "Cvv Number is required!";
        } else if (values.cvv.length < 3) {
            errors.cvv = "Cvv Number must be 3 digits";
        }
        return errors;
    };

    return (
        <div className="col d-flex justify-content-center" >
        <div className="container">
            <div className="row">
                <div className="col-md-8" >
                <h4 className='pPayment' > Enter Card details </h4>
                            <img src={image1} className="img" alt="visa" /><img src={image2} className="img1" /><img src={image3} className="img1" />
                            
                    <form onSubmit={handleSubmit} >
                            <div className="form-field5">
                                <input
                                    type="number"
                                    name="cardnumber"
                                    placeholder="Card Number"
                                    minLength={16}
                                    maxLength={16}
                                    pattern='^\d{16}$'
                                    value={formValues.cardnumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <p1>{formErrors.cardnumber}</p1>
                            <div className="form-field5">
                                <input
                                    
                                    type="text"
                                    name="name"
                                    placeholder="Name on card"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <p1>{formErrors.name}</p1>
                            <div className="form-field5">
                                <input
                                    type="tel"
                                    name="expiry"
                                    placeholder="Valid Thru (mm/yy)"
                                    pattern="(?:0[1-9]|1[0-2])/[2-4]{1}[2-9]{1}"

                                    value={formValues.expiry}
                                    onChange={handleChange}
                                />


                            </div>
                            <p1>{formErrors.expiry}</p1>
                            <div className="form-field5">
                            
                                <input
                                    type="number"
                                    name="cvv"
                                    minLength={3}
                                    maxLength={3}
                                    placeholder="CVV Number"
                                    pattern='^\d{3}$'
                                    value={formValues.cvv}
                                    onChange={handleChange}
                                />
                            </div>
                            <p1>{formErrors.cvv}</p1><br />
                            {/* <input type="submit" value="Submit" className="btn btn-primary" /> */}
                            <button className="btn btn-success">Pay </button> &nbsp;
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    const confirmBox = window.confirm(
                                        "Do you really want to cancel the pay?"
                                    )
                                    if (confirmBox === true) {
                                        navigate("/");
                                    }
                                }}>Cancel
                            </button>
                        

                    </form>
                </div>
                <div className="col-md-4">
                <div className="col d-flex justify-content-center" >
                    <div className="bookingdetails">
                        
                        <h5>Booking Details</h5><hr />
                        <h6><i class="bi bi-person-circle"></i> Name : {user.userName}</h6>
                        <h6><i class="bi bi-telephone-fill"></i> Ph. No. : {user.phoneNumber}</h6><hr />
                        <h6><i class="bi bi-geo-alt"></i> From : {bus.startCity}</h6>
                        <h6><i class="bi bi-geo-alt-fill"></i> To : {bus.destination}</h6>
                        <h6><i className="bi bi-calendar3"></i> Date : {moment(bus.departDate).utc().format('DD MMMM YYYY')}</h6>
                        <h6><i class="bi bi-truck-front-fill"></i> Bus Number : {bus.busNumber}</h6><hr />
                        <h6>selected seats : {ticketValues.ForEverySelectedSeat}</h6><hr />
                        <h6>Total Fare : {'\u20B9'}{bus.pricePerSeat * ticketValues.ForEverySelectedSeat?.length}</h6>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Payment;