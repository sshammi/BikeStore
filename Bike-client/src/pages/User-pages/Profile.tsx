import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaLock } from "react-icons/fa";

const CustomerProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="text-center text-gray-600 text-xl">No user found. Please log in.</div>
      </div>
    );
  }

  const handleChangePassword = () => {
    navigate("/dashboard-user/change-password");
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#3C2A20]">Customer Profile</h1>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaUser className="mr-2" /> Full Name
            </label>
            <input
              type="text"
              value={user.name || "Nabila"}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              value={user.email || "Nabila"}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="mr-2" /> Phone Number
            </label>
            <input
              type="text"
              value={"01707940302"}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaHome className="mr-2" /> Delivery Address
            </label>
            <textarea
              value={"Dhaka"}
              disabled
              rows={3}
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 resize-none"
            />
          </div>

          {/* Change Password Button */}
          <div className="pt-4">
            <button
              onClick={handleChangePassword}
              className="w-full flex items-center justify-center gap-2 bg-[#3C2A20] text-white py-2 rounded-xl hover:bg-[#5b4232] transition duration-300"
            >
              <FaLock /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
