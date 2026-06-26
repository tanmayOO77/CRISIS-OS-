import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Shield, ChevronDown, Terminal, CheckCircle2, ArrowRight, UserCheck, Flame, BookOpen } from "lucide-react";
import QuickSelectCard from "../components/ui/QuickSelectCard";
import GradientText from "../components/ui/GradientText";
import StatusBadge from "../components/ui/StatusBadge";

const CRISES_TEMPLATES = [
  { emoji: "🎓", label: "Exam", starter: "I have a big exam scheduled tomorrow and I haven't studied any of the material yet. I need a crash course revision blueprint." },
  { emoji: "💼", label: "Interview", starter: "I got a final-round job interview in 2 hours but I haven't prepped their system design questions. I need a fast cheat sheet." },
  { emoji: "🚀", label: "Startup", starter: "A critical client system just crashed, our lead engineer is offline, and customers are starting to write bad reviews on public forums." },
  { emoji: "📊", label: "Presentation", starter: "I have to deliver a high-stakes quarterly product presentation to executive stakeholders in 3 hours and my slides look unfinished." },
  { emoji: "📚", label: "Assignment", starter: "My final research thesis is due tonight by midnight, I still need to write the entire concluding discussion section, and I am exhausted." },
  { emoji: "✈️", label: "Travel", starter: "My connection flight just got canceled in an international hub, all hotels are booked out, and my battery is dying." },
  { emoji: "🧑‍💻", label: "Project", starter: "My production database has got corrupted, our backup from last night threw a checksum error, and we are losing transaction state." },
  { emoji: "💡", label: "Other", starter: "I have a major high-pressure situation: " },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCardClick = (cat: { label: string; starter: string }) => {
    navigate("/app", { state: { category: cat.label, prefill: cat.starter } });
  };

  return (
    <div id="landing-page" className="relative min-h-screen bg-[#0c0c0c] text-white pt-14 selection:bg-[#00d2ff]/30 pb-20">
      
      {/* Decorative Grid Guidelines */}
      <div className="hidden lg:block fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />
      <div className="hidden lg:block fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />

      {/* Hero Section */}
      <section id="hero-section" className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center relative px-6 z-10 max-w-5xl mx-auto">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none z-0" />
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-white/80 select-none mb-6 mt-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28c840] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28c840]" />
          </span>
          AI COMMAND CENTER
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] max-w-4xl"
        >
          Turn Panic <br />
          <GradientText className="font-extrabold">Into A Plan.</GradientText>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mx-auto mt-6"
        >
          Describe your crisis. Get a step-by-step rescue plan in seconds. No mock charts, no fluff. Just pure emergency execution.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-4 items-center justify-center z-20"
        >
          <button
            id="hero-primary-cta"
            onClick={() => navigate("/app")}
            className="rounded-full bg-white text-black px-8 py-4 font-semibold text-sm hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Start Crisis Analysis
          </button>
          
          <button
            id="hero-secondary-cta"
            onClick={() => navigate("/how-it-works")}
            className="rounded-full border border-white/15 text-white/80 px-6 py-4 text-sm hover:bg-white/5 hover:border-white/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            See how it works &rarr;
          </button>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/20 text-xs mt-4 block font-mono"
        >
          FREE &bull; NO SIGNUP REQUIRED &bull; PRIVACY-FIRST
        </motion.span>

        {/* Chevron down */}
        <div id="scroll-prompt" className="absolute bottom-8 animate-bounce opacity-40">
          <ChevronDown className="w-5 h-5" />
        </div>

      </section>

      {/* Crisis Custom Select Grid */}
      <section id="category-grid-section" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-widest text-[#00d2ff] uppercase font-bold block mb-2">
            SELECT CRITICAL BLUEPRINT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            What kind of crisis are you facing?
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Choose a preset node to load standard scaffolding phrases or submit anything you want.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CRISES_TEMPLATES.map((cat, index) => (
            <QuickSelectCard
              key={index}
              emoji={cat.emoji}
              label={cat.label}
              onClick={() => handleCardClick(cat)}
            />
          ))}
        </div>
      </section>

      {/* Visual Step Timeline */}
      <section id="workflow-timeline-section" className="py-20 px-6 border-y border-white/5 bg-white/[0.005] relative overflow-hidden">
        
        {/* Subtle horizontal light band */}
        <div className="absolute top-[350px] left-0 right-0 h-px bg-white/5 z-0" />

        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#28c840] uppercase font-bold block mb-2">
              METHODOLOGY Blueprint
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              From crisis to clarity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1: Describe */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
              <span className="text-5xl font-mono font-extrabold text-white/5 block">01</span>
              <div className="p-2 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                <Terminal className="w-5 h-5 text-[#00d2ff]" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Describe</h3>
              <p className="text-sm text-white/55 leading-relaxed font-normal">
                Type your high-pressure situation in plain text. No fields or menus required to restrict parameters.
              </p>
            </div>

            {/* Step 2: Analyze */}
            <div className="liquid-glass rounded-2xl p-6 border border-[#febc2e]/20 bg-[#febc2e]/[0.015] flex flex-col gap-4 relative">
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#febc2e] animate-ping" />
              <span className="text-5xl font-mono font-extrabold text-[#febc2e]/10 block">02</span>
              <div className="p-2 w-10 h-10 rounded-lg bg-[#febc2e]/5 border border-[#febc2e]/10 flex items-center justify-center text-[#febc2e]/80">
                <Flame className="w-5 h-5 text-[#febc2e]" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Analyze</h3>
              <p className="text-sm text-white/55 leading-relaxed font-normal">
                AI scans the urgency intensity, calculated severity boundaries, temporal constraints, and resource nodes.
              </p>
            </div>

            {/* Step 3: Execute */}
            <div className="liquid-glass rounded-2xl p-6 border border-[#28c840]/20 bg-[#28c840]/[0.015] flex flex-col gap-4">
              <span className="text-5xl font-mono font-extrabold text-[#28c840]/10 block">03</span>
              <div className="p-2 w-10 h-10 rounded-lg bg-[#28c840]/5 border border-[#28c840]/10 flex items-center justify-center text-[#28c840]/80">
                <CheckCircle2 className="w-5 h-5 text-[#28c840]" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Execute</h3>
              <p className="text-sm text-white/55 leading-relaxed font-normal">
                Receive an hour-by-hour counter-remedy roadmap with interactive items, probabilities, and link sets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Output Static Mockup Section */}
      <section id="mockup-preview-section" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#00d2ff] uppercase font-bold block mb-2">
            MOCKUP TELEMETRY VIEW
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            This is what your plan looks like.
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Example response generated for: <span className="text-white/80 font-semibold italic">"Investor pitch tomorrow, deck not ready."</span>
          </p>
        </div>

        {/* Mockup Outer Card Wrapper */}
        <div className="border border-white/10 rounded-3xl bg-[#0e1014] shadow-2xl shadow-blue-900/10 overflow-hidden max-w-4xl mx-auto">
          
          {/* Mockup macOS header */}
          <div className="bg-[#14171a] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] font-mono text-white/30 font-semibold">PREVIEW CONSOLE &bull; PITCH CRASH PLAN</span>
            <div className="w-14" />
          </div>

          {/* Mockup Internal Content */}
          <div className="p-6 md:p-8 flex flex-col gap-6 select-none opacity-90">
            
            {/* Header bar mock */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest">SECURE ANALYTICS NODE</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[9px] font-mono text-[#00d2ff] font-bold">STARTUP</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Investor Presentation Crash Sequence</h3>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-mono font-bold text-[#ff5f57]">CRITICAL</div>
                <div className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-[10px] font-mono font-bold text-[#00d2ff]">18h REMAINING</div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-[#28c840]">AT RISK</div>
              </div>
            </div>

            {/* Main Mock Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Section title */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00d2ff]">
                  <span>RECOVERY TASKS</span>
                  <span className="text-white/30">&bull; 3 SUB-METRICS</span>
                </div>

                {/* Timeline item 1 */}
                <div className="flex gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.015]">
                  <div className="w-5 h-5 rounded border border-[#28c840] bg-white text-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28c840]" />
                  </div>
                  <div className="min-w-[60px] text-xs font-mono text-white/30 pt-0.5">04:00 PM</div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-white/40 line-through">Draft Narrative Script</span>
                    <p className="text-[11px] text-white/20 mt-1 line-through">Define clear problem-solution-market sizing sentences. Keep pitch extremely dense.</p>
                  </div>
                </div>

                {/* Timeline item 2 */}
                <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] shadow">
                  <div className="w-5 h-5 rounded border border-white/20 bg-white/[0.02] shrink-0" />
                  <div className="min-w-[60px] text-xs font-mono text-[#00d2ff] pt-0.5">06:00 PM</div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-white/95">Layout Visual Slide outline</span>
                    <p className="text-[11px] text-white/60 mt-1">Implement a modular 10-slide standard deck mapping visual elements clearly.</p>
                  </div>
                </div>

                {/* Timeline item 3 */}
                <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] shadow">
                  <div className="w-5 h-5 rounded border border-white/20 bg-white/[0.02] shrink-0" />
                  <div className="min-w-[60px] text-xs font-mono text-[#00d2ff] pt-0.5">09:00 PM</div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-white/95">Record Presenting Dry-Run</span>
                    <p className="text-[11px] text-white/60 mt-1">Execute presentations to record video. Test voice pacing and pitch delivery speeds.</p>
                  </div>
                </div>

              </div>

              {/* Right Column (col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Do this next mock */}
                <div className="border border-[#00d2ff]/20 bg-[#00d2ff]/5 p-5 rounded-2xl relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00d2ff]" />
                  <span className="text-[9px] font-mono text-white/40 font-bold block mb-1">IMMEDIATE ACTUATOR</span>
                  <p className="text-xs font-bold text-white leading-snug">
                    Turn off your phone, close slack notifications, and draft the 3 key narrative slides right now.
                  </p>
                </div>

                {/* Probability shift card */}
                <div className="liquid-glass border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-widest block">PROBABILITY OUTLOOK</span>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-mono"><span className="text-white/40">BEFORE THE SYSTEM</span> <span className="text-[#ff5f57] font-semibold">15%</span></div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#ff5f57] w-[15%]" /></div>
                  </div>
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex justify-between text-xs font-mono"><span className="text-white/40">AFTER SYSTEM LAUNCH</span> <span className="text-[#00d2ff] font-semibold">83%</span></div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#00d2ff] to-cyan-400 w-[83%]" /></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer Call to Action Panel */}
      <section id="final-cta-panel" className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
        <div className="liquid-glass rounded-3xl border border-white/10 p-12 text-center relative overflow-hidden flex flex-col items-center">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-transparent opacity-80 z-0 pointer-events-none" />

          {/* Logo element decorative */}
          <div className="relative mb-6 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl border border-white/10 scale-110 pointer-events-none opacity-40 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 z-10 max-w-xl">
            Ready to take control?
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-8 z-10 font-normal">
            Turn your anxiety into concrete, actionable hourly operations. Build a recovery sequence now.
          </p>

          <button
            id="footer-launch-btn"
            onClick={() => navigate("/app")}
            className="rounded-full bg-white text-black px-8 py-4 font-semibold text-sm hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2"
          >
            Launch Crisis OS
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <span className="text-white/30 text-xs mt-4 font-mono z-10">
            FREE. NO ACCOUNT NEEDED. OFF-THE-GRID PRIVACY.
          </span>

        </div>
      </section>

    </div>
  );
}
