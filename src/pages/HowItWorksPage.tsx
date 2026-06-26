import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Terminal, Lightbulb, Play, ClipboardList, Shield, ChevronRight } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    icon: <Terminal className="w-5 h-5 text-[#00d2ff]" />,
    title: "You describe the crisis.",
    desc: "Speak plain language. No restricted multiple-choice forms or rigid input boxes. Just explain what high-pressure scenario you are facing in real, unadulterated terms.",
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-[#febc2e]" />,
    title: "AI parses urgency metrics.",
    desc: "The OS scans and processes details like temporal remaining buffers, intensity benchmarks, priority zones, and risk exposures to contextualize your emergency.",
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-[#28c840]" />,
    title: "A rescue plan is formulated.",
    desc: "Get compiled steps containing precise times, execution durations, specific sub-metrics, and priority levels—highly matched to counteract standard panic cascades.",
  },
  {
    icon: <Play className="w-5 h-5 text-sky-400" />,
    title: "You execute with complete clarity.",
    desc: "Read your blueprint, check off items as you perform tasks in real-time, keep focus on the Immediate Injunction node, and watch your success probability outlook re-evaluate.",
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <div id="how-it-works-page" className="min-h-screen bg-[#0c0c0c] text-white pt-28 pb-20 px-6">
      
      {/* Structural visual grid lines */}
      <div className="hidden lg:block fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />
      <div className="hidden lg:block fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Hero */}
        <div className="text-left mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#00d2ff] uppercase font-bold block mb-2">
            METHODOLOGY MANUAL
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            How Crisis OS works.
          </h1>
          <p className="text-white/50 text-sm md:text-base mt-3 max-w-lg">
            One single interaction. Instant tactical clarity. Zero cognitive friction when you have the least capacity for it.
          </p>
        </div>

        {/* 4-Step Vertical Timeline */}
        <div id="vertical-timeline-container" className="relative pl-4 flex flex-col gap-12 mt-12">
          
          {/* Timeline continuous vertical connecting line */}
          <div className="absolute left-[36px] top-6 bottom-6 w-0.5 border-l border-dashed border-white/10 pointer-events-none" />

          {WORKFLOW_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row gap-6 items-start relative"
            >
              
              {/* Stepper Monospace circle node (size 40px) */}
              <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full border border-white/20 bg-[#0e1014] text-white/50 text-xs font-mono font-bold z-10 shadow-md">
                0{idx + 1}
              </div>

              {/* Step Detail Panel (liquid glass card padding 8) */}
              <div className="flex-1 liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                
                {/* Icon marker row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-white/55 leading-relaxed font-normal">
                  {step.desc}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Bottom Call Action box */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/app")}
            className="rounded-full bg-white text-black px-8 py-4 font-bold text-sm cursor-pointer shadow-lg hover:bg-white/95 transition-all inline-flex items-center gap-2"
          >
            Launch Command Center Now
            <ChevronRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>

      </div>

    </div>
  );
}
