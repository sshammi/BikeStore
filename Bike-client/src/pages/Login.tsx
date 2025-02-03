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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data :any) => {
    const toastId = toast.loading("Logging in...");

    try {
      const response = await loginMutation(data).unwrap();
      // console.log(response);

      const user = verifyToken(response.data.token);

      dispatch(setUser({ user:user, token: response.data.token }));

      toast.success("Logged in successfully!", { id: toastId });
      navigate("/");
    } catch (error : any) {
      toast.error(error.data?.message || "Login failed", { id: toastId });
      //console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <div>
          <Input type="email" placeholder="Email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>}
        </div>

        <div>
          <Input type="password" placeholder="Password" {...register("password")} className={errors.password ? "border-red-500" : ""} />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
