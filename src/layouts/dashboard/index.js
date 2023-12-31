import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "./../../store/store";
import Announcement from "../../components/home/Announcement";
import Navbar from "../../components/home/Navbar";
import { url } from "../../components/helper/userRequest";
import "./index.css";
import axios from "axios";
const DashboardLayout = () => {
  axios.defaults.withCredentials = true;
  let authToken = useAuthStore((state) => {
    return state.auth.authToken;
  });
//   console.log(authToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  let isLoggedIn = useAuthStore((state) => {
    return state.auth.isLoggedIn;
  });

  // downwards is to keep the user LOGIN
  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(`${url()}/api/v1/user/private_data`).catch((err) => {
          setIsLoggedIn(false);
          console.log(err, err.response.data);
        });

      if (res) {
        const data = await res.data;
        // console.log(data);
        return data;
      }
    };

    sendRequest().then((data) => {
      try {
        setIsLoggedIn(true);
        setUser(data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    });
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
