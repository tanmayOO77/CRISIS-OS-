import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GradientText({ children, className = "", animate = true }: GradientTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(to right, #0B2551 0%, #A4F4FD 25%, #00d2ff 50%, #3D81E3 75%, #0B2551 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  };

  return (
    <span
      style={gradientStyle}
      className={`${animate ? "animate-shiny" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
