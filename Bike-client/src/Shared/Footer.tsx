import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer=()=>{
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Company Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">BikeStore</h2>
          <p className="text-sm ">Your one-stop shop for the best bikes.</p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex space-x-6">
          <Link to="/" className=" hover:text-white">Home</Link>
          <Link to="/products" className=" hover:text-white">Products</Link>
          <Link to="/about" className=" hover:text-white">About</Link>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-xl hover:text-blue-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-blue-900" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
