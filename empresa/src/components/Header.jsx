/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        // Agrega el detector de eventos cuando el componente se monta
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Limpia el detector de eventos cuando el componente se desmonta
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); 

    return (
        <div className="relative" ref={dropdownRef}> {/* Contenedor con posición relativa */}
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    </a>
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            onClick={toggleDropdown} 
                            className="text-gray-500 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-0"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Menú</span>
                            <span className="text-xl font-medium">Gestión</span> {/* Cambiado aquí */}
                        </button>
                        {/* Dropdown menu */}
                        <div
                            id="dropdownNavbar"
                            className={`${isDropdownOpen ? 'block' : 'hidden'
                                } absolute right-0 z-50 mt-2 w-44 bg-white rounded-md overflow-hidden shadow-xl`}
                        >
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Equipo
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Proyectos
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Recursos
                            </a>
                        </div>
                    </div>
                    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-multi-level">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Iniciar Sesión</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Calendario Semanal</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Atención Al Cliente</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
