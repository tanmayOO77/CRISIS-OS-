import React from "react";
import { motion } from "motion/react";
import { Check, Clock, ShieldAlert } from "lucide-react";
import { RescueTask } from "../../types/crisis";
import StatusBadge from "../ui/StatusBadge";

interface RescuePlanProps {
  tasks: RescueTask[];
  checkedTasks: Record<number, boolean>;
  onToggleTask: (index: number) => void;
}

export default function RescuePlan({ tasks, checkedTasks, onToggleTask }: RescuePlanProps) {
  return (
    <div id="rescue-plan-section" className="flex flex-col gap-4">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00d2ff]">
            CHRONOLOGICAL REMEDIES
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-white/60 border border-white/10">
            {tasks.length} COUNTER-TASKS
          </span>
        </div>
      </div>

      {/* Task List */}
      <div id="timeline-task-list" className="relative pl-1 flex flex-col gap-3">
        {/* Absolute linking vertical line */}
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-dashed bg-gradient-to-b from-white/15 via-white/5 to-transparent border-l border-dashed border-white/10 pointer-events-none" />

        {tasks.map((task, idx) => {
          const isChecked = !!checkedTasks[idx];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -1 }}
              className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 liquid-glass select-none ${
                isChecked
                  ? "border-white/5 bg-white/[0.005] opacity-50 shadow-none"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.02] shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              }`}
            >
              
              {/* Checkbox trigger */}
              <div className="flex items-center h-6 z-10">
                <button
                  type="button"
                  onClick={() => onToggleTask(idx)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-white border-white text-black"
                      : "border-white/20 hover:border-white/40 bg-white/[0.02]"
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
                </button>
              </div>

              {/* Time Column (Mono) */}
              <div className="min-w-[70px] pt-0.5">
                <span className={`text-xs font-mono font-medium block uppercase ${isChecked ? "text-white/20" : "text-[#00d2ff]/80"}`}>
                  {task.time}
                </span>
              </div>

              {/* Task Title & Description */}
              <div className="flex-1 min-w-0 pr-2">
                <p
                  className={`text-sm font-semibold text-white tracking-wide truncate ${
                    isChecked ? "line-through text-white/35" : "text-white/95"
                  }`}
                >
                  {task.task}
                </p>
                <p
                  className={`text-xs leading-relaxed mt-1 ${
                    isChecked ? "text-white/20" : "text-white/55"
                  }`}
                >
                  {task.description}
                </p>
              </div>

              {/* Right Side: Badges & Metadata */}
              <div className="flex flex-col items-end justify-center gap-2 min-w-[75px]">
                {/* Priority */}
                <StatusBadge
                  label={task.priority}
                  type="priority"
                  variant={task.priority}
                  pulse={false}
                  className="scale-90 origin-right"
                />
                
                {/* Duration */}
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/40 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">
                  <Clock className="w-2.5 h-2.5 text-white/30" />
                  <span>{task.duration}</span>
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
