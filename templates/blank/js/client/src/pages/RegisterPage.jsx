import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { registerUser, loading } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
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
      console.log("Register Data:", formData);
      await registerUser(formData, navigate);
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
        <h1 className="text-4xl font-bold">Create Your Account</h1>
        <p className="mt-4 text-lg text-gray-400">Join us and start building amazing apps today.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {["name", "email", "password"].map((field) => (
            <div key={field} className="relative text-left">
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-gray-300 bg-white/5 border ${
                  errors[field] ? "border-red-500" : "border-gray-700"
                } rounded-lg`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <Button type="submit" size="lg" className="w-full px-6 py-6 bg-indigo-500 text-white">
            {loading ? <Loader className="animate-spin" /> : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;