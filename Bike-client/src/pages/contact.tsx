/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAddMessageMutation } from "@/redux/features/msg/msgApi";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";// Assuming your API file is in this path

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [addMessage, { isLoading, isSuccess, isError, error }] = useAddMessageMutation();
  const [formStatus, setFormStatus] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await addMessage(data).unwrap();
      setFormStatus("Your message has been sent successfully!");
    } catch (err) {
      setFormStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center gap-8 p-6">
  {/* Contact Information */}
  <div className="p-6 rounded-lg w-full max-w-xl mt-6 ">
      <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center mt-10">
        Contact Information
      </h2>
      <div className="flex gap-4">
        {/* Call Now Button */}
        <button className="flex items-center justify-center px-12 py-4 w-full bg-blue-200 text-gray-700 hover:bg-blue-400 rounded-xl">
            <FaPhoneAlt className="text-2xl mr-3" />
          <a href="tel:+1234567890" className="font-bold">
            Call Now
          </a>
        </button>

        {/* Email Us Button */}
        <button className="flex items-center justify-center px-12 py-4 w-full bg-green-200 text-gray-700 rounded-xl hover:bg-green-400">
            <FaEnvelope className="text-2xl mr-3" />
          <a href="mailto:support@bikestore.com" className="font-semibold">
            Email Us
          </a>
        </button>
      </div>
    </div>

  {/* Contact Form */}
  <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full max-w-xl">
    <h2 className="text-2xl font-semibold mb-4 text-center">Send us a message</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg`}
          {...register("name", { required: "Full Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
          {...register("email", { 
            required: "Email Address is required", 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-lg font-medium mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          className={`w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-lg`}
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-3 bg-[#205781] text-white rounded-xl font-semibold ${isLoading && "opacity-50 cursor-not-allowed"}`}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>

    {formStatus && <p className="mt-4 text-center">{formStatus}</p>}
  </div>
</div>


      {/* Embedded Map */}
      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9 h-[400px]">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.199357788411!2d90.39945231536088!3d23.8103047940979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b67c70bbff93%3A0x9c35f8e5824a1d44!2sSAGC%20Campus%2C%20Mawlana%20Bhashani%20Science%20and%20Technology%20University%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1653624790756!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
