/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  
  // Get user email from Redux state
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
      newPassword
    };
    console.log(passwordData);
    changePassword(passwordData)
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        navigate("/dashboard-user"); // Redirect after success
      })
      .catch(() => {
        toast.error("Failed to change password.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center sm:text-left">Change Password</h2>

      <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
        <p><strong>Email:</strong> {userEmail || "No email available"}</p>

        {/* Password Change Form */}
        <div className="mt-4">
          <div className="mb-4">
            <label className="block font-semibold">Old Password:</label>
            <input
              type="password"
              className="w-full p-2 mt-2 border rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">New Password:</label>
            <input
              type="password"
              className="w-full p-2 mt-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button" // Using type="button" instead of type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleChangePassword}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
