import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/main")}
      className="mt-4 px-4 py-2 rounded-full bg-gradient-to-br from-[#0083FE] to-[#00FFF0] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#0083FE]/50"
    >
      Quer enviar outro PDF? Clique aqui
    </button>
  );
};

export default BackButton;
