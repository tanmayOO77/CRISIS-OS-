import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Share2, CornerUpLeft, ArrowLeft, RefreshCw, CheckCircle, FileDown } from "lucide-react";
import { CrisisOutput } from "../types/crisis";
import CrisisInput from "../components/crisis/CrisisInput";
import CrisisAssessment from "../components/crisis/CrisisAssessment";
import RescuePlan from "../components/crisis/RescuePlan";
import SuccessProbability from "../components/crisis/SuccessProbability";
import ImmediateAction from "../components/crisis/ImmediateAction";
import MissionObjective from "../components/crisis/MissionObjective";
import ResourcePack from "../components/crisis/ResourcePack";
import ThinkingAnimation from "../components/ui/ThinkingAnimation";
import { generateCrisisPDF } from "../utils/pdfGenerator";

export default function CommandCenter() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract navigation parameters for templated queries
  const routePrefill = location.state?.prefill || "";
  const routeCategory = location.state?.category || "";

  // UI state
  const [promptValue, setPromptValue] = useState(routePrefill);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [apiOutput, setApiOutput] = useState<CrisisOutput | null>(null);

  // Local checkbox completion state for recovery tasks
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  // Feedback notifications (toast)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Listen to incoming route prefils
  useEffect(() => {
    if (routePrefill) {
      setPromptValue(routePrefill);
      setApiOutput(null); // clear existing query to show input form prefilled
      setCheckedTasks({});
    }
  }, [routePrefill, routeCategory]);

  const handleCrisisSubmit = async (userInput: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setApiOutput(null);
    setCheckedTasks({});

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        let errJson;
        try { errJson = await response.json(); } catch(e){}
        throw new Error(errJson?.error || `Server responded with standard failure code: ${response.status}`);
      }

      const responseSchema = await response.json();
      setApiOutput(responseSchema);
    } catch (err: any) {
      console.error("Crisis submission error:", err);
      setErrorMsg(err.message || "Failed to finalize crisis parsing. Please check your network and secure configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = (index: number) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleStartOver = () => {
    setPromptValue("");
    setApiOutput(null);
    setCheckedTasks({});
    setErrorMsg(null);
    // Clear location state if present to avoid sticky pre-fills
    window.history.replaceState({}, document.title);
  };

  // Plain-text formatted copier
  const handleCopyPlan = async () => {
    if (!apiOutput) return;

    let textBuffer = `===================\n`;
    textBuffer += `CRISIS OS RESPONSE SYSTEM\n`;
    textBuffer += `CRISIS: ${apiOutput.crisisTitle.toUpperCase()}\n`;
    textBuffer += `CATEGORY: ${apiOutput.category}\n`;
    textBuffer += `SEVERITY: ${apiOutput.severity} | TIME REMAINING: ${apiOutput.timeRemaining}\n`;
    textBuffer += `MISSION OBJECTIVE: ${apiOutput.missionObjective}\n`;
    textBuffer += `IMMEDIATE ACTION REQUISITE: ${apiOutput.immediateAction.toUpperCase()}\n`;
    textBuffer += `===================\n\n`;
    textBuffer += `RESCUE BLUEPRINT:\n`;

    apiOutput.rescuePlan.forEach((task, index) => {
      textBuffer += `[ ] [${task.time}] - ${task.task} (${task.duration}) - ${task.priority} PRIORITY\n`;
      textBuffer += `    Ref/Details: ${task.description}\n\n`;
    });

    if (apiOutput.resources && apiOutput.resources.length > 0) {
      textBuffer += `REQUISITE SYSTEM ASSETS:\n`;
      apiOutput.resources.forEach((res) => {
        textBuffer += `- ${res.title} (${res.type}): ${res.url}\n    Scope: ${res.reason}\n`;
      });
    }

    try {
      await navigator.clipboard.writeText(textBuffer);
      triggerToast("Plan copied to clipboard!");
    } catch (err) {
      console.error("Clipping error:", err);
      triggerToast("Failed to write clipboard.");
    }
  };

  const handleSharePlan = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      triggerToast("Reference console URL copied!");
    } catch (err) {
      triggerToast("Share failed to copy URL.");
    }
  };

  const handleDownloadPDF = () => {
    if (!apiOutput) return;
    try {
      generateCrisisPDF(apiOutput);
      triggerToast("PDF blueprint downloaded!");
    } catch (err) {
      console.error(err);
      triggerToast("Failed to generate PDF document.");
    }
  };

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 2500);
  };

  return (
    <div id="command-center-container" className="relative min-h-screen bg-[#0c0c0c] text-white pt-20 selection:bg-[#00d2ff]/30 pb-20 px-6">
      
      {/* Decorative vertical guide lines */}
      <div className="hidden lg:block fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />
      <div className="hidden lg:block fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/5 z-0 pointer-events-none" />

      {/* Outer bounds boundaries */}
      <div className="max-w-6xl mx-auto z-10 relative">

        {/* Temporary toast overlay */}
        <AnimatePresence>
          {feedbackToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-500 border border-emerald-400 rounded-full text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle className="w-4 h-4 text-white" />
              <span>{feedbackToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* PHASE A & LOADING: INPUT AND PROCESSING STATES */}
        {/* ======================================================== */}
        
        {!apiOutput && !isLoading && (
          <div className="max-w-2xl mx-auto pt-10">
            <div className="text-center mb-8 flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase font-semibold block mb-2">
                ACTIVE CRISIS NODE INTERACTION
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white select-none">
                Command Console
              </h1>
              <p className="text-white/40 text-sm max-w-sm mt-2 leading-relaxed">
                Describe your high-pressure moment. Get interactive operational tasks mapped out in seconds.
              </p>
            </div>

            {/* Input Form Component */}
            <div className="mt-4">
              <CrisisInput
                onSubmit={handleCrisisSubmit}
                isLoading={isLoading}
                defaultValue={promptValue}
              />
            </div>
          </div>
        )}

        {/* AI Loading state */}
        {isLoading && (
          <div id="processing-loader-wrapper" className="max-w-2xl mx-auto pt-16">
            <ThinkingAnimation />
          </div>
        )}

        {/* Error Handling block */}
        {errorMsg && !isLoading && (
          <div className="max-w-lg mx-auto pt-16">
            <div className="liquid-glass rounded-2xl p-6 border border-[#ff5f57]/30 bg-[#ff5f57]/5 flex flex-col gap-4 items-center text-center">
              <div className="p-3 bg-[#ff5f57]/10 rounded-full border border-[#ff5f57]/20 text-[#ff5f57]">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-white text-lg">Analysis Corrupted</h3>
                <p className="text-xs text-white/60 leading-relaxed font-mono">
                  {errorMsg}
                </p>
              </div>
              <button
                onClick={() => handleCrisisSubmit(promptValue || "crash plan")}
                className="rounded-full bg-white text-black px-6 py-2.5 text-xs font-semibold hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                Re-transmit Signal (Retry)
              </button>
              <button
                onClick={handleStartOver}
                className="text-white/40 hover:text-white text-xs underline mt-2 transition-colors cursor-pointer"
              >
                Start From Scratch
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PHASE B: STRUCTURED EMERGENCY DECISION-MAKING PLANS */}
        {/* ======================================================== */}

        {apiOutput && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            
            {/* Navigational back header bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 select-none">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-mono group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>START NEW SEQUENCE</span>
              </button>
              <span className="text-[10px] font-mono text-white/20 select-none">
                ENCRYPTED SHELL SESSION #COS-{Math.floor(1000 + Math.random() * 9000)}
              </span>
            </div>

            {/* Row 1: Triple-capsule Header Assessment panel */}
            <CrisisAssessment data={apiOutput} />

            {/* Row 2: Double Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
              
              {/* Left Column (Timeline Plans & Probabilities) - col-span-7 */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Timeline display */}
                <RescuePlan
                  tasks={apiOutput.rescuePlan}
                  checkedTasks={checkedTasks}
                  onToggleTask={handleToggleTask}
                />

                {/* Probability changes */}
                <SuccessProbability probabilities={apiOutput.successProbability} />

              </div>

              {/* Right Column (Instructions & Materials) - col-span-5 */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20 h-fit">
                
                {/* Immediate priority action */}
                <ImmediateAction action={apiOutput.immediateAction} />

                {/* Objective */}
                <MissionObjective objective={apiOutput.missionObjective} />

                {/* Pack set of resources */}
                <ResourcePack resources={apiOutput.resources} />

              </div>

            </div>

            {/* Row 3: Command Actions Footer (Copy / Share / Reset) */}
            <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-6">
              
              <button
                onClick={handleStartOver}
                className="px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 text-xs font-semibold bg-white/[0.01] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Start Over
              </button>

              <div className="flex items-center gap-3">
                
                {/* PDF generation action */}
                <button
                  onClick={handleDownloadPDF}
                  className="px-5 py-2.5 rounded-full border border-[#00d2ff]/30 text-[#00d2ff] hover:text-[#00d2ff]/80 hover:border-[#00d2ff]/50 hover:bg-[#00d2ff]/5 text-xs font-semibold bg-[#0e1014] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Download PDF
                </button>

                {/* Share action */}
                <button
                  onClick={handleSharePlan}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-xs font-semibold bg-[#0e1014] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Link
                </button>

                {/* Copy checklist details */}
                <button
                  onClick={handleCopyPlan}
                  className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-white/5"
                >
                  <Copy className="w-3.5 h-3.5 text-black" />
                  Copy Plan text
                </button>

              </div>

            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
