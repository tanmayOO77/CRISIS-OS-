import { CrisisOutput } from "../../types/crisis";
import StatusBadge from "../ui/StatusBadge";
import { AlertTriangle, Clock, Activity, Target } from "lucide-react";

interface CrisisAssessmentProps {
  data: CrisisOutput;
}

export default function CrisisAssessment({ data }: CrisisAssessmentProps) {
  return (
    <div id="crisis-assessment-header" className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      {/* Left side: branding & name */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
            SECURE ANALYTICS NODE
          </span>
          <StatusBadge label={data.category} type="category" pulse={false} />
        </div>
        <h2 id="crisis-assessment-title" className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {data.crisisTitle}
        </h2>
      </div>

      {/* Center: Triple Capsules */}
      <div id="assessment-stats-capsules" className="flex flex-wrap gap-4 items-center">
        
        {/* Severity */}
        <div className="flex flex-col gap-1 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl min-w-[90px]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#ff5f57]" /> SEVERITY
          </span>
          <span className="text-xs font-semibold font-mono text-white/90 uppercase">{data.severity}</span>
        </div>

        {/* Time Remaining */}
        <div className="flex flex-col gap-1 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl min-w-[90px]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#00d2ff]" /> INTERVAL
          </span>
          <span className="text-xs font-semibold font-mono text-white/90 uppercase">{data.timeRemaining}</span>
        </div>

        {/* Urgency Score */}
        <div className="flex flex-col gap-1 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl min-w-[90px]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#febc2e]" /> INTENSITY
          </span>
          <span className="text-xs font-semibold font-mono text-white/90">{data.urgencyScore}/100</span>
        </div>

      </div>

      {/* Right side: Mission Status */}
      <div className="flex flex-col md:items-end gap-1 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block font-semibold">
          MISSION STATUS
        </span>
        <StatusBadge
          label={data.missionStatus}
          type="status"
          variant={data.missionStatus}
          pulse={true}
          className="mt-1"
        />
      </div>

    </div>
  );
}
