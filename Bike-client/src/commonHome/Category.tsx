import { useNavigate } from "react-router-dom";
import { FaMotorcycle, FaMountain, FaCity } from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  { name: "Superbike", icon: <FaMotorcycle />, description: "High-performance bikes for speed lovers." },
  { name: "Adventure", icon: <FaMountain />, description: "Off-road and long-distance rides." },
  { name: "Commuter", icon: <FaCity />, description: "Efficient bikes for daily urban rides." },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Store the selected category in localStorage
    localStorage.setItem("bikeFilters", JSON.stringify(category ));

    // Navigate to the dynamic category filter page
    navigate(`/filterProduct`);
  };

  return (
    <section className="p-10 rounded-lg text-center my-7">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 rounded">
        {categories.map(({ name, icon, description }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            className="bg-green-50 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCategoryClick(name)}
          >
            <div className="text-5xl text-blue-600 mb-4 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
