import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "A Doutora.IA é uma advogada de verdade?",
    answer:
      "A Doutora.IA é uma assistente virtual treinada com base em conhecimento jurídico para oferecer orientação inicial. Ela não substitui um advogado humano, mas ajuda você a entender contratos, causas e direitos de forma acessível.",
  },
  {
    question: "Posso confiar nas explicações dos contratos?",
    answer:
      "Sim. A IA foi treinada para identificar cláusulas importantes, alertar sobre riscos e traduzir juridiquês para uma linguagem clara. Mesmo assim, para decisões importantes, recomendamos consultar um profissional.",
  },
  {
    question: "Quais documentos posso enviar para a Doutora.IA?",
    answer:
      "Você pode enviar contratos de aluguel, prestação de serviços, petições, notificações, causas trabalhistas, boletins de ocorrência e muito mais — em formato PDF.",
  },
  {
    question: "A Doutora.IA pode me dizer se estou sendo enganado?",
    answer:
      "Ela pode identificar cláusulas abusivas, alertar sobre armadilhas comuns e orientar quais atitudes tomar. Mas lembre-se: o objetivo dela é educar e orientar, não julgar ou substituir o juizado.",
  },
  {
    question:
      "Como a Doutora.IA me ajuda com causas trabalhistas ou direitos do consumidor?",
    answer:
      "Ela explica seus direitos com base no documento enviado, orienta sobre como agir, quais órgãos procurar (como PROCON ou Justiça do Trabalho) e quais documentos reunir.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
        Perguntas Frequentes
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left text-xl font-semibold text-gray-900 dark:text-white"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-indigo-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
