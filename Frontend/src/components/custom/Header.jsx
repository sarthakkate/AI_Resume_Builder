import React, { useEffect } from "react";
import logo from "/Icon.png";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode == 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="printHeader"
      className="flex justify-between px-10 py-5 shadow-md items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    >
      <img
        src={logo}
        alt="logo"
        width={100}
        height={100}
        className="filter invert brightness-200 drop-shadow-lg"
      />
      {user ? (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
