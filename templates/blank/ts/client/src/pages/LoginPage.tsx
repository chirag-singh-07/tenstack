import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { loginUser, loading } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted:", data);
    await loginUser(data, navigate);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-20 right-20 w-[200px] h-[200px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md text-center z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          <span className="text-gray-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Welcome Back
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-400 font-light">
          Login to access your account and continue building amazing apps.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative text-left">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full px-4 py-3 text-base text-gray-300 bg-white/5 border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050505]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative text-left">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full px-4 py-3 text-base text-gray-300 bg-white/5 border ${
                errors.password ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#050505]`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full px-6 py-6 cursor-pointer text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all"
          >
          {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-500 hover:underline hover:text-purple-400 transition-all"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
