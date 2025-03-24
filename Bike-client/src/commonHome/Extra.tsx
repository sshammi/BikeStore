import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Emily Johnson",
      feedback: "Amazing bike quality and top-notch customer service. Highly recommend!",
      rating: 5
    },
    {
      name: "Michael Smith",
      feedback: "Fast shipping and great pricing. The bike rides smoothly!",
      rating: 5
    },
    {
      name: "Sophia Lee",
      feedback: "Had an issue with the size, but the return process was super easy!",
      rating: 4.5
    },
    {
      name: "James Anderson",
      feedback: "Best cycling store I’ve come across. Will buy again!",
      rating: 5
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto text-center my-7">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-xl shadow-lg ">
              <div className="flex justify-center mb-2 text-yellow-500">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {review.rating % 1 !== 0 && <FaStar className="opacity-50" />}
              </div>
              <p className="italic text-gray-700">"{review.feedback}"</p>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
