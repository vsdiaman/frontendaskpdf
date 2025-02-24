import React from "react";
import Header from "../components/Header.js";
import Layout from "../components/Layout.js";
import { Linkedin, Instagram } from "lucide-react";
import FAQSection from "../components/FAQSection.js";
const Home = () => {
  return (
    <>
      <Header />
      <Layout />
      <FAQSection />
      <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-wrap items-center justify-between text-center md:text-left">
          {/* Texto e Direitos Autorais */}
          <span className="text-sm text-gray-500 dark:text-gray-400 w-full md:w-auto mb-4 md:mb-0">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              AskPDF™
            </a>
            &nbsp; •&nbsp;
            <a>All Rights Reserved.</a>
          </span>

          {/* Ícones Sociais */}
          <ul className="flex justify-center md:justify-end space-x-4 w-full md:w-auto">
            <li>
              <a
                href="https://www.linkedin.com/in/vitordiamantino/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800 transition duration-300" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/vitor.diamantino/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition duration-300" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Home;
