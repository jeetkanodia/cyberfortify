import React from "react";
import { useState } from "react";

const Scan = () => {
  const [data, setData] = useState("");
  const onScan = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-90% absolute top-0 w-full min-h-screen h-auto flex flex-col content-center items-center sm:pt-[100px] pt-[70px]">
      <div className="flex flex-col items-center">
        <h1
          style={{
            backgroundImage: "linear-gradient(to right, #FFA500, #FF69B4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-white text-7xl m-10 mt-28 "
        >
          {/* bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent */}
          Enter the URL to scan
        </h1>
        <form className="flex flex-col items-center" onSubmit={onScan}>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-96 h-10 p-2 mb-4 m-auto text-black rounded-md"
          />
          <button
            type="submit"
            className="relative m-5 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Scan
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Scan;
