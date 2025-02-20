import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Main from "./components/Main";
import "./App.css";
import Loader from "./components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento de recursos
    setTimeout(() => setLoading(false), 3000); // Dura 1 segundo
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />;
          <Route path="/chat" element={<ChatPage />} />;
        </Routes>
      )}
    </Router>
  );
}

export default App;
