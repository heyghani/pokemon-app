import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigation = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-title" onClick={() => navigation("/")}>
          Pokémon App
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`hidden lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="nav-menu" onClick={closeMenu}>
            Pokémon List
          </Link>
          <Link to="/my-pokemon" className="nav-menu" onClick={closeMenu}>
            My Pokémon List
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="navbar-overlay" onClick={closeMenu} />
          <div className="navbar-mobile">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="mt-16">
              <Link to="/" className="nav-menu-mobile" onClick={closeMenu}>
                Pokémon List
              </Link>
              <Link
                to="/my-pokemon"
                className="nav-menu-mobile"
                onClick={closeMenu}
              >
                My Pokémon List
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
