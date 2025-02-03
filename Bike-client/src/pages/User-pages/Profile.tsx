import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";  // Adjust the import path as necessary
import { useNavigate } from "react-router";


const CustomerProfilePage = () => {
  // Fetch customer data from the Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate=useNavigate();
  // Check if user data is available
  if (!user) {
    return <div className="text-center">No user found. Please log in.</div>;
  }

  const handleChangePassword = () => {
    navigate('/dashboard-user/change-password')
    console.log("Redirecting to change password page...");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Customer Profile</h2>

        {/* Customer Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user.email || "No Email"}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100"
          />
        </div>

        {/* Change Password Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleChangePassword}
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </div>

        {/* Optional: Link to logout */}
       
      </div>
    </div>
  );
};

export default CustomerProfilePage;
