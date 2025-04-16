import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large Background Glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[200px] animate-pulse" />

        {/* Center Soft Glow */}
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-50" />

        {/* Smaller Sub Glow */}
        <div className="absolute bottom-20 right-20 w-[200px] h-[200px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl text-center z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          <span className="text-gray-200">Oops! Page not found.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 font-light">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="px-6 py-4 cursor-pointer text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all"
            >
              Go Back
              <ArrowLeft className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
