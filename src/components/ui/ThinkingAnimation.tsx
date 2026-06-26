import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

export default function ThinkingAnimation() {
  const [showSecondaryText, setShowSecondaryText] = useState(false);

  useEffect(() => {
    // Reveal second subtext after 1.5 seconds for dramatic build up
    const timer = setTimeout(() => {
      setShowSecondaryText(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center relative py-12 px-6 liquid-glass rounded-2xl border border-white/10">
      
      {/* Animated Scanning Laser Line Over Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d2ff]/40 to-transparent absolute top-0 left-0 animate-scan shadow-[0_0_10px_#00d2ff]" />
        {/* Subtle holographic background texture */}
        <div className="w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] absolute inset-0 opacity-45" />
      </div>

      {/* Center Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative animate-pulse">
          <Sparkles className="w-6 h-6 text-[#00d2ff] animate-spin-slow" />
        </div>
        {/* Pulsing rings around icon */}
        <div className="absolute inset-0 rounded-full border border-[#00d2ff]/20 animate-ping opacity-30" />
      </div>

      {/* Principal status label */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <span className="text-white/80 font-semibold tracking-normal text-lg block mb-2">
          Contacting Mission Control
        </span>
        <span className="text-white/30 text-xs tracking-widest uppercase block animate-pulse">
          Analyzing crisis signals...
        </span>
      </motion.div>

      {/* Secondary message timing */}
      <AnimatePresence>
        {showSecondaryText && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-center"
          >
            <span className="text-white/50 text-sm font-medium tracking-normal block">
              Formulating step-by-step counter-measures...
            </span>
            <span className="text-xs text-[#00d2ff]/60 font-mono mt-1.5 block">
              Building custom rescue plan
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staggered Pulsing Dots */}
      <div className="flex items-center gap-1.5 mt-8">
        <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/70 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#3D81E3] animate-bounce" />
      </div>

    </div>
  );
}
