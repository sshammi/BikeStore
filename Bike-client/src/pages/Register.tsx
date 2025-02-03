import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner"; // For notifications
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { registrationSchema } from "@/schema/RegistationSchema";


const RegisterPage = () => {
  const [addUserMutation, { isLoading }] = useAddUserMutation(); // Correct mutation usage
  const navigate = useNavigate(); // For navigation

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit:SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...");

    try {
      const response = await addUserMutation(data).unwrap(); // Unwrap for error handling
      toast.success("User registered successfully!", { id: toastId });
      console.log("User registered:", response);
      
      // Navigate to home page after successful registration
      navigate("/login"); // Redirect to the homepage
    } catch (error) {
      toast.error(error.data?.message || "Registration failed", { id: toastId });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold text-center">Register</h2>

        <div>
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
         {errors.password && <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
