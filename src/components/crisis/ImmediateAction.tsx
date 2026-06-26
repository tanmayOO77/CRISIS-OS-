import { motion } from "motion/react";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface ImmediateActionProps {
  action: string;
}

export default function ImmediateAction({ action }: ImmediateActionProps) {
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-white/20 bg-white/[0.03] rounded-2xl p-6 shadow-2xl overflow-hidden"
    >
      {/* Absolute glow background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Primary Left Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />

      <div className="pl-2 flex flex-col gap-3">
        {/* Header eyebrow */}
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#ff5f57]/10 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-[#ff5f57]" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50">
            IMMEDIATE INJUNCTION
          </span>
        </div>

        {/* Action title text */}
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-relaxed">
          {action}
        </h3>

        {/* Footer helper */}
        <div className="flex items-center gap-1.5 text-xs text-[#00d2ff]/75 font-mono pt-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>DO THIS NEXT FOR MAXIMUM LEVERAGE</span>
        </div>
      </div>
    </motion.div>
  );
}
