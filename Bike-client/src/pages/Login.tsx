/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/schema/loginSchema";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

const LoginPage = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Demo Credentials
  const demoUsers = {
    user: { email: "nabila@gmail.com", password: "nabila" },
    admin: { email: "admin@gmail.com", password: "admin" },
  };

  // Autofill login form
  const handleDemoLogin = (role: "user" | "admin") => {
    setValue("email", demoUsers[role].email);
    setValue("password", demoUsers[role].password);
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in...");

    try {
      const response = await loginMutation(data).unwrap();
      const user = verifyToken(response.data.token);

      dispatch(setUser({ user: user, token: response.data.token }));

      toast.success("Logged in successfully!", { id: toastId });
      navigate("/");
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 w-96 p-6 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {/* Demo Login Buttons */}
        <div className="flex justify-center gap-4">
          <Button type="button" variant="outline" className="bg-blue-100 rounded hover:bg-blue-300" onClick={() => handleDemoLogin("user")}>
            Demo User
          </Button>
          <Button type="button" variant="outline" className="bg-green-100 rounded hover:bg-green-300" onClick={() => handleDemoLogin("admin")}>
            Demo Admin
          </Button>
        </div>

        {/* Email Input */}
        <div>
          <Input 
            type="email" 
            placeholder="Email" 
            {...register("email")} 
            className={`w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>}
        </div>

        {/* Password Input */}
        <div>
          <Input 
            type="password" 
            placeholder="Password" 
            {...register("password")} 
            className={`w-full ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-[#205781] rounded-xl hover:bg-blue-800" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
