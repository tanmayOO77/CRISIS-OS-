import { motion } from "motion/react";

interface QuickSelectCardProps {
  key?: any;
  emoji: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export default function QuickSelectCard({ emoji, label, onClick, selected = false }: QuickSelectCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`liquid-glass rounded-2xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all w-full border ${
        selected
          ? "border-white/40 bg-white/5 shadow-lg shadow-white/5"
          : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
      }`}
    >
      <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
        {emoji}
      </span>
      <span className="text-xs uppercase tracking-wider font-semibold text-white/70 group-hover:text-white transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
