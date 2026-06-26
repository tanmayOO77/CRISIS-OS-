import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Shield, Hammer, Cpu, Layers } from "lucide-react";

export default function AboutPage() {
  const navigate = useNavigate();

  const techStack = [
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Framer Motion",
    "Google Gemini API",
    "Express Node Host",
    "Vite",
  ];

  return (
    <div id="about-page" className="min-h-screen bg-[#0c0c0c] text-white pt-28 pb-20 px-6">
      
      {/* Decorative vertical lines */}
      <div className="hidden lg:block fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />
      <div className="hidden lg:block fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Hero Title */}
        <div className="text-left mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#00d2ff] uppercase font-bold block mb-2">
            SYSTEM CONTEXT
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            Built for the moment.
          </h1>
          <p className="text-white/50 text-sm max-w-md">
            Our mission is simple: eliminate executive decision paralysis when timescales compress.
          </p>
        </div>

        {/* Dual Split Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Left panel: The Problem */}
          <div className="liquid-glass rounded-2xl p-8 border border-white/5 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
              THE PROBLEM
            </span>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Information Floods
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-normal">
              High-pressure moments demand surgical action, not reading volumes.
              Most chatbots dump paragraphs of generic suggestions when you have the least mental capacity to sort through them. Focus is lost in the noise.
            </p>
          </div>

          {/* Right panel: The Solution */}
          <div className="liquid-glass rounded-2xl p-8 border border-white/5 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#28c840] uppercase">
              THE APPROACH
            </span>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Modular Execution
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-normal">
              We collapse the feedback loop into one single interaction. One input text resolves directly into a pristine dashboard containing isolated indicators, hourly tasks, and focused priority indices.
            </p>
          </div>

        </div>

        {/* Tech Stack Segment */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-[#00d2ff]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/40">
              SYSTEM INFRASTRUCTURE
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.01] hover:border-white/15 text-xs text-white/60 hover:text-white font-mono cursor-default transition-all select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Massive Centered Launch CTA */}
        <div className="mt-20 text-center border-t border-white/5 pt-16 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mb-6">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
            Ready to deploy counter-measures?
          </h2>
          <p className="text-white/40 text-xs max-w-sm mb-6 leading-relaxed">
            Configure your tactical response and regain complete cognitive control. No account credentials required.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/app")}
            className="rounded-full bg-white text-black px-8 py-3.5 font-bold text-sm cursor-pointer shadow-lg hover:bg-white/95 transition-all"
          >
            Launch Crisis OS
          </motion.button>
        </div>

      </div>

    </div>
  );
}
