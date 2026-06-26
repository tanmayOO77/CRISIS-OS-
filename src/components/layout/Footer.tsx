import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="global-footer" className="border-t border-white/10 bg-[#0c0c0c]/90 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs text-white/40">
        
        {/* Left Side: Brand & Descriptor */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/80">
            <Shield className="w-4 h-4 text-white/60" />
            <span className="font-semibold tracking-tight text-sm">Crisis OS</span>
          </div>
          <span className="text-white/40">Turn Panic Into A Plan. An AI-powered decision-making command center.</span>
        </div>

        {/* Center: Navigation Shortcuts */}
        <div id="footer-short-links" className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/app" className="hover:text-white transition-colors">Launch OS</Link>
        </div>

        {/* Right Side: Credo */}
        <div className="text-left md:text-right flex flex-col gap-1">
          <span className="text-white/60 font-medium">Built for high-pressure moments.</span>
          <span>&copy; {currentYear} Crisis OS. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
