import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <div className="w-12 h-12 border-2 border-t-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
      <span className="mt-4 span">Loading...</span> {/* Texto visível */}
    </div>
  );
};

export default Loader;
