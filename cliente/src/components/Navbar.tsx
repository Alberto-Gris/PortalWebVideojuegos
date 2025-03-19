import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-black to-purple-800 p-4">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
      </div>

      {/* Links */}
      <div className="flex space-x-6 text-white font-semibold">
        <a href="#" className="hover:underline">
          Inicio
        </a>
        <a href="#" className="hover:underline">
          Catalogo
        </a>
        <a href="#" className="hover:underline">
          Ayuda
        </a>
      </div>

      {/* User Icon */}
      <div className="text-white text-2xl">
        <FaUserCircle />
      </div>
    </nav>
  );
};

export default Navbar;
