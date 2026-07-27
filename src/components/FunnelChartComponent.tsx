import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from "recharts";
import { TrendingDown, Users, Calendar, Award } from "lucide-react";

interface FunnelChartComponentProps {
  totalLeads: number;
  totalTrials: number; // 20
  activeMembers: number; // 7
}

export default function FunnelChartComponent({
  totalLeads,
  totalTrials,
  activeMembers
}: FunnelChartComponentProps) {
  
  const funnelData = [
    {
      name: "1. Generated Leads",
      count: totalLeads,
      rate: "100%",
      label: `${totalLeads} Leads`,
      color: "#313BF5", // Palatinate Blue
      desc: "Total inquiries captured across franchise ads, meta forms, and landing pages."
    },
    {
      name: "2. Trial Bookings",
      count: totalTrials,
      rate: `${((totalTrials / totalLeads) * 100).toFixed(1)}%`,
      label: `${totalTrials} Trials`,
      color: "#FFB100", // Cheddar Yellow
      desc: "Leads successfully converted into scheduling a Free Trial (13 pending, 7 completed)."
    },
    {
      name: "3. Active Members",
      count: activeMembers,
      rate: `${((activeMembers / totalLeads) * 100).toFixed(2)}%`,
      label: `${activeMembers} Active`,
      color: "#E8596D", // Carmine Pink
      desc: "Paid recurring monthly memberships registered inside main studio software."
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xl max-w-xs text-slate-900">
          <p className="font-bold text-sm text-slate-900 mb-1 font-sans">{data.name}</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold font-mono text-brand-blue">{data.count}</span>
            <span className="text-xs text-slate-500">({data.rate} of total leads)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">{data.desc}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-wide">Acquisition & Conversion Funnel</h3>
            <p className="text-xs text-slate-500">Real-time status flow of Alberton franchisee growth pipeline</p>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-blue">
            <TrendingDown className="h-4 w-4" />
            <span>0.94% Conversion</span>
          </div>
        </div>

        <div className="flex-1 min-h-[260px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: "#475569", fontSize: 11, fontWeight: 500 }}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(37, 99, 235, 0.05)" }} />
              <Bar 
                dataKey="count" 
                barSize={32}
                radius={[0, 8, 8, 0]}
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList 
                  dataKey="label" 
                  position="right" 
                  style={{ fill: "#0f172a", fontSize: 11, fontWeight: "bold", fontFamily: "monospace" }} 
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel Dropout Analysis Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-amber-700 font-bold mb-4">Operational Funnel Diagnostics</h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-xl text-brand-blue mt-0.5">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Cold Inquiry Friction (97.3% Drop-off)</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Over <strong>723 leads</strong> reside in top-of-funnel states. <strong>377 (50.5%)</strong> are awaiting sales call replies and <strong>218 (29.2%)</strong> have blacklisted WhatsApp communications.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 mt-0.5">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Direct Free Trial Interest (2.68% Rate)</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Only <strong>20 leads</strong> got booked into a trial. This demonstrates standard social media advertisement drop-off, where initial interest is high, but booking commitment remains low.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 mt-0.5">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Trial-to-Active Close-Rate (35.0%)</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Out of the completed cohort of trials, <strong>7 unique students</strong> successfully converted to full paid studio memberships. The R1,200/mo close rate is high if we successfully secure the in-person session.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 mt-4">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs text-slate-700 font-medium">
            <span>Overall Conversion Rate:</span>
            <span className="font-mono font-bold text-sm text-amber-700">0.94%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
