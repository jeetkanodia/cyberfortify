import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgb(42, 37, 65), rgb(0, 0, 0))",
      }}
      className="text-white w-full min-h-screen flex flex-col items-center"
    >
      <h1
        style={{
          backgroundImage: "linear-gradient(to right, #FFA500, #FF69B4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-white text-9xl m-10 mt-28 "
      >
        {/* bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent */}
        Cyber Fortify
      </h1>

      <div className="flex flex-col justify-center items-center m-4 text-2xl text-amber-100">
        <div>
          Welcome to Cyber Fortify, your fortress against digital
          vulnerabilities! , we provide the following services
        </div>
        <Typewriter
          options={{
            strings: [
              " Robust DAST Solutions",
              " Proactive Defense",
              " Expert Guidance",
              " Comprehensive Reports",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <Link to="/scan" className="m-8">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Started
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Home;
