import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

  const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 transition-all duration-300">
      <div className="navbar flex justify-between items-center px-6 py-3">
        {/* TITLE */}
        <NavLink
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          <img src="/logo.png" alt="Logo" className="h-10 w-auto"/>
        </NavLink>
        {/* CENTER: Nav Links */}
        <div className="navbar-center flex-grow flex justify-center">
          <ul className="flex space-x-6">
            <NavLinks />
          </ul>
        </div>
        {/* MENU */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE BUTTON */}
          <button
            className="p-2 rounded-full transition-colors"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <BsSunFill className="h-6 w-6 text-yellow-400" />
            ) : (
              <BsMoonFill className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            )}
          </button>

          {/* CART LINK */}
          <NavLink to="/cart" className="relative">
            <BsCart3 className="h-6 w-6 text-gray-800 dark:text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
              {numItemsInCart}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
