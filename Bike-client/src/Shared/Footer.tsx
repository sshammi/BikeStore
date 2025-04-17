import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#39291C] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3">BikeStore</h2>
          <p className="text-gray-300">
            Your trusted destination for the best bikes. Ride with confidence and explore our vast collection today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-300 transition">Products</Link></li>
            <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="p-2 bg-white text-[#39291C] rounded-full hover:bg-gray-200 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-2 bg-white text-[#39291C] rounded-full hover:bg-gray-200 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="p-2 bg-white text-[#39291C] rounded-full hover:bg-gray-200 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="p-2 bg-white text-[#39291C] rounded-full hover:bg-gray-200 transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-300 mt-8 border-t border-gray-500 pt-4">
        <p>© {new Date().getFullYear()} BikeStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
