const Footer = () => {
  return (
    <footer
      className="w-full bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-t border-gray-700 backdrop-blur-lg text-gray-300 px-6 py-6 shadow-inner  relative z-50
      before:content-[''] before:absolute before:inset-0  before:shadow-[0_0_30px_#a855f7] before:blur-xl before:opacity-20 before:z-[-1]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]">
          TenStack
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 mt-2 md:mt-0">
          © {new Date().getFullYear()} tenStack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
