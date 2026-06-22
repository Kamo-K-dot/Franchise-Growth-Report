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
      style={{
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 12px ${glowColor}25`
      }}
      className="p-5 rounded-2xl bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-blue/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{title}</span>
        <div 
          className="p-2.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue"
          style={{ textShadow: `0 0 10px ${glowColor}40` }}
        >
          {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold tracking-tight text-white font-sans flex items-baseline gap-1.5">
          {value}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-2.5">
          {change && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
              isPositive 
                ? "bg-brand-cheddar/10 text-brand-cheddar border border-brand-cheddar/20" 
                : "bg-brand-pink/10 text-brand-pink border border-brand-pink/20"
            }`}>
              {isPositive ? "↑" : "↓"} {change}
            </span>
          )}
          <span className="text-[11px] text-brand-coral font-medium font-sans">{subtitle}</span>
        </div>
      </div>
    </motion.div>
  );
}
