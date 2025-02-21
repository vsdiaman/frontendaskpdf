import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPdfList, uploadFile } from "../redux/actions/fileActions";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react"; // Ícone da seta
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import axios from "axios";
import { Linkedin, Instagram } from "lucide-react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import backendUrls from "../config/config.js";

const ChatPage = () => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { fileUrl: initialFileUrl, pdfId: initialPdfId } = location.state || {};
  const { fileUrl, pdfId, uploading, error } = useSelector(
    (state) => state.file
  );
  const [isUploading, setIsUploading] = useState(uploading);
  // const [pdfText, setPdfText] = useState("");
  const pdfText = useSelector((state) => state.file.pdfText);
  // const apiUrl = backendUrls.local;
  const apiUrl = backendUrls.production;
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(
    initialFileUrl || fileUrl
  );
  const [uploadedPdfId, setUploadedPdfId] = useState(initialPdfId || pdfId);

  const pdfjsVersion = "2.16.105";
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // Função para rolar até a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // useEffect(() => {
  //   const fetchPdfText = async () => {
  //     if (uploadedPdfId) {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:4000/pdf/${uploadedPdfId}/text`
  //         );
  //         setPdfText(response.data.text); // Armazena o texto extraído do PDF
  //       } catch (error) {
  //         console.error("Erro ao carregar texto do PDF:", error);
  //       }
  //     }
  //   };

  //   fetchPdfText();
  // }, [uploadedPdfId]);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  useEffect(() => {
    // Carrega a lista de PDFs quando o componente é montado
    dispatch(fetchPdfList());
  }, [dispatch]);

  useEffect(() => {
    if (!isUploading) {
      dispatch(fetchPdfList());
    }
  }, [dispatch, isUploading]);

  useEffect(() => {
    if (fileUrl) {
      setUploadedPdfUrl(fileUrl);
    }
    if (pdfId) {
      setUploadedPdfId(pdfId);
    }
  }, [fileUrl, pdfId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const result = await dispatch(uploadFile(file));

        // Se o backend retorna JSON, atualizamos os messages do chat
        if (result.fileContent) {
          setMessages([{ text: result.fileContent, fromUser: false }]);
        }

        setUploadedPdfUrl(result.fileUrl);
        setUploadedPdfId(result.pdfId);
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    if (!pdfText || pdfText.trim() === "") {
      console.error("⚠️ Erro: O texto do PDF está vazio!");
      return;
    }

    // Adiciona a mensagem do usuário e um placeholder da IA com o spinner
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, fromUser: true },
      { text: "", fromUser: false, isLoading: true }, // ⬅️ Spinner aparece aqui
    ]);

    setInputValue("");
    // const backendUrl = "https://backend-chatpdf-production.up.railway.app"; // URL fixa
    console.log("BACKEND URL:", apiUrl);
    try {
      const response = await axios.post(`${apiUrl}/chat/completion`, {
        pdfText,
        question: inputValue,
      });

      console.log("Resposta da API:", response.data);

      let responseMessage = response.data.Completion;

      if (typeof response.data === "string") {
        responseMessage = response.data;
      }

      if (responseMessage) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.isLoading ? { text: responseMessage, fromUser: false } : msg
          )
        );
      } else {
        console.error(
          "⚠️ A resposta da API está vazia ou em formato inesperado."
        );
      }
    } catch (err) {
      console.error("❌ Erro ao enviar mensagem:", err);
    }
  };

  //     console.log("📄 Resposta do chat:", response.data);
  //   } catch (error) {
  //     console.error("❌ Erro ao enviar mensagem:", error);
  //   }
  // };

  return (
    <div className="flex flex-col bg-gradient-animation h-screen overflow-hidden p-4">
      <div className="flex-1 flex flex-col h-full p-4 bg-white rounded-3xl shadow-sm m-2">
        {/* Chat Header */}
        <header className="bg-white p-2 sm:p-4 text-gray-100">
          <h1 className="mb-2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              PDFs mais inteligentes
            </span>
            , IA poderosa.
          </h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.fromUser ? "justify-end" : "justify-start"
              } mb-2 items-center`}
            >
              {!msg.fromUser && (
                <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden mr-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXzTs9Mwb6P68e3P6SPmA-Vx1qaKcCFvvjQ&s"
                    alt="AI Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Referência para rolar automaticamente */}
              <div ref={messagesEndRef} />
              <div
                className={`flex flex max-w-[75%] ${
                  msg.fromUser
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300 text-black"
                } rounded-lg p-3 gap-3`}
              >
                {msg.isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>

              {msg.fromUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ml-2">
                  <img
                    src="https://storage.googleapis.com/support-forums-api/avatar/profile-67814438-6910661730522761562.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input - FIXADO NA BASE */}
        <div className="sticky bottom-0 bg-white w-full p-4  border-gray-300">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <input
              className="bg-gray-200 py-3 w-full rounded-full text-gray placeholder-gray-400 p-6"
              type="text"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-white rounded-3xl shadow-sm dark:bg-gray-900 m-2">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            {/* Logo */}
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/43-512.png"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white">
                AskPdf
              </span>
            </a>

            {/* Ícones Sociais */}
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.linkedin.com/in/vitordiamantino/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800 transition duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vitor.diamantino/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition duration-300" />
                </a>
              </li>
            </ul>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />

          {/* Copyright */}
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Vitor Diamantino
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
