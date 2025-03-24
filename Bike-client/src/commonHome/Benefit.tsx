import { FaShippingFast, FaGift, FaUndo, FaShieldAlt } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    { icon: <FaShippingFast size={40} />, title: "Free Shipping", description: "Enjoy free and fast shipping on all orders." },
    { icon: <FaGift size={40} />, title: "Gift Package", description: "Beautifully packaged gifts for special occasions." },
    { icon: <FaUndo size={40} />, title: "Easy Return", description: "Hassle-free returns within 30 days." },
    { icon: <FaShieldAlt size={40} />, title: "One-Year Warranty", description: "Guaranteed quality with a one-year warranty." }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Why choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-lg text-center">
              <div className="text-gray-800 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
