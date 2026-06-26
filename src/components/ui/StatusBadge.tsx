import { motion } from "motion/react";

interface StatusBadgeProps {
  label: string;
  type?: "severity" | "priority" | "status" | "category" | "general";
  variant?: "Critical" | "High" | "Medium" | "Low" | "Recoverable" | "At Risk" | string;
  className?: string;
  pulse?: boolean;
}

export default function StatusBadge({
  label,
  type = "general",
  variant = "Medium",
  className = "",
  pulse = true,
}: StatusBadgeProps) {
  
  // Decide colors based on the node variant
  let dotColorClass = "bg-sky-400";
  let pulseColorClass = "animate-pulse-green";
  let textGradClass = "text-sky-400/90";
  let bgClass = "bg-sky-400/5 border-sky-400/10";

  const cleanVariant = (variant || "Medium").toLowerCase().trim();

  if (cleanVariant === "critical" || cleanVariant === "red") {
    dotColorClass = "bg-[#ff5f57]";
    pulseColorClass = "animate-pulse-red";
    textGradClass = "text-[#ff5f57]";
    bgClass = "bg-[#ff5f57]/5 border-[#ff5f57]/20";
  } else if (cleanVariant === "high" || cleanVariant === "at risk" || cleanVariant === "yellow") {
    dotColorClass = "bg-[#febc2e]";
    pulseColorClass = "animate-pulse-yellow";
    textGradClass = "text-[#febc2e]";
    bgClass = "bg-[#febc2e]/5 border-[#febc2e]/20";
  } else if (cleanVariant === "recoverable" || cleanVariant === "low" || cleanVariant === "green" || cleanVariant === "success") {
    dotColorClass = "bg-[#28c840]";
    pulseColorClass = "animate-pulse-green";
    textGradClass = "text-[#28c840]";
    bgClass = "bg-[#28c840]/5 border-[#28c840]/20";
  } else if (type === "category") {
    dotColorClass = "bg-[#00d2ff]";
    pulseColorClass = "animate-pulse-green";
    textGradClass = "text-white/85";
    bgClass = "bg-white/5 border-white/10";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border select-none ${bgClass} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorClass} ${pulseColorClass}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColorClass}`} />
        </span>
      )}
      <span className={`font-semibold tracking-wide ${textGradClass}`}>
        {type === "category" ? label : label}
      </span>
    </span>
  );
}
