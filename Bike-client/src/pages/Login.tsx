/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Cloudinary } from "@cloudinary/url-gen";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

const LoginPage = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const demoUsers = {
    user: { email: "nabila@gmail.com", password: "nabila" },
    admin: { email: "admin@gmail.com", password: "admin" },
  };

  const handleDemoLogin = (role: "user" | "admin") => {
    setValue("email", demoUsers[role].email);
    setValue("password", demoUsers[role].password);
  };

  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("pexels-giorgio-de-angelis-482403-1413412_msahdk").toURL();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await loginMutation(data).unwrap();
      const user = verifyToken(response.data.token);
      dispatch(setUser({ user, token: response.data.token }));
      toast.success("Logged in successfully!", { id: toastId });
      navigate("/");
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center flex items-center px-4 -mb-10 mt-16"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md md:ml-16 p-6 md:p-10 rounded-2xl backdrop-blur-xl bg-white/30 shadow-2xl border border-[#3C2A20]/30">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-4xl font-semibold text-[#3C2A20] text-center">Welcome Back</h2>

          <div className="flex gap-4 items-center justify-center flex-wrap">
            <Button
              type="button"
              variant="outline"
              className="bg-blue-500/30 hover:bg-blue-600/40 text-[#3C2A20] border-white px-6 rounded-xl"
              onClick={() => handleDemoLogin("user")}
            >
              Demo User
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-green-500/30 hover:bg-green-600/40 text-[#3C2A20] border-white rounded-xl"
              onClick={() => handleDemoLogin("admin")}
            >
              Demo Admin
            </Button>
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full bg-white/20 text-[#3C2A20] placeholder-[#3C2A20] focus:outline-none border ${
                errors.email ? "border-red-400" : "border-white/50"
              }`}
            />
            {errors.email && (
              <span className="text-red-300 text-sm">{errors.email.message?.toString()}</span>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full bg-white/20 text-[#3C2A20] placeholder-[#3C2A20] focus:outline-none border ${
                errors.password ? "border-red-400" : "border-white/50"
              }`}
            />
            {errors.password && (
              <span className="text-red-300 text-sm">{errors.password.message?.toString()}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1E1E1C] hover:bg-[#1E1E1C]/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Register section: only shown below on small screens */}
        <div className="mt-6 flex gap-3 items-center justify-center">
          <p className="text-white">Not registered yet?</p>
          <button
            onClick={() => navigate("/register")}
            className=" text-gray-950 font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
