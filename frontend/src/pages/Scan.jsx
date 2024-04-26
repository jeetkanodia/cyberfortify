import React from "react";
import { useState, useEffect } from "react";
import { BACKENDURL } from "../const";
import Typewriter from "typewriter-effect";
const Scan = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState(null);
  const onScan = (e) => {
    setLoading(true);
    setData([]);
    e.preventDefault();
    console.log(url);
    fetch(`${BACKENDURL}/api/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.findings) {
          setTimeout(() => {
            setData(data.findings);
            console.log(data.findings);
            setLoading(false);
          }, 10000);
        }
        if (data.error) {
          alert("The website you are trying to scan doesnt belong to you!!");
          setLoading(false);
        }
      });
  };
  const FixPopup = ({ finding, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold">{finding.name}</h2>
        <p className="my-4">{finding.fix}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-t from-[#2A2541] to-[#000000] absolute top-0 w-full min-h-screen flex flex-col items-center pt-[70px] sm:pt-[100px]">
      <div className="flex flex-col items-center">
        <h1
          style={{
            backgroundImage: "linear-gradient(to right, #FFA500, #FF69B4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-7xl m-10 mt-28"
        >
          Enter the URL to scan
        </h1>
        <form className="flex flex-col items-center" onSubmit={onScan}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-96 h-10 p-2 mb-4 text-black rounded-md"
          />
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Scan
            </span>
          </button>
        </form>
        {loading && (
          <div role="status" className="m-5 text-3xl font-bold text-amber-200">
            {/* Loading indicator */}
            <div className="flex ">
              Scanning
              <Typewriter
                options={{
                  strings: [".", "..", "..."],
                  autoStart: true,
                  loop: true,
                  delay: 0,
                }}
              />
            </div>
          </div>
        )}
        <div className="text-xl text-white flex flex-col m-5 gap-4 justify-center">
          {data.length > 0 &&
            data.map((item, index) => (
              <div key={index} className="mx-20 my-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-amber-200">
                    {index + 1}. {item.name}
                  </h2>
                  <button
                    onClick={() => setSelectedFinding(item)}
                    className="bg-[#b8860b] text-white py-2 px-8 text-20 rounded cursor-pointer hover:bg-[#d2a106] transition ease-in-out duration-150"
                  >
                    Fix
                  </button>
                </div>
                <p className="text-xl font-light text-pink-100">
                  {item.description}
                </p>
              </div>
            ))}
        </div>
        {selectedFinding && (
          <FixPopup
            finding={selectedFinding}
            onClose={() => setSelectedFinding(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Scan;
