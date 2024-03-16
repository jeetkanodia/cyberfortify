import React from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState("");

  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgb(42, 37, 65), rgb(0, 0, 0))",
      }}
      className="text-white w-full min-h-screen flex flex-col items-center"
    >
      <h1 className="text-white text-6xl m-10 mt-28">Cyber Fortify</h1>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
        nesciunt consequatur voluptas illum facere quibusdam id deserunt fuga
        rerum officiis!
      </div>
      <input
        type="text"
        className="m-5 p-2 text-black"
        placeholder="Enter website link"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
    </div>
  );
}
