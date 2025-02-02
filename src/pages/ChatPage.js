import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPdfList, uploadFile } from "../redux/actions/fileActions";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react"; // Ícone da seta
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ChatPage = () => {
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

  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(
    initialFileUrl || fileUrl
  );
  const [uploadedPdfId, setUploadedPdfId] = useState(initialPdfId || pdfId);

  const pdfjsVersion = "2.16.105";

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

    try {
      const response = await axios.post(
        "http://localhost:4000/chat/completion",
        {
          pdfText,
          question: inputValue,
        }
      );

      console.log("📄 Resposta do chat:", response.data);
    } catch (error) {
      console.error("❌ Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden p-4">
      {/* Sidebar */}
      <div className="w-2/4 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 flex justify-start items-center bg-indigo-600 text-white">
          {/* Seta para voltar */}
          <button onClick={() => navigate("/")} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Ask Pdf</h1>
          <div className="relative"></div>
        </header>
        <div className="p-4">
          {isUploading ? (
            <p>Uploading...</p>
          ) : uploadedPdfUrl ? (
            <>
              <div style={{ height: "80vh" }}>
                <div className="p-4">
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 p-3 rounded-md mb-2"
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>No content available. Please upload a PDF.</p>
                  )}
                </div>

                {/* <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={uploadedPdfUrl} />
                </Worker> */}
              </div>
              {/* <p>PDF ID: {uploadedPdfId}</p> */}
            </>
          ) : (
            <div>No PDF available. Please upload a file.</div>
          )}
        </div>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full p-4">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Faça uma pergunta...</h1>
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
              <div
                className={`flex max-w-max ${
                  msg.fromUser
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300 text-black"
                } rounded-lg p-3 gap-3`}
              >
                <p>{msg.text}</p>
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
        <div className="sticky bottom-0 bg-white w-full p-2 border-t border-gray-300">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <input
              className="bg-gray-200 py-3 w-full rounded-full text-gray placeholder-gray-400 px-2.5"
              type="text"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
