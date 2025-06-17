import { useState } from "react";
import logo from "../images/doutora.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { Scale } from "lucide-react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 border-gray-200 px-3 lg:px-6 py-6 dark:bg-gray-800 bg-white/30 backdrop-blur-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo Doutora IA"
              className="h-20 sm:h-16 w-auto"
            />
            <span className="self-center text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              <span className="text-indigo-600 dark:text-indigo-400">
                Doutora
              </span>
              <span className="text-pink-600 dark:text-pink-400">.IA</span>
            </span>
          </a>

          <div className="flex items-center lg:order-2 font-bold">
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium border border-bg-primary-700 rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Entrar
            </a>
            <a
              href="#"
              className="text-white font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] hover:shadow-lg hover:shadow-[#FC00FF]/50"
            >
              Começar Agora
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Preços
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Home;
