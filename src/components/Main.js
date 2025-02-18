import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from "../redux/actions/fileActions";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import "../App.css";

const Main = () => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Ativa o Loader
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
      } finally {
        setIsLoading(false); // Desativa o Loader após a conversão
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-animation flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Converse com qualquer PDF
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-100 font-mono">
            Junte-se a milhões de estudantes, pesquisadores e profissionais para
          </p>
          <p className="text-sm sm:text-base md:text-lg text-zinc-100 font-mono">
            responder perguntas instantaneamente e compreender pesquisas com IA
          </p>
        </div>
        <div
          className={`drop-area ${
            dragging
              ? "bg-blue-100 border-blue-500"
              : "bg-white border-gray-300"
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading && <Loader />} {/*Carregamento loader*/}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
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
            </div>
            <div className="text-gray-600 text-lg sm:text-xl">
              Faça upload aqui
            </div>
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-black-900 font-mono p-8">
          OBS: APLICAÇÃO NA VERSÃO BETA, TOKENS LIMITADOS, EVITE O USO DE PDFs
          GRANDES, OBRIGADO.
        </p>
      </div>
    </div>
  );
};

export default Main;
