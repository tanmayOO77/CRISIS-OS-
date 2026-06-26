import { motion } from "motion/react";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: "cyan" | "red" | "green" | "yellow" | string;
  sublabel?: string;
}

export default function ProgressBar({ label, percentage, color, sublabel = "" }: ProgressBarProps) {
  // Map color names to Tailwind gradients / solid border classes
  let barGradient = "from-[#ff5f57] to-[#eb3b30]";
  let textClass = "text-[#ff5f57]";
  let pulseGlow = "shadow-[#ff5f57]/20";

  if (color === "cyan") {
    barGradient = "from-[#00d2ff] to-[#3D81E3]";
    textClass = "text-[#00d2ff]";
    pulseGlow = "shadow-[#00d2ff]/20";
  } else if (color === "green") {
    barGradient = "from-[#28c840] to-[#1fac33]";
    textClass = "text-[#28c840]";
    pulseGlow = "shadow-[#28c840]/20";
  } else if (color === "yellow") {
    barGradient = "from-[#febc2e] to-[#e49b13]";
    textClass = "text-[#febc2e]";
    pulseGlow = "shadow-[#febc2e]/20";
  }

  return (
    <div className="w-full">
      {/* Header labels */}
      <div className="flex items-end justify-between mb-2">
        <span className="text-white/70 text-sm font-medium tracking-wide">
          {label}
        </span>
        <span className={`text-xl font-mono font-bold ${textClass}`}>
          {percentage}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-4 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`h-full bg-gradient-to-r ${barGradient} shadow-md ${pulseGlow} rounded-full`}
        />
      </div>

      {sublabel && (
        <span className="text-white/40 text-[10px] uppercase tracking-wide mt-1.5 block font-mono">
          {sublabel}
        </span>
      )}
    </div>
  );
}
