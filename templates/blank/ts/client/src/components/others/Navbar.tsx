import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    // window.location.reload(); // Reload the page to reflect the logout
  };

  return (
    <nav
      className="w-full bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-b border-gray-700 backdrop-blur-lg text-white px-6 py-4 flex items-center justify-between shadow-lg  relative z-50 
    before:content-[''] before:absolute before:inset-0 before:rounded-b-xl before:shadow-[0_0_30px_#a855f7] before:blur-xl before:opacity-20 before:z-[-1]"
    >
      {/* Logo */}
      <div className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]">
        <Link to="/">TenStack</Link>
      </div>

      {/* Navigation Links */}

      {user ? (
        <div className="flex items-center gap-5">
          {/* User Info */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 shadow-inner">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white font-semibold">
              {user?.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-full hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-pink-500/40"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-6 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg border border-transparent hover:border-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-pink-500/50">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 text-base font-medium bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-pink-500 hover:text-white hover:bg-gray-800/40 transition-all duration-300 shadow-md hover:shadow-pink-500/40">
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
