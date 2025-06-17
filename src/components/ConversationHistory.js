// components/ConversationHistory.js
import React from "react";

const conversationsMock = [
  {
    id: "1",
    title: "Contrato de Aluguel",
    date: "2025-06-12",
  },
  {
    id: "2",
    title: "Petição Inicial",
    date: "2025-06-10",
  },
  {
    id: "3",
    title: "Extrato Bancário",
    date: "2025-06-09",
  },
];

const ConversationHistory = ({ onSelect, currentConversation }) => {
  return (
    <div className="text-gray-800">
      <div className="mb-4">
        <h2 className="text-center text-lg font-semibold mt-2">Conversas</h2>
      </div>

      {/* Conversa atual (não muda) */}
      {currentConversation && (
        <div className="mb-4 bg-white border border-purple-300 p-3 rounded-lg shadow-sm">
          <p className="font-semibold text-purple-700">Conversa Atual:</p>
          <p className="font-medium">{currentConversation.title}</p>
          <p className="text-sm text-gray-500">{currentConversation.date}</p>
        </div>
      )}

      <ul className="space-y-3">
        {conversationsMock.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className="cursor-pointer bg-gray-100 hover:bg-purple-100 p-3 rounded-lg transition"
          >
            <p className="font-medium">{conversation.title}</p>
            <p className="text-sm text-gray-500">{conversation.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistory;
