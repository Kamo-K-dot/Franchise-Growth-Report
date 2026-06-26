import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, RefreshCw, AlertTriangle, Coins, BarChart3, HelpCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface RevenueProjectionsProps {
  currentMembers: number; // 7
  currentActiveMRR: number; // 7200
  unconvertedTrials: number; // 13
  pricePerLearner?: number;
  currencySymbol?: string;
}

export default function RevenueProjections({
  currentMembers,
  currentActiveMRR,
  unconvertedTrials,
  pricePerLearner = 1200,
  currencySymbol = "R"
}: RevenueProjectionsProps) {
  
  // Weekly Performance Inputs (requested by user)
  const [weeklyLeads, setWeeklyLeads] = useState(30);
  const [weeklyConversions, setWeeklyConversions] = useState(2);
  const [currentPayingStudents, setCurrentPayingStudents] = useState(currentMembers);
  const [targetLearners, setTargetLearners] = useState(70);
  const [projectedRevTarget, setProjectedRevTarget] = useState(84000);
  const [customConvRate, setCustomConvRate] = useState(8.5); // default baseline set in 8-10% range as requested

  // Sync state with prop updates
  useEffect(() => {
    setCurrentPayingStudents(currentMembers);
  }, [currentMembers]);

  // Sync projected revenue target with target learners when it changes
  useEffect(() => {
    setProjectedRevTarget(targetLearners * pricePerLearner);
  }, [targetLearners, pricePerLearner]);

  const currentRevOverride = currentPayingStudents * pricePerLearner;
  const targetMembersDerived = Math.round(projectedRevTarget / pricePerLearner);

  // Calculations based on weekly inputs
  const calculatedConvRate = weeklyLeads > 0 ? ((weeklyConversions / weeklyLeads) * 100).toFixed(2) : "0.00";
  const revenueGap = Math.max(0, projectedRevTarget - currentRevOverride);
  const memberGap = Math.max(0, targetMembersDerived - currentPayingStudents);

  // Weeks required to hit target at current speed
  const weeksRequired = weeklyConversions > 0 ? Math.ceil(memberGap / weeklyConversions) : 999;
  const monthsRequired = (weeksRequired / 4.3).toFixed(1);

  const monthsRemaining = 6; // July to Dec 2026
  const gap = Math.max(0, targetLearners - currentPayingStudents);
  const learnersPerMonth = Math.ceil(gap / monthsRemaining);
  
  // Weekly conversion needed for the next 6 months to hit target (6 months = 26 weeks)
  const weeklyConversionsNeeded6Months = (gap / 26).toFixed(1);

  // Monthly calculations
  const convRateDecimal = customConvRate / 100;
  const totalLeadsNeeded = convRateDecimal > 0 ? Math.round(gap / convRateDecimal) : 0;
  const leadsPerMonthNeeded = Math.round(totalLeadsNeeded / monthsRemaining);

  const targetMRR = targetLearners * pricePerLearner;
  const targetGapMRR = gap * pricePerLearner;

  // Generate projections data for chart
  const months = ["Actual (Jun)", "Proj (Jul)", "Proj (Aug)", "Proj (Sep)", "Proj (Oct)", "Proj (Nov)", "Proj (Dec)"];
  const chartData = Array.from({ length: 7 }).map((_, index) => {
    if (index === 0) {
      return {
        month: months[index],
        Learners: currentPayingStudents,
        Revenue: currentRevOverride
      };
    }
    const accumulatedLearners = Math.round(
      currentPayingStudents + (memberGap / monthsRemaining) * index
    );
    const cappedLearners = Math.min(accumulatedLearners, targetMembersDerived);
    return {
      month: months[index],
      Learners: cappedLearners,
      Revenue: cappedLearners * pricePerLearner
    };
  });

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1B26] border border-brand-blue/30 p-3 rounded-xl shadow-2xl text-white">
          <p className="font-bold text-xs text-white mb-2">{payload[0].payload.month}</p>
          <p className="text-xs font-mono text-brand-blue">Learners: <span className="font-bold text-white">{payload[0].payload.Learners}</span></p>
          <p className="text-xs font-mono text-brand-cheddar">MRR: <span className="font-bold text-white">{currencySymbol}{payload[0].payload.Revenue.toLocaleString()}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Weekly Performance Suite (requested by user) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Input Parameters Box */}
        <div className="lg:col-span-1 bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-brand-blue/10">
              <BarChart3 className="h-5 w-5 text-brand-cheddar" />
              <h3 className="text-xs uppercase tracking-wider text-white font-bold">Resolute Weekly Inputs</h3>
            </div>

            {/* Weekly Leads Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">Weekly Leads Received</label>
              <div className="relative">
                <input 
                  type="number"
                  min="0"
                  value={weeklyLeads}
                  onChange={(e) => setWeeklyLeads(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-brand-onyx/30 border border-brand-blue/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors font-mono font-bold"
                />
              </div>
            </div>

            {/* Weekly Conversions Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">Weekly Conversions</label>
              <input 
                type="number"
                min="0"
                value={weeklyConversions}
                onChange={(e) => setWeeklyConversions(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-brand-onyx/30 border border-brand-blue/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors font-mono font-bold"
              />
            </div>

            {/* Current Active Paying Students Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">Current Active Paying Students</label>
              <input 
                type="number"
                min="0"
                value={currentPayingStudents}
                onChange={(e) => setCurrentPayingStudents(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-brand-onyx/30 border border-brand-blue/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors font-mono font-bold"
              />
            </div>

            {/* Current Active Revenue Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">Current Revenue per month ({currencySymbol === "R" ? "ZAR" : currencySymbol})</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[11px] text-brand-coral font-bold">{currencySymbol}</span>
                <input 
                  type="number"
                  step="500"
                  min="0"
                  disabled
                  value={currentRevOverride}
                  className="w-full bg-brand-onyx/10 border border-brand-blue/10 rounded-xl pl-7 pr-3 py-2 text-xs text-gray-400 outline-none font-mono font-bold cursor-not-allowed"
                />
              </div>
              <span className="text-[9px] text-gray-500 block mt-0.5">Calculated from Paying Students &times; Tuition Fee</span>
            </div>

            {/* Projected Target Revenue Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">Projected Target MRR ({currencySymbol === "R" ? "ZAR" : currencySymbol})</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[11px] text-brand-cheddar font-bold">{currencySymbol}</span>
                <input 
                  type="number"
                  step="1000"
                  min="0"
                  value={projectedRevTarget}
                  onChange={(e) => {
                    const rev = Math.max(0, parseInt(e.target.value) || 0);
                    setProjectedRevTarget(rev);
                    setTargetLearners(Math.round(rev / pricePerLearner));
                  }}
                  className="w-full bg-brand-onyx/30 border border-brand-blue/20 rounded-xl pl-7 pr-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-blue/10 text-[10px] text-brand-coral font-medium leading-relaxed font-sans">
            * <strong>1 Learner = {currencySymbol}{pricePerLearner}/mo</strong>. Recalculations are processed dynamically to project growth run rates based on customized inputs.
          </div>
        </div>

        {/* Diagnostic Results Box */}
        <div className="lg:col-span-3 bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-blue/10 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Dynamic Operational Growth Modeling</h3>
                <p className="text-xs text-gray-400">Calculated velocity output using Franchise Success parameters</p>
              </div>
              <div className="text-[11px] text-brand-cheddar bg-brand-cheddar/10 border border-brand-cheddar/20 px-2.5 py-1 rounded-lg font-bold">
                Weekly Rate: {calculatedConvRate}%
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Output 1: Current Conversion Velocity */}
              <div className="p-4 rounded-xl bg-brand-onyx/20 border border-brand-blue/10">
                <span className="text-[10px] uppercase font-bold text-brand-coral">Conversion Velocity</span>
                <h4 className="text-xl font-bold text-white mt-1 font-mono font-sans">{weeklyConversions} students / wk</h4>
                <p className="text-[10px] text-gray-400 leading-normal mt-1">
                  At this speed, you generate ~<strong>{(weeklyConversions * 4.3).toFixed(0)} registrations</strong> per calendar month.
                </p>
              </div>

              {/* Output 2: Deficit Target Gap */}
              <div className="p-4 rounded-xl bg-brand-onyx/20 border border-brand-blue/10">
                <span className="text-[10px] uppercase font-bold text-brand-coral">Total Revenue Deficit</span>
                <h4 className="text-xl font-bold text-[#E8596D] mt-1 font-mono font-sans">{currencySymbol}{revenueGap.toLocaleString()}</h4>
                <p className="text-[10px] text-gray-400 leading-normal mt-1">
                  Representing a growth deficit of <strong>+{memberGap} active students</strong> at the Alberton club.
                </p>
              </div>

              {/* Output 3: Weeks to Target */}
              <div className="p-4 rounded-xl bg-brand-onyx/20 border border-brand-blue/10">
                <span className="text-[10px] uppercase font-bold text-brand-coral">Estimated Timeframe</span>
                <h4 className="text-xl font-bold text-brand-cheddar mt-1 font-mono font-sans">
                  {weeksRequired === 999 ? "∞" : `${weeksRequired} weeks`}
                </h4>
                <p className="text-[10px] text-gray-400 leading-normal mt-1">
                  Requires roughly <strong>{weeksRequired === 999 ? "N/A" : monthsRequired} months</strong> to reconcile the current franchise deficit.
                </p>
              </div>

              {/* Output 4: 6-Month Weekly Target Conversions */}
              <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-brand-cheddar">6-Month Target Velocity</span>
                <h4 className="text-xl font-bold text-brand-cheddar mt-1 font-mono font-sans">{weeklyConversionsNeeded6Months} / wk</h4>
                <p className="text-[10px] text-gray-300 leading-normal mt-1">
                  Conversions needed per week for the next 6 months to hit target.
                </p>
              </div>
            </div>

            {/* Quick Strategic Summary */}
            <div className="mt-4 p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl">
              <span className="block text-[11px] font-bold text-white uppercase tracking-wider">Strategic Run-Rate Insight for FSM:</span>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                To reach your target of <strong className="text-white">R{projectedRevTarget.toLocaleString()}/mo</strong> with a weekly campaign inflow of <strong>{weeklyLeads} inquiries</strong>, you must sustain highly prioritized sales reach. If you increase trials to close **{weeklyConversions + 1} students/week**, you will save approximately **{Math.max(0, Math.round(weeksRequired * 0.3))} weeks** of growth timeline!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-brand-blue/10 mt-4">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-brand-cheddar" />
              Formula-driven model calibrated on Alberton club data.
            </span>
          </div>
        </div>
      </div>

      {/* Goal Run Rate Simulator & Area charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Run-Rate Simulator (Goal focused) */}
        <div className="bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Coins className="h-5 w-5 text-brand-cheddar" />
              <h3 className="text-xs uppercase tracking-wider text-white font-bold">Strategic End-of-Year Target Planner</h3>
            </div>
            <p className="text-xs text-gray-400 mb-5">Adjust desired learners & conversion models to simulate essential ad volume inflows</p>

            <div className="space-y-4">
              
              {/* Target Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                  <span>Year-End Target:</span>
                  <span className="font-mono text-brand-cheddar font-bold">{targetLearners} Students</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={200} 
                  value={targetLearners}
                  onChange={(e) => setTargetLearners(Number(e.target.value))}
                  className="w-full h-1.5 bg-brand-onyx rounded-lg appearance-none cursor-pointer accent-brand-blue" 
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Min: 20 Std</span>
                  <span>Max: 200 Std</span>
                </div>
              </div>

              {/* Conversion Rate Picker */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                  <span>Conversion Rate:</span>
                  <span className="font-mono text-brand-blue font-bold">{customConvRate}%</span>
                </div>
                <input 
                  type="range" 
                  min={0.3} 
                  max={20.0} 
                  step={0.1}
                  value={customConvRate}
                  onChange={(e) => setCustomConvRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-brand-onyx rounded-lg appearance-none cursor-pointer accent-brand-cheddar" 
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Min: 0.3%</span>
                  <span>Max: 20%</span>
                </div>
              </div>

              <div className="border-t border-brand-blue/10 pt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Simulated Active Learners:</span>
                  <span className="font-mono font-bold text-white">{currentPayingStudents} Std ({currencySymbol}{currentRevOverride.toLocaleString()})</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Pending Student Deficit:</span>
                  <span className="font-mono font-bold text-brand-pink">+{gap} Students ({currencySymbol}{targetGapMRR.toLocaleString()})</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Target MRR Goal:</span>
                  <span className="font-mono font-bold text-brand-cheddar">{currencySymbol}{targetMRR.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-blue/10 border border-brand-blue/20 p-3 rounded-xl flex items-center justify-between text-xs text-gray-300 font-medium mt-6">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-brand-cheddar animate-spin-slow" />
              <span className="font-bold">Required Inbound Leads:</span>
            </div>
            <span className="font-mono font-bold text-sm text-brand-cheddar">{leadsPerMonthNeeded} leads / mo</span>
          </div>
        </div>

        {/* Target Chart Projections */}
        <div className="lg:col-span-2 bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">6-Month Growth & Revenue Run-Rate</h3>
                <p className="text-xs text-gray-400 font-sans">Visual math model to hit {currencySymbol}{projectedRevTarget.toLocaleString()}/mo from current {currencySymbol}{currentRevOverride.toLocaleString()}/mo</p>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-blue">
                <TrendingUp className="h-4 w-4" />
                <span>+{learnersPerMonth} new std / mo</span>
              </div>
            </div>

            <div className="min-h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8596D" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#E8596D" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLearners" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#313BF5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#313BF5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(49,59,245,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: "#A1A5B7", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#A1A5B7", fontSize: 10 }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area type="monotone" dataKey="Revenue" stroke="#E8596D" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Learners" stroke="#313BF5" fillOpacity={1} fill="url(#colorLearners)" strokeWidth={1} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CFO Insight Alert */}
          <div className="mt-4 p-3 bg-brand-pink/10 border border-brand-pink/20 rounded-xl flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-brand-pink shrink-0" />
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
              <strong>Checklist:</strong> Hitting {targetMembersDerived} active learners under our current weekly speed requires sustained trial closures. Implement direct booking links within the WhatsApp sequences to optimize friction.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
