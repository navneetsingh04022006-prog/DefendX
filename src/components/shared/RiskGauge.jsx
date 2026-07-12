import React from "react";

export default function RiskGauge({ score, size = "md" }) {
  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-lg",
  };

  const radius = size === "lg" ? 32 : size === "md" ? 22 : 16;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  
  const color = score >= 75 
    ? "text-red-500" 
    : score >= 50 
      ? "text-orange-500" 
      : score >= 25 
        ? "text-amber-500" 
        : "text-green-500";

  const strokeColor = score >= 75 
    ? "#ef4444" 
    : score >= 50 
      ? "#f97316" 
      : score >= 25 
        ? "#f59e0b" 
        : "#22c55e";

  const svgSize = size === "lg" ? 80 : size === "md" ? 56 : 40;

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle 
          cx={svgSize / 2} 
          cy={svgSize / 2} 
          r={radius} 
          fill="none" 
          stroke="hsl(222 30% 16%)" 
          strokeWidth="3" 
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-700"
        />
      </svg>
      <span className={`font-bold ${color}`}>{score}</span>
    </div>
  );
}
