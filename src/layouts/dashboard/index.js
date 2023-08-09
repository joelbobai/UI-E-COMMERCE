import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "./../../store/store";
import Announcement from "../../components/home/Announcement";
import Navbar from "../../components/home/Navbar";

import "./index.css";
//import axios from "axios";
//axios.defaults.withCredentials = true;
const DashboardLayout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  let isLoggedIn = useAuthStore((state) => {
    return state.auth.isLoggedIn;
  });

  // downwards is to keep the user LOGIN
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("https://backend-e-commerce-558w5gv0q-joelbobai.vercel.app/api/v1/user/private_data", {
          method: 'GET',
          credentials: 'include', // Equivalent to axios withCredentials: true
        });

        if (response.ok) {
          const data = await response.json();
          // Process the response data here
         setIsLoggedIn(true);
        setUser(data.user);
          console.log(data);
        } else {
          setIsLoggedIn(false);
          const errorData = await response.json();
          console.log("Error:", errorData);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.log("Error:", err);
      }
    };
    
  sendRequest();
  }, [setIsLoggedIn, setUser]);
  if (!isLoggedIn) {
    return <Navigate to="/form" />;
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Announcement />
        <Navbar />
        <Outlet />
      </div>
    );
  }
};

export default DashboardLayout;
