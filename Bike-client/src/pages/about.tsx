import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const About = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dlsfq2s3m' } });
  const img1 = cld.image('offer1_icyr3p').format('auto').quality('auto');
  return (
    <div className="container mx-auto px-4 py-8 text-gray-700">
      <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
      <p className="text-lg mb-6 text-center">
        Welcome to <strong>Bike Store </strong>, your go-to destination for high-quality bicycles and cycling gear! 
      </p>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          At <strong>Bike Store</strong>, we believe that biking is more than just transportation—it’s a lifestyle. Our goal is to make cycling accessible, enjoyable, and sustainable for everyone by offering top-notch bikes, accessories, and services.
        </p>
      </section>

      <section className='flex'>
        <div>
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-lg mb-6">
          <li>Wide Selection: From mountain bikes to road bikes and everything in between.</li>
          <li>Premium Quality: We offer only the best brands and durable components.</li>
          <li>Expert Support: Our team is here to guide you in choosing the perfect bike.</li>
          <li>Affordable Prices: Quality rides at competitive prices.</li>
          <li>Sustainability Focus: Promoting eco-friendly mobility solutions.</li>
        </ul>
        </div>
        <AdvancedImage cldImg={img1} className="w-full h-full object-contain sm:h-[350px] lg:h-[400px]"/>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg mb-6">
          <strong>Bike Store</strong> was founded with a simple vision: to create a community where biking is more than just a mode of transport—it’s a passion. Over the years, we've grown into a trusted store that provides cyclists with the best products and services.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join the Ride!</h2>
        <p className="text-lg mb-4">
          We’re excited to be part of your cycling journey. Whether you're a beginner or an experienced rider, we’re here to help you find the perfect bike and accessories.
        </p>
        <p className="text-lg">
          🚴 <strong>Ride with us. Explore more. Live better.</strong>
        </p>
      </section>
    </div>
  );
};

export default About;
