import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../HomeNavbar/HomeNavbar";

const HomeLayout = ()=>{
    return(
        <>
          <HomeNavbar/>
          <Outlet/>
        </>
    )
}

export default HomeLayout;