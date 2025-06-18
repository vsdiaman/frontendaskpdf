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
import BackButton from "../components/BackButton.js";

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
      <div className="flex-1 flex flex-col h-full p-4 bg-white rounded-3xl shadow-sm ">
        {/* Chat Header */}
        <header className="bg-white p-2 sm:p-4 text-gray-100">
          <h1 className="mb-2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Acessoria inteligente
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
                className={`flex flex max-w-[65%] p-4 ${
                  msg.fromUser
                    ? "border-solid border-[1px] bg-gray-50 text-black font-mono"
                    : "text-black text-justify leading-relaxed tracking-normal font-mono"
                } rounded-full p-3 gap-3`}
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
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ml-2 font-mono">
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

        {/* Message Input */}
        <form /* ← mudou de <div> para <form> */
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 px-4 py-2 bg-white border-t"
        >
          <input
            type="text"
            placeholder="Digite sua dúvida jurídica..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none"
          />

          <button
            type="submit" /* ← importante! */
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-1 rounded-full"
          >
            Enviar
          </button>
        </form>
      </div>
      <BackButton />
      {/* Footer */}
      <footer className="flex items-center justify-between bg-white text-gray-500 text-xs p-2 mt-1 rounded-lg shadow-inner">
        <span>© 2025 Doutora.IA</span>
        <div className="flex space-x-2">
          <a
            href="https://linkedin.com/in/vitordiamantino"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/vitor.diamantino"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
