import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Main from "./components/Main";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento de recursos
    setTimeout(() => setLoading(false), 2000); // Dura 1 segundo
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/main" element={<Main />} />;
          <Route path="/chat" element={<ChatPage />} />;
        </Routes>
      )}
    </Router>
  );
}

export default App;
