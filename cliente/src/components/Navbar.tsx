import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-black to-purple-800 p-4" data-testid='navbar'>
      {/* Logo */}
      <Link to="/catalogo" data-testid='linkLogo'>
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
      </Link>

      {/* Links */}
      <div className="flex space-x-6 text-white font-semibold">
        <Link to="/catalogo" className="hover:underline">
          Catalogo
        </Link>
        <Link to="/ayuda" className="hover:underline">
          Ayuda
        </Link>
      </div>

      {/* User Icon */}
      <Link to="/login">
        <FaUserCircle className="text-white text-2xl" />
      </Link>
    </nav>
  );
};

export default Navbar;
