/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { FaEnvelope, FaLock } from "react-icons/fa";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  const userEmail = useSelector((state: any) => state.auth.user?.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    const passwordData = {
      email: userEmail,
      oldPassword,
      newPassword,
    };

    changePassword(passwordData)
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        navigate("/dashboard-user");
      })
      .catch(() => {
        toast.error("Failed to change password.");
      });
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#3C2A20]">Change Password</h1>

        <div className="space-y-4">
          {/* Email (read-only) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              value={userEmail || "No email available"}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Old Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaLock className="mr-2" /> Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaLock className="mr-2" /> New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
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

export default ChangePassword;
