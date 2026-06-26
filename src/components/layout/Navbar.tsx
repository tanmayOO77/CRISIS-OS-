import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 h-14 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/10 flex items-center z-50 px-6 justify-between select-none"
    >
      {/* Left: Logo + Wordmark */}
      <Link id="nav-brand-link" to="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-white/20 transition-all">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white tracking-tight text-base group-hover:text-white/80 transition-colors">
          Crisis OS
        </span>
      </Link>

      {/* Center Links (Desktop only) */}
      <nav id="nav-center-menu" className="hidden md:flex items-center gap-8">
        <Link
          id="nav-how-it-works"
          to="/how-it-works"
          className="text-white/60 text-sm font-medium hover:text-white transition-colors"
        >
          How It Works
        </Link>
        <Link
          id="nav-about"
          to="/about"
          className="text-white/60 text-sm font-medium hover:text-white transition-colors"
        >
          About
        </Link>
      </nav>

      {/* Right side launch CTA */}
      <div id="nav-right" className="flex items-center gap-3">
        <button
          id="nav-launch-btn"
          onClick={() => navigate("/app")}
          className="rounded-full bg-white text-black text-xs font-semibold px-4 py-2 hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
        >
          Launch Command Center
        </button>
      </div>
    </motion.header>
  );
}
