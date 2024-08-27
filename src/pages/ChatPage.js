import React, { useEffect, useState } from "react";
import { fetchPdfList, uploadFile } from "../redux/actions/fileActions";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ChatPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { fileUrl: initialFileUrl, pdfId: initialPdfId } = location.state || {};
  const { fileUrl, pdfId, uploading, error } = useSelector(
    (state) => state.file
  );
  const [isUploading, setIsUploading] = useState(uploading);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(
    initialFileUrl || fileUrl
  );
  const [uploadedPdfId, setUploadedPdfId] = useState(initialPdfId || pdfId);

  const pdfjsVersion = "2.16.105";

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
        // Atualiza o estado com a URL e o ID do PDF
        setUploadedPdfUrl(result.fileUrl);
        setUploadedPdfId(result.pdfId);
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
      } finally {
        setIsUploading(false);
      }
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-2/4 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 flex justify-start items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Zing Chat</h1>
          <div className="relative"></div>
        </header>
        <div className="p-4">
          {isUploading ? (
            <p>Uploading...</p>
          ) : uploadedPdfUrl ? (
            <>
              <div style={{ height: "80vh" }}>
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={uploadedPdfUrl} />
                </Worker>
              </div>
              <p>PDF ID: {uploadedPdfId}</p>
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
      <div className="flex-1">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Chat</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">Hey Bob, how's it going?</p>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                Hi Alice! I'm good, just finished a great book. How about you?
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                That book sounds interesting! What's it about?
              </p>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                It's about an astronaut stranded on Mars, trying to survive.
                Gripping stuff!
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                That book sounds interesting! What's it about?
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                It's about an astronaut stranded on Mars, trying to survive.
                Gripping stuff!
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                That book sounds interesting! What's it about?
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                It's about an astronaut stranded on Mars, trying to survive.
                Gripping stuff!
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* Continue adding more messages similarly */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
