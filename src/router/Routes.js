import React from "react";

import { Routes, Route } from "react-router-dom";

import ChatPage from "../pages/ChatPage";
import Main from "../pages/Main";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ChatPage} />
      <Route path="/chat" element={Main} />
    </Routes>
  );
};

export default AppRoutes;
