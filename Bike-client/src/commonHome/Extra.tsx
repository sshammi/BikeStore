const Testimonials = () => {
  return (
    <section className="p-6 mx[15%]">
        <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 items-center justify-center text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Sadia Rahman</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              I’ve been using this bike for a month — it’s super smooth and stylish. Would definitely recommend it for daily use.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Mehedi Hasan</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              Great value for the price. The performance is solid and the frame feels sturdy. A minor issue with seat comfort, though.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Wasif </p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              I’ve been using this bike for a month — it’s super smooth and stylish. Would definitely recommend it for daily use.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Niloy</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              Great value for the price. The performance is solid and the frame feels sturdy. A minor issue with seat comfort, though.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
