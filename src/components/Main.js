import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from "../redux/actions/fileActions";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Main = () => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const dispatch = useDispatch();
  const { uploading, fileUrl, pdfId } = useSelector((state) => state.file);

  const { handleDrop, handleDragOver, handleDragEnter, handleDragLeave } =
    useDragAndDrop(setDragging, (file) => dispatch(uploadFile(file)));

  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     try {
  //       const { fileUrl, pdfId } = dispatch(uploadFile(file));
  //       console.log("Uploaded file");
  //       console.log("File URL:", fileUrl); // Verifique o valor de fileUrl
  //       console.log("File URL:", file); // Verifique o valor de fileUrl
  //       console.log("PDF ID:", pdfId); // Verifique o valor de pdfId
  //       navigate("/chat", { state: { fileUrl, pdfId } });
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(uploadFile(file));
        console.log("Uploaded file");
        console.log("File URL:", file); // Verifique o valor de fileUrl
        console.log("PDF ID:", pdfId); // Verifique o valor de pdfId
        navigate("/chat", { state: { fileUrl, pdfId } });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-animation flex flex-col items-center">
      <div className="mt-[100px]">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Chat with any PDF
          </h1>
          <p className="text-lg text-zinc-200 font-bold">
            Join millions of students, researchers, and professionals to
          </p>
          <p className="text-lg text-zinc-200 font-bold">
            instantly answer questions and understand research with AI
          </p>
        </div>
        <div
          className={`drop-area flex flex-col items-center ${
            dragging ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
          <div className="inset-0 flex items-center justify-center">
            {uploading ? (
              <div>Uploading...</div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 text-xl">Drop PDF here</div>
          </div>
        </div>
        ch
        {fileUrl && (
          <div className="mt-4">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View Uploaded PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;