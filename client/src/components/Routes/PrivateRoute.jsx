import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/authContext";
import Loader from "./Loader";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserAuthCheck = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/checkAuth`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );

    if (data?.success) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserAuthCheck();
  }, [auth?.token]);

  // UseEffect to check user token from local storage - Not secure
  // useEffect(() => {
  //   if (auth?.token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [auth?.token]);

  return isLoggedIn ? <Outlet /> : <Loader />;
};

export default PrivateRoute;
