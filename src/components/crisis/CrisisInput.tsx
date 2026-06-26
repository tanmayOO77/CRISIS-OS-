import React, { useState } from "react";
import { motion } from "motion/react";
import { CornerDownLeft, Sparkles } from "lucide-react";

interface CrisisInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  defaultValue?: string;
}

const CATEGORIES = [
  { emoji: "🎓", label: "Exam", starter: "I have a big exam scheduled tomorrow and I haven't studied any of the material yet. I need a crash course revision blueprint." },
  { emoji: "💼", label: "Interview", starter: "I got a final-round job interview in 2 hours but I haven't prepped their system design questions. I need a fast cheat sheet." },
  { emoji: "🚀", label: "Startup", starter: "A critical client system just crashed, our lead engineer is offline, and customers are starting to write bad reviews on public forums." },
  { emoji: "📊", label: "Presentation", starter: "I have to deliver a high-stakes quarterly product presentation to executive stakeholders in 3 hours and my slides look unfinished." },
  { emoji: "📚", label: "Assignment", starter: "My final research thesis is due tonight by midnight, I still need to write the entire concluding discussion section, and I am exhausted." },
  { emoji: "✈️", label: "Travel", starter: "My connection flight just got canceled in an international hub, all hotels are booked out, and my battery is dying." },
  { emoji: "🧑‍💻", label: "Project", starter: "My production database has got corrupted, our backup from last night threw a checksum error, and we are losing transaction state." },
  { emoji: "💡", label: "Other", starter: "I have a major high-pressure situation: " },
];

export default function CrisisInput({ onSubmit, isLoading, defaultValue = "" }: CrisisInputProps) {
  const [text, setText] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  const handlePillClick = (starter: string) => {
    setText(starter);
  };

  return (
    <form id="crisis-input-form" onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          id="crisis-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          rows={6}
          placeholder="I have a database exam tomorrow morning and haven't studied at all. Help me pass..."
          className="liquid-glass rounded-2xl p-6 w-full min-h-[160px] text-base text-white placeholder:text-white/20 border border-white/10 hover:border-white/25 focus:border-white/30 focus:outline-none transition-all duration-300 resize-none font-sans"
        />
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30 hidden sm:flex items-center gap-1">
          <span>Press Submit or Click Below</span>
        </div>
      </div>

      {/* Quick Select Category Pills */}
      <div className="mt-4">
        <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2 font-semibold">
          Or load crisis template phrase:
        </label>
        <div id="quick-action-pills" className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePillClick(cat.starter)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.01] hover:border-white/25 hover:bg-white/[0.04] text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Trigger Button */}
      <div className="mt-8 flex justify-end">
        <motion.button
          id="analyze-submit-button"
          type="submit"
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.95)" }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || !text.trim()}
          className="rounded-full bg-white text-black font-semibold px-8 py-3.5 text-sm flex items-center gap-2 hover:bg-white/90 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing Crisis...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black" />
              Analyze Crisis & Build Plan
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}
