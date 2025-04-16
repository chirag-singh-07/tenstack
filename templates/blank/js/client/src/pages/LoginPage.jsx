import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loginUser, loading } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      await loginUser(formData, navigate);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md text-center z-10"
      >
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="mt-4 text-lg text-gray-400">Login to access your account.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative text-left">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-gray-300 bg-white/5 border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } rounded-lg`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative text-left">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-gray-300 bg-white/5 border ${
                errors.password ? "border-red-500" : "border-gray-700"
              } rounded-lg`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full px-6 py-6 bg-indigo-500 text-white">
            {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-purple-500 hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;