import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    window.open(
      "https://github.com/sahidrajaansari/Ai-Resume-Builder",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      console.log("Printing from Homepage User is There ");
      navigate("/dashboard");
    } else {
      console.log("Printing for Homepage User Not Found");
      navigate("/auth/sign-in");
    }
  };
  return (
    <>
      <Header user={user} />
      <section className="pt-28 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[80vh]">
        <div className="px-6 mx-auto max-w-6xl">
          <div className="w-full mx-auto text-left md:w-10/12 xl:w-8/12 md:text-center">
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              <span className="block">Craft Your</span>
              <span className="block w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-300">
                AI-Powered Resume
              </span>
              <span className="block text-2xl font-semibold text-gray-300 mt-2">
                Land your dream job, effortlessly.
              </span>
            </h1>
            <p className="px-0 mb-10 text-xl text-gray-300 md:text-2xl lg:px-20">
              Instantly generate, refine, and personalize your resume with the
              power of AI.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
              <Button
                className="w-full md:w-auto px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-500 to-green-400 shadow-lg hover:from-blue-600 hover:to-green-500 transition-all"
                onClick={hadnleGetStartedClick}
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="w-full mx-auto mt-16 text-center md:w-9/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl rounded-3xl border border-gray-700 bg-gray-800">
                <div className="flex items-center justify-between px-6 bg-gradient-to-r from-blue-700 to-green-700 h-12 rounded-t-3xl">
                  <div className="flex space-x-2">
                    <FaCircle className="w-3 h-3 text-white opacity-80" />
                    <FaCircle className="w-3 h-3 text-white opacity-80" />
                    <FaCircle className="w-3 h-3 text-white opacity-80" />
                  </div>
                  <FaInfoCircle className="text-white opacity-80" />
                </div>
                <img
                  className="object-cover py-4 px-6 rounded-b-3xl transition duration-300 transform hover:scale-105 bg-gray-900"
                  src={heroSnapshot}
                  alt="Dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="bg-gradient-to-r from-gray-900 to-gray-800"
        aria-labelledby="footer-heading"
      >
        <div className="mt-20 border-t border-gray-700 pt-8 lg:mt-28 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2024 Ai-Resume-Builder. All rights reserved.
          </p>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-blue-400 hover:bg-gray-800"
            onClick={handleClick}
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </Button>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
