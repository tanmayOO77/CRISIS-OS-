import ProgressBar from "../ui/ProgressBar";
import { TrendingUp } from "lucide-react";

interface SuccessProbabilityProps {
  probabilities: {
    withoutPlan: number;
    withPlan: number;
  };
}

export default function SuccessProbability({ probabilities }: SuccessProbabilityProps) {
  return (
    <div className="liquid-glass rounded-2xl p-6 border border-white/10">
      
      {/* Title Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-4 h-4 text-[#00d2ff]" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
          PROBABILITY SHIFT ANALYSIS
        </span>
      </div>

      {/* Side-by-Side Dual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Without Plan */}
        <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
          <ProgressBar
            label="OUTCOME PROBABILITY WITHOUT SYSTEM PLAN"
            percentage={probabilities.withoutPlan}
            color="red"
            sublabel="ESTIMATED CHANCE OF DEFICIENT OR DAMAGED STATE"
          />
        </div>

        {/* With Plan */}
        <div className="p-4 bg-white/[0.015] border border-white/10 rounded-xl relative overflow-hidden ring-1 ring-[#00d2ff]/10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/5 rounded-full blur-2xl pointer-events-none" />
          <ProgressBar
            label="RECONSTITUTED OUTCOME WITH PLAN"
            percentage={probabilities.withPlan}
            color="cyan"
            sublabel="ESTIMATED CHANCE OF SUCCESSFUL RESTORATION"
          />
        </div>

      </div>

    </div>
  );
}
