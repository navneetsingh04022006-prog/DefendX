import React from "react";
import { Grid3x3 } from "lucide-react";

const DEPARTMENTS = ["Engineering", "Finance", "HR", "Sales", "Operations", "IT", "Executive", "Legal", "Marketing"];
const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];

const RISK_COLORS = {
  Low: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" },
  Medium: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
  High: { bg: "bg-orange-500/15", border: "border-orange-500/30", text: "text-orange-400" },
  Critical: { bg: "bg-red-500/15", border: "border-red-500/30", text: "text-red-400" },
};

export default function DepartmentRiskHeatmap({ users = [] }) {
  const matrix = {};
  
  DEPARTMENTS.forEach(dept => {
    matrix[dept] = {};
    RISK_LEVELS.forEach(level => {
      matrix[dept][level] = 0;
    });
  });

  users.forEach(u => {
    if (matrix[u.department] && RISK_LEVELS.includes(u.risk_level)) {
      matrix[u.department][u.risk_level]++;
    }
  });

  const deptStats = DEPARTMENTS.map(dept => {
    const highRisk = (matrix[dept]["High"] || 0) + (matrix[dept]["Critical"] || 0);
    const total = users.filter(u => u.department === dept).length;
    return { dept, highRisk, total };
  });

  const maxHighRisk = Math.max(...deptStats.map(d => d.highRisk), 1);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Grid3x3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Department Risk Matrix</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 text-muted-foreground text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Department</th>
              {RISK_LEVELS.map(level => (
                <th key={level} className="pb-3 font-medium text-center w-24">{level}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono">
            {DEPARTMENTS.map(dept => (
              <tr key={dept} className="hover:bg-muted/30 transition-colors">
                <td className="py-3.5 font-sans font-medium text-foreground">{dept}</td>
                {RISK_LEVELS.map(level => {
                  const count = matrix[dept][level];
                  const color = RISK_COLORS[level];
                  return (
                    <td key={level} className="py-3.5 text-center px-2">
                      <span className={`inline-block w-16 py-1 rounded text-xs font-semibold border transition-all duration-200 ${
                        count > 0 
                          ? `${color.bg} ${color.border} ${color.text} shadow-sm scale-105` 
                          : "bg-transparent border-transparent text-muted-foreground/30 font-light"
                      }`}>
                        {count}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
