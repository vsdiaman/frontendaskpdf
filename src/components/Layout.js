import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import interfaceImage from "../images/page.png";
import Pricing from "../components/Pricing";
import { motion } from "framer-motion";

const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/main");
    }, 1000);
  };

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="px-6 lg:px-8 z-0">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-36 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full text-center text-5xl sm:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Sua Advogada Virtual de Confiança
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
        >
          A Doutora.IA é a assistente jurídica pensada para quem mais precisa.
          Com linguagem simples e direta, ela explica contratos, orienta sobre
          causas e ajuda a evitar golpes e decisões erradas.
        </motion.p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <motion.button
            onClick={handleClick}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition"
          >
            {isLoading ? "Carregando..." : "Comece Agora, é Grátis!"}
          </motion.button>
        </div>
      </div>

      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-4"
        >
          Quem pode usar a Doutora.IA?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Qualquer pessoa! Mas ela foi feita especialmente para idosos,
          microempreendedores e cidadãos comuns que precisam de ajuda jurídica
          clara, segura e imediata.
        </motion.p>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">
            📄 Analisa Documentos Jurídicos
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Basta subir um contrato ou petição em PDF e a Doutora.IA explicará
            os pontos importantes em linguagem acessível.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">🤝 Orienta e Protege</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Receba instruções práticas sobre seus direitos, documentos
            necessários e próximos passos para cada tipo de situação.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-6"
        >
          Segurança Jurídica ao Alcance de Todos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-600 text-lg max-w-3xl mx-auto"
        >
          A Doutora.IA está aqui para democratizar o acesso à informação
          jurídica, com um atendimento 100% digital, intuitivo e disponível 24h
          por dia.
        </motion.p>
      </section>

      <Pricing />
    </div>
  );
};

export default Layout;
