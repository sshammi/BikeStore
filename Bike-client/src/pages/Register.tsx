/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "@/schema/RegistationSchema";
import { Cloudinary } from "@cloudinary/url-gen";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [addUserMutation, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("pexels-giorgio-de-angelis-482403-1413412_msahdk").toURL();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Registering...");

    try {
      await addUserMutation(data).unwrap();
      toast.success("User registered successfully!", { id: toastId });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed", { id: toastId });
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
          <h2 className="text-4xl font-semibold text-[#3C2A20] text-center">Create Account</h2>

          <div>
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`w-full bg-white/20 text-[#3C2A20] placeholder-[#3C2A20] focus:outline-none border ${
                errors.name ? "border-red-400" : "border-white/50"
              }`}
            />
            {errors.name && (
              <span className="text-red-300 text-sm">{errors.name.message?.toString()}</span>
            )}
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
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 flex gap-3 items-center justify-center">
          <p className="text-white">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-950 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
