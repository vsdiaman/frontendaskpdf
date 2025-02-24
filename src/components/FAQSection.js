import { useState } from "react";

const faqs = [
  {
    question: "Como funciona o chat com PDF?",
    answer:
      "Basta fazer o upload do seu documento e nossa IA analisará o conteúdo. Depois, você pode fazer perguntas e receber respostas baseadas no arquivo enviado.",
  },
  {
    question: "Meus documentos são seguros?",
    answer:
      "Sim! Garantimos a segurança dos seus arquivos. O processamento é feito com criptografia e não armazenamos seus dados permanentemente.",
  },
  {
    question: "Quais tipos de arquivos posso enviar?",
    answer:
      "Atualmente, aceitamos arquivos PDF. Em breve, adicionaremos suporte para outros formatos de documentos.",
  },
  {
    question: "O serviço é gratuito?",
    answer:
      "Oferecemos um plano gratuito com algumas limitações. Para uso ilimitado e recursos extras, confira nosso plano Hobby.",
  },
  {
    question: "Posso usar a IA para documentos longos?",
    answer:
      "Sim! Nossa IA processa documentos extensos, permitindo buscas rápidas por informações específicas.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">
        Perguntas Frequentes 🤔
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg font-semibold"
            >
              {faq.question}
              <span className="text-blue-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
