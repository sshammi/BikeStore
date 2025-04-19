import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { FaBicycle, FaLeaf, FaStar, FaUsers } from 'react-icons/fa';
import { FaMountain, FaCogs, FaHeadset, FaRecycle } from 'react-icons/fa';
const About = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dlsfq2s3m' } });
  const img1 = cld.image('offer3_uhetub').format('auto').quality('auto');
  const img2 = cld.image('offer2_jehcvs').format('auto').quality('auto');
  const img3 = cld.image('bike-909690_1920_laqx21').format('auto').quality('auto');

  return (
    <div className=" py-16 px-8 sm:px-12 lg:px-16 min-h-screen">
     <div className="flex justify-center mb-12 mt-4">
  <AdvancedImage cldImg={img3} className="w-2/3 max-w-7xl h-[500px] object-cover " />
</div>
      <div className="max-w-7xl mx-auto">
         {/* Our Story Section */}
        <section className=" pb-16 mb-20 mt-12">
          <h2 className="text-4xl font-semibold text-center mb-6">Our Story</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            Founded with a passion for cycling, <strong className="underline">Bike Store</strong> has grown into a community-driven hub that offers cyclists the best products and services. We believe cycling is more than just a way to get around—it’s a lifestyle that brings people together.
          </p>
        </section>


        {/* Why Choose Us */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Why Choose Us?</h2>
            <div className="flex items-center gap-6 mb-6">
              <FaBicycle className="text-gray-700 text-4xl" />
              <p className="text-lg">Wide Selection: Explore a range of bikes designed for every adventure.</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <FaStar className="text-gray-700 text-4xl" />
              <p className="text-lg">Premium Quality: We offer top brands and durable products to ensure the best ride.</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <FaUsers className="text-gray-700 text-4xl" />
              <p className="text-lg">Expert Support: Our experienced team is always available to help you find the right bike.</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <FaLeaf className="text-gray-700 text-4xl" />
              <p className="text-lg">Sustainability: We’re passionate about eco-friendly products and practices.</p>
            </div>
          </div>

          <div className="relative">
            <AdvancedImage cldImg={img1} className="w-full h-full object-cover  hover:scale-105 transition-transform duration-500" />
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <AdvancedImage cldImg={img2} className="w-full h-full object-cover  hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="space-y-6">
  <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Our Speciality</h2>
  <div className="flex items-center gap-6 mb-6">
    <FaMountain className="text-gray-800 text-4xl" />
    <p className="text-lg">Wide Selection: Explore a range of bikes designed for every adventure.</p>
  </div>
  <div className="flex items-center gap-6 mb-6">
    <FaCogs className="text-gray-800 text-4xl" />
    <p className="text-lg">Premium Quality: We offer top brands and durable products to ensure the best ride.</p>
  </div>
  <div className="flex items-center gap-6 mb-6">
    <FaHeadset className="text-gray-800 text-4xl" />
    <p className="text-lg">Expert Support: Our experienced team is always available to help you find the right bike.</p>
  </div>
  <div className="flex items-center gap-6 mb-6">
    <FaRecycle className="text-gray-800 text-4xl" />
    <p className="text-lg">Sustainability: We’re passionate about eco-friendly products and practices.</p>
  </div>
</div>


        </section>
        
         {/* Our Mission Section */}
         <section className="bg-green-50 py-16 mb-20  mt-12 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 text-center">
            At <strong className="text-blue-600">Bike Store</strong>, we aim to transform your cycling experience. We are committed to bringing you premium-quality bikes, accessories, and a service-driven community.
          </p>
        </section>

        {/* Join the Ride Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Join the Ride!</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Whether you're a casual cyclist or an enthusiast, we're here to help you take your ride to the next level. Explore our bikes and accessories designed for all riders!
          </p>
          <a
            href="/products"
            className="bg-[#205781] text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
