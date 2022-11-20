import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/authContext";

const Navbar = () => {
  // Custom auth hook
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to={"/"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Shivam's eCommerce</span>
        </NavLink>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to={"/"} className="mr-5 hover:text-gray-900">
            Home
          </NavLink>
          <NavLink to={"/products"} className="mr-5 hover:text-gray-900">
            Products
          </NavLink>
          {/* <NavLink to={'/'} className="mr-5 hover:text-gray-900">Third Link</NavLink> */}
          {/* <NavLink to={'/'} className="mr-5 hover:text-gray-900">Fourth Link</NavLink> */}
        </nav>
        <div>
          {!auth?.user ? (
            <>
              <NavLink
                to={"/login"}
                className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mr-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavLink>
              <NavLink
                to={"/register"}
                className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
              >
                Register
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavLink>
            </>
          ) : (
            <>
              {/* Logout BTN */}
              <a
                onClick={handleLogout}
                className="inline-flex items-center hover:cursor-pointer bg-gray-100 border-0 py-1 px-3 mr-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Logout
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
