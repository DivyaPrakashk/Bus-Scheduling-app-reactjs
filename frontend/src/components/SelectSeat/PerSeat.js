// react and hooks
import React,{useEffect, useState} from "react";

// css
import  "./SelectSeat.css";
// icons
import { MdOutlineAirlineSeatReclineNormal} from 'react-icons/md'
import { TbArmchair } from "react-icons/tb";



const PerSeat = ({
    seatNo,
    alreadyBookedSeats,
    handleSelectedSeats,
    selectedSeats,
}) => {
    var color;
    var color2;
  
    const [icon, setIcon] = useState(0);

    console.log("alreadyInside3",alreadyBookedSeats,seatNo);

    useEffect(()=>{
      if (alreadyBookedSeats.includes(seatNo)) {
        color = { color: "white" };
        color2 = { color: "black" };
        setIcon(2);
      } 
      else if (selectedSeats.includes(seatNo)) {
        color = { color: "black" };
        color2 = { color: "white" };
        setIcon(2);
      }

    },[])
    
  
      
  
  const handleSeatBooking = () => {
   if (!alreadyBookedSeats.includes(seatNo)) {
      handleSelectedSeats(seatNo);
 
    }
    console.log(selectedSeats);
  };

  console.log(seatNo);

  
  return (
    // <div  className={styles.mainContainePer}>
    // {icon &&  <MdOutlineAirlineSeatReclineNormal arrow onClick={handleSeatBooking} style={color}/>}
    // {!icon &&  <TbArmchair arrow onClick={handleSeatBooking} style={color}/>}
  
    // </div>
    <div className='mainContainePer'>
       {/* {icon==0?<TbArmchair arrow onClick={handleSeatBooking} style={color}/>:
       <MdOutlineAirlineSeatReclineNormal arrow onClick={handleSeatBooking} style={{
        backgroundColor: {color2},
        color : {color}

      }}/>} */}
      {alreadyBookedSeats.includes(seatNo)?<><MdOutlineAirlineSeatReclineNormal arrow onClick={handleSeatBooking} style={{
        backgroundColor: {color2},
        color : {color}

      }}/></>:<>

     { selectedSeats.includes(seatNo)?<><MdOutlineAirlineSeatReclineNormal arrow onClick={handleSeatBooking} style={{
        backgroundColor: {color2},
        color : {color}

      }}/></>:<><TbArmchair arrow onClick={handleSeatBooking} style={color}/>
      </>}
      </>}
    </div>
  );
};

export { PerSeat };