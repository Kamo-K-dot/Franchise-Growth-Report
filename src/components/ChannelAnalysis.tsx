import { motion } from "motion/react";
import { MessageSquare, Mail, Phone, Lock, Lightbulb, Target, Settings, ArrowRight } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface ChannelAnalysisProps {
  conversationsSummary: {
    total: number;
    whatsapp: number;
    email: number;
    call: number;
  };
}

export default function ChannelAnalysis({
  conversationsSummary
}: ChannelAnalysisProps) {

  // Channel Segment for Pie Chart adjusted to Resolute brand colors
  const pieData = [
    { name: "WhatsApp Campaigns", value: conversationsSummary.whatsapp, color: "#313BF5", icon: MessageSquare, ratio: `${((conversationsSummary.whatsapp / conversationsSummary.total) * 100).toFixed(0)}%` },
    { name: "Email Broadcasts", value: conversationsSummary.email, color: "#FFB100", icon: Mail, ratio: `${((conversationsSummary.email / conversationsSummary.total) * 100).toFixed(0)}%` },
    { name: "Phone Call Logs", value: conversationsSummary.call, color: "#E8596D", icon: Phone, ratio: `${((conversationsSummary.call / conversationsSummary.total) * 100).toFixed(0)}%` }
  ];

  const recommendations = [
    {
      title: "Automated Trial Bridging & CRM Reminders",
      desc: "As the Franchise Success Manager, configure automated sequences inside the CRM to directly push self-booking trial calendar links to the 377 leads 'waiting for response'. This reduces manual calling overhead substantially.",
      icon: Target,
      color: "from-brand-blue to-blue-800"
    },
    {
      title: "Omni-Channel Outbox for Blocked Contacts",
      desc: "For the 218 leads who cannot receive WhatsApp messages due to blacklistings or spam blocks, automate direct multi-channel campaigns (using SMS and high-contrast email newsletters) to re-verify contact details without lost touchpoints.",
      icon: Settings,
      color: "from-brand-pink to-brand-popstar"
    },
    {
      title: "Holiday Camp Academic Loyalty Funnel",
      desc: "Deploy cross-promotional rewards directly to the 124 Winter Holiday Camp registrations. Incentivize children who attend the camp with exclusive club discounts to easily convert temporary users into full paid weekly academic students.",
      icon: Lightbulb,
      color: "from-brand-cheddar to-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Engagement Channels */}
      <div className="bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-white font-bold mb-4">Communication Touchpoints</h3>
          <p className="text-xs text-gray-400 mb-4">Breakdown of outbound engagement channels across logged leads</p>

          <div className="flex justify-center mb-6 relative">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Touches`, "Total Interactions"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Touches</span>
              <span className="text-2xl font-bold font-mono text-white">{conversationsSummary.total}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {pieData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-gray-200 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-white font-bold">
                    <span>{item.value}</span>
                    <span className="text-gray-400 text-[10px]">({item.ratio})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-brand-blue/5 border border-brand-blue/20 rounded-xl mt-4 flex items-center gap-3">
          <Lock className="h-4 w-4 text-brand-cheddar shrink-0" />
          <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
            <strong>FSM Advisory Note:</strong> Transitioning cold list inquiries to automated self-service scheduling (SMS/Email loops) decreases admin friction and accelerates parent trial sign-ups.
          </p>
        </div>
      </div>

      {/* Franchise Success Manager Strategic Recommendations */}
      <div className="lg:col-span-2 bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-brand-cheddar font-bold mb-4">Strategic Actions for Franchise Success Manager</h3>
          
          <div className="space-y-4">
            {recommendations.map((rec, i) => {
              const Icon = rec.icon;
              return (
                <div 
                  key={i} 
                  className="p-4 rounded-xl bg-gradient-to-r from-brand-blue/5 to-transparent border border-brand-blue/10 flex gap-4 hover:border-brand-blue/30 transition-all group"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${rec.color} text-white shadow-lg shrink-0 h-fit`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white group-hover:text-brand-cheddar transition-colors">
                        {rec.title}
                      </h4>
                      <ArrowRight className="h-3.5 w-3.5 text-brand-cheddar opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      {rec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-brand-blue/10 text-center flex items-center justify-between">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">FSM Action Roadmap</span>
          <span className="text-xs text-brand-cheddar font-semibold px-2 py-0.5 rounded-full bg-brand-cheddar/10 border border-brand-cheddar/20">Active Management Priority</span>
        </div>
      </div>

    </div>
  );
}
