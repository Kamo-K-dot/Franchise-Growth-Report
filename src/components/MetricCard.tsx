import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle: string;
  iconName: keyof typeof Icons;
  glowColor?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  iconName,
  glowColor = "#313BF5"
}: MetricCardProps) {
  const IconComponent = Icons[iconName] as React.ComponentType<any>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">{title}</span>
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue">
          {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 font-sans flex items-baseline gap-1.5">
          {value}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-2.5">
          {change && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
              isPositive 
                ? "bg-amber-50 text-amber-800 border border-amber-200" 
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              {isPositive ? "↑" : "↓"} {change}
            </span>
          )}
          <span className="text-[11px] text-slate-500 font-medium font-sans">{subtitle}</span>
        </div>
      </div>
    </motion.div>
  );
}
