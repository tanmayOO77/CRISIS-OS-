import { Target } from "lucide-react";

interface MissionObjectiveProps {
  objective: string;
}

export default function MissionObjective({ objective }: MissionObjectiveProps) {
  return (
    <div className="liquid-glass rounded-2xl p-5 border border-white/10 relative">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-[#28c840]" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
          MISSION OBJECTIVE
        </span>
      </div>
      <p className="text-sm text-white/80 leading-relaxed font-normal">
        {objective}
      </p>
    </div>
  );
}
