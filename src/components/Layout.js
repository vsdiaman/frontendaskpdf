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
      navigate("/main"); // Redireciona para "/"
    }, 1000); // Simula carregamento por 1s
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
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-36">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
          >
            Resumos e respostas instantâneas direto do seu PDF.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true"></span>Read
              more <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-9xl font-semibold tracking-normal text-gray-900 leading-none"
          >
            Estude de forma inteligente
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-lg font-medium text-gray-500 sm:text-xl"
          >
            Transforme seus materiais em um chat interativo. Faça perguntas e
            obtenha respostas precisas sem perder tempo procurando informações.
          </motion.p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {isLoading && <Loader />} {/* Mostra o loader enquanto carrega */}
              <button
                onClick={handleClick}
                disabled={isLoading}
                className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-lg font-semibold text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-bold"
              >
                <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-transparent group-hover:dark:bg-transparent">
                  {isLoading ? "Carregando..." : "Experimente, é grátis."}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isVisible ? { opacity: 0.3, scale: 1 } : { opacity: 0.3, scale: 1 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </motion.div>
      <section className="py-16 px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-6"
        >
          Veja Como Funciona na Prática! 👀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg font-medium text-gray-600 sm:text-xl text-center max-w-3xl p-8"
        >
          Uma interface simples e intuitiva para transformar PDFs em respostas
          instantâneas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 relative max-w-7xl w-full"
        >
          <img
            src={interfaceImage}
            alt="Interface da aplicação"
            className="w-full rounded-3xl shadow-lg"
          />
        </motion.div>
      </section>
      <section className="py-6 px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center mb-12 p-8"
        >
          Transforme PDFs em Conhecimento Instantâneo!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 text-lg font-medium text-gray-500 sm:text-xl text-center"
        >
          Explore recursos de IA que otimizam fluxos de trabalho, aumentam a
          produtividade e simplificam a tomada de decisões para obter melhores
          resultados.
        </motion.p>

        <div className="max-w-5xl space-y-16 p-12 relative">
          {/* Benefício 1 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-2/3 bg-white p-6 rounded-2xl shadow-lg ml-auto"
          >
            <h3 className="text-xl font-semibold mb-3">
              📄 Faça Upload de PDFs
            </h3>
            <p className="text-gray-600">
              Envie seus documentos e deixe nossa IA processar todo o conteúdo
              rapidamente.
            </p>
          </motion.div>

          {/* Benefício 2 (deslocado para esquerda) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-3/4 bg-white p-6 rounded-2xl shadow-lg mr-auto mt-[-20px]"
          >
            <h3 className="text-xl font-semibold mb-3">🤖 Pergunte à IA</h3>
            <p className="text-gray-600">
              Interaja com a IA e receba respostas precisas baseadas no conteúdo
              do seu documento.
            </p>
          </motion.div>

          {/* Benefício 3 (deslocado para direita) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-1/2 bg-white p-6 rounded-2xl shadow-lg ml-auto mt-[-20px]"
          >
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Obtenha Respostas Rápidas
            </h3>
            <p className="text-gray-600">
              Acesse informações importantes sem precisar ler o documento
              inteiro.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-6 flex flex-col items-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-6"
        >
          Diga Adeus à Leitura Manual! 📚🚀
        </motion.h2>

        {/* Parágrafo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg font-medium text-gray-600 sm:text-xl text-center max-w-3xl"
        >
          Transforme documentos em respostas instantâneas com inteligência
          artificial. Simples, rápido e eficiente!
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              📂 Upload Instantâneo
            </h3>
            <p className="text-gray-600">
              Carregue seus PDFs em segundos e tenha acesso às informações
              rapidamente.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3">💡 IA Inteligente</h3>
            <p className="text-gray-600">
              Obtenha respostas precisas e relevantes, sem precisar procurar
              manualmente.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Acelere Seu Trabalho
            </h3>
            <p className="text-gray-600">
              Poupe tempo e concentre-se no que realmente importa, deixando a IA
              trabalhar por você.
            </p>
          </motion.div>
        </div>

        {/* Botão */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-500 transition"
        >
          Experimente Agora 🚀
        </motion.button>
      </section>
      ;
      <Pricing />
    </div>
  );
};

export default Layout;
