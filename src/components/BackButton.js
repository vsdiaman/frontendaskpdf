import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/main")}
        className="
          inline-block
          mt-4
          bg-gradient-to-br from-[#0083FE] to-[#00FFF0]
          rounded-full
          px-6 py-2
          text-sm sm:text-base font-medium text-white
          transition duration-200
          hover:shadow-lg hover:shadow-[#0083FE]/50
        "
      >
        Quer enviar outro PDF? Clique aqui
      </button>
    </div>
  );
};

export default BackButton;
