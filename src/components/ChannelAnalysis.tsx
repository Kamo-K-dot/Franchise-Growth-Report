import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Lock, 
  Lightbulb, 
  Target, 
  Settings, 
  ArrowRight,
  TrendingUp,
  Sliders,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

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

  // Multiplier State: Typically how many interactions are required to trigger 1 paid sign-on
  // Ratios can go up to at least 150 as requested to accommodate high franchisee touchpoints
  const [whatsappPerConversion, setWhatsappPerConversion] = useState<number>(12);
  const [emailPerConversion, setEmailPerConversion] = useState<number>(20);
  const [phonePerConversion, setPhonePerConversion] = useState<number>(6);
  
  // Target conversion count inputs
  const [targetStudentRegistrations, setTargetStudentRegistrations] = useState<number>(15);

  // Overrides for current outreach sent to play around with and rectify (Sandbox Mode)
  const [useOverride, setUseOverride] = useState<boolean>(false);
  const [manualWhatsApp, setManualWhatsApp] = useState<number>(conversationsSummary.whatsapp);
  const [manualEmail, setManualEmail] = useState<number>(conversationsSummary.email);
  const [manualPhone, setManualPhone] = useState<number>(conversationsSummary.call);

  useEffect(() => {
    setManualWhatsApp(conversationsSummary.whatsapp);
    setManualEmail(conversationsSummary.email);
    setManualPhone(conversationsSummary.call);
  }, [conversationsSummary]);

  const currentWhatsApp = useOverride ? manualWhatsApp : conversationsSummary.whatsapp;
  const currentEmail = useOverride ? manualEmail : conversationsSummary.email;
  const currentPhone = useOverride ? manualPhone : conversationsSummary.call;
  const currentTotal = currentWhatsApp + currentEmail + currentPhone;

  // Calculate required totals based on dynamic inputs
  const requiredWhatsApp = targetStudentRegistrations * whatsappPerConversion;
  const requiredEmail = targetStudentRegistrations * emailPerConversion;
  const requiredPhone = targetStudentRegistrations * phonePerConversion;

  // Deficit calculation
  const whatsappDeficit = Math.max(0, requiredWhatsApp - currentWhatsApp);
  const emailDeficit = Math.max(0, requiredEmail - currentEmail);
  const phoneDeficit = Math.max(0, requiredPhone - currentPhone);

  // Dynamic bar data matching the user's required categories
  const barChartData = [
    {
      category: "WhatsApp Msg",
      "Completed (Current)": currentWhatsApp,
      "Required (To Close Goal)": requiredWhatsApp,
      "Remaining Outbound Gap": whatsappDeficit
    },
    {
      category: "Email Broadcasts",
      "Completed (Current)": currentEmail,
      "Required (To Close Goal)": requiredEmail,
      "Remaining Outbound Gap": emailDeficit
    },
    {
      category: "Phone Call Logs",
      "Completed (Current)": currentPhone,
      "Required (To Close Goal)": requiredPhone,
      "Remaining Outbound Gap": phoneDeficit
    }
  ];

  const pieData = [
    { name: "WhatsApp Campaigns", value: currentWhatsApp, color: "#313BF5", icon: MessageSquare, ratio: `${currentTotal > 0 ? ((currentWhatsApp / currentTotal) * 100).toFixed(0) : 0}%` },
    { name: "Email Broadcasts", value: currentEmail, color: "#FFB100", icon: Mail, ratio: `${currentTotal > 0 ? ((currentEmail / currentTotal) * 100).toFixed(0) : 0}%` },
    { name: "Phone Call Logs", value: currentPhone, color: "#E8596D", icon: Phone, ratio: `${currentTotal > 0 ? ((currentPhone / currentTotal) * 100).toFixed(0) : 0}%` }
  ];

  const recommendations = [
    {
      title: "Targeted Outreach Sequences",
      desc: "For the franchise success manager, trigger WhatsApp automated lists specifically to parents logged as 'waiting for response' to convert trials into student active status on-the-fly.",
      icon: Target,
      color: "from-brand-blue to-blue-800"
    },
    {
      title: "Personalized Callback Triggers",
      desc: "To bridge the phone call logs gap, deploy secondary direct SMS templates to parents who registered for the Winter Holiday Camp registrations campaign.",
      icon: Settings,
      color: "from-brand-pink to-brand-popstar"
    }
  ];

  return (
    <div className="space-y-6">

      {/* Inputs panel for communication ratios */}
      <div className="bg-[#121320] border border-brand-blue/15 rounded-2xl p-5 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-blue/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="h-4 w-4 text-brand-cheddar" />
            <div>
              <span className="block text-xs font-black uppercase text-white">Interactive Outreach Multipliers &amp; Target Goal Simulator</span>
              <span className="text-[10px] text-gray-400">Tweak touch-to-conversion weights to model required follow-ups for team targets. Supports up to 150 touchpoints.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-brand-onyx/20 px-3 py-1.5 rounded-xl border border-brand-blue/20">
            <input 
              type="checkbox" 
              id="sandbox-override"
              checked={useOverride}
              onChange={(e) => setUseOverride(e.target.checked)}
              className="h-3.5 w-3.5 accent-brand-cheddar rounded border-gray-300"
            />
            <label htmlFor="sandbox-override" className="text-xs text-white font-bold cursor-pointer select-none">
              Enable Sandbox Mode (Manual Overrides)
            </label>
          </div>
        </div>

        {/* Dynamic Sliders for Conversion Ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          {/* Target registrations slider */}
          <div className="bg-brand-onyx/10 border border-brand-blue/10 p-3.5 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-300 font-bold uppercase">Sign-On Target Goal</span>
              <span className="font-mono text-xs text-brand-cheddar font-bold">+{targetStudentRegistrations} kids</span>
            </div>
            <input 
              type="range"
              min={1}
              max={150}
              value={targetStudentRegistrations}
              onChange={(e) => setTargetStudentRegistrations(Number(e.target.value))}
              className="w-full h-1 bg-brand-onyx rounded-lg cursor-pointer accent-brand-cheddar"
            />
            <span className="text-[9px] text-gray-500 block leading-tight">Additional active students required inside this franchise.</span>
          </div>

          {/* WhatsApp multiplier */}
          <div className="bg-brand-onyx/10 border border-brand-blue/10 p-3.5 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-emerald-400 font-bold uppercase">WhatsApp Conv. Ratio</span>
              <span className="font-mono text-xs text-emerald-400 font-bold">{whatsappPerConversion} Touches</span>
            </div>
            <input 
              type="range"
              min={1}
              max={150}
              value={whatsappPerConversion}
              onChange={(e) => setWhatsappPerConversion(Number(e.target.value))}
              className="w-full h-1 bg-brand-onyx rounded-lg cursor-pointer accent-emerald-400"
            />
            <span className="text-[9px] text-gray-500 block leading-tight">Estimated bulk messages sent to obtain 1 registration. (Max 150)</span>
          </div>

          {/* Email multiplier */}
          <div className="bg-brand-onyx/10 border border-brand-blue/10 p-3.5 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-brand-cheddar font-bold uppercase">Email Conv. Ratio</span>
              <span className="font-mono text-xs text-brand-cheddar font-bold">{emailPerConversion} Touches</span>
            </div>
            <input 
              type="range"
              min={1}
              max={150}
              value={emailPerConversion}
              onChange={(e) => setEmailPerConversion(Number(e.target.value))}
              className="w-full h-1 bg-brand-onyx rounded-lg cursor-pointer accent-brand-cheddar"
            />
            <span className="text-[9px] text-gray-500 block leading-tight">Mailed campaigns released to score 1 signed student. (Max 150)</span>
          </div>

          {/* Phone call multiplier */}
          <div className="bg-brand-onyx/10 border border-brand-blue/10 p-3.5 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-brand-pink font-bold uppercase">Phone Call Ratio</span>
              <span className="font-mono text-xs text-brand-pink font-bold">{phonePerConversion} Touches</span>
            </div>
            <input 
              type="range"
              min={1}
              max={150}
              value={phonePerConversion}
              onChange={(e) => setPhonePerConversion(Number(e.target.value))}
              className="w-full h-1 bg-brand-onyx rounded-lg cursor-pointer accent-brand-pink"
            />
            <span className="text-[9px] text-gray-500 block leading-tight">Successful voice calls made per closed student roll-on. (Max 150)</span>
          </div>
        </div>

        {/* Sandbox Override Input Form (Enabled when useOverride is checked) */}
        {useOverride && (
          <div className="bg-brand-blue/10 border border-brand-blue/30 p-4 rounded-xl space-y-3">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-cheddar">Outreach Sandbox Playground Inputs</span>
            <p className="text-xs text-gray-300">
              Manually modify the outbound counts below to rectify files or play around and project how many touches you need to hit the target.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">WhatsApp Sent Sandbox</label>
                <input 
                  type="number"
                  min="0"
                  value={manualWhatsApp}
                  onChange={(e) => setManualWhatsApp(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-brand-onyx/40 border border-brand-blue/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Emails Sent Sandbox</label>
                <input 
                  type="number"
                  min="0"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-brand-onyx/40 border border-brand-blue/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Phone Calls Made Sandbox</label>
                <input 
                  type="number"
                  min="0"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-brand-onyx/40 border border-brand-blue/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar font-mono font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Comparative Analytical Insight */}
        <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl space-y-3">
          <span className="block text-xs font-black text-white uppercase tracking-wider">
            FSM Conversion Ratio Diagnostics &amp; Comparison Source
          </span>
          <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
            <p>
              We are comparing your <strong>completed outreach touches</strong> (which update dynamically when you upload a CSV or customize the <strong className="text-brand-cheddar">Sandbox Overrides</strong> above) against the <strong>minimum required touches</strong> to successfully enroll <strong className="text-white">+{targetStudentRegistrations}</strong> students.
            </p>
            <p className="text-[11px] text-gray-400">
              The target touches are computed as: <code className="text-brand-cheddar font-mono">Target Sign-Ons ({targetStudentRegistrations}) &times; Conversion Ratio</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Phone call diagnostics */}
              <div className={`p-3 rounded-lg border ${currentPhone >= requiredPhone ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#E8596D]/10 border-[#E8596D]/20'}`}>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Voice Phone Calls</span>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="font-mono text-sm font-bold text-white">{currentPhone} / {requiredPhone}</span>
                  <span className={`text-[9px] font-extrabold uppercase ${currentPhone >= requiredPhone ? 'text-emerald-400' : 'text-brand-pink'}`}>
                    {currentPhone >= requiredPhone ? '✅ Met Goal' : '⚠️ Behind'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {currentPhone >= requiredPhone 
                    ? `Done! Exceeds required phone calls.` 
                    : `Make ${requiredPhone - currentPhone} more calls to close target.`}
                </p>
              </div>

              {/* WhatsApp diagnostics */}
              <div className={`p-3 rounded-lg border ${currentWhatsApp >= requiredWhatsApp ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#E8596D]/10 border-[#E8596D]/20'}`}>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">WhatsApp Messages</span>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="font-mono text-sm font-bold text-white">{currentWhatsApp} / {requiredWhatsApp}</span>
                  <span className={`text-[9px] font-extrabold uppercase ${currentWhatsApp >= requiredWhatsApp ? 'text-emerald-400' : 'text-brand-pink'}`}>
                    {currentWhatsApp >= requiredWhatsApp ? '✅ Met Goal' : '⚠️ Behind'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {currentWhatsApp >= requiredWhatsApp 
                    ? `Done! Exceeds required WhatsApp messages.` 
                    : `Send ${requiredWhatsApp - currentWhatsApp} more msgs to close target.`}
                </p>
              </div>

              {/* Email diagnostics */}
              <div className={`p-3 rounded-lg border ${currentEmail >= requiredEmail ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#E8596D]/10 border-[#E8596D]/20'}`}>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Email Broadcasts</span>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="font-mono text-sm font-bold text-white">{currentEmail} / {requiredEmail}</span>
                  <span className={`text-[9px] font-extrabold uppercase ${currentEmail >= requiredEmail ? 'text-emerald-400' : 'text-brand-pink'}`}>
                    {currentEmail >= requiredEmail ? '✅ Met Goal' : '⚠️ Behind'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {currentEmail >= requiredEmail 
                    ? `Done! Exceeds required emails.` 
                    : `Send ${requiredEmail - currentEmail} more emails to close target.`}
                </p>
              </div>
            </div>

            <p className="text-[10.5px] text-gray-450 mt-2">
              {currentPhone >= requiredPhone && currentWhatsApp >= requiredWhatsApp && currentEmail >= requiredEmail ? (
                <span className="text-emerald-400 font-bold block">
                  🎉 Fantastic work! Your outreach channels (including your Sandbox adjustments) fully meet or exceed the target sign-on requirements. Keep up this high frequency of manual touches!
                </span>
              ) : (
                <span className="text-brand-pink font-bold block">
                  ⚠️ Note: You still have outreach deficits in some channels. To clear the deficit for any channel, use the Sandbox Overrides above to increase your manual outreach numbers or make more touches!
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Engagement Channels */}
        <div className="bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-white font-bold mb-4">Interactions Loaded on File</h3>
            <p className="text-xs text-gray-400 mb-4">Cumulative touches calculated directly from the parsed records file</p>

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
                  <RechartsTooltip formatter={(value) => [`${value} logs`, "Volume"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">File Touches</span>
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

          <div className="p-3.5 bg-brand-blue/5 border border-brand-blue/20 rounded-xl mt-4 flex items-center gap-3">
            <Lock className="h-4 w-4 text-brand-cheddar shrink-0" />
            <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
              <strong>FSM Advisory Note:</strong> Outreach indicators are configured recursively to compare parsed logs directly to simulated sign-on target goals shown on the right.
            </p>
          </div>
        </div>

        {/* Dynamic Target Deficit Chart View */}
        <div className="lg:col-span-2 bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white font-bold">Target Achievement Outreach Deficit</h3>
                <p className="text-xs text-gray-400">Comparing current uploaded touches against target required actions to convert <span className="text-brand-cheddar">+{targetStudentRegistrations}</span> pupils</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs bg-brand-cheddar/10 border border-brand-cheddar/20 px-3 py-1 rounded-xl text-brand-cheddar">
                <TrendingUp className="h-4 w-4 animate-bounce" />
                <span className="font-bold">Graph Comparison Mode</span>
              </div>
            </div>

            {/* Recharts Bar Chart visualizing comparison */}
            <div className="w-full h-56 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} />
                  <XAxis dataKey="category" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#111221", borderColor: "#313bf530" }} />
                  <Legend wrapperStyle={{ fontSize: 9 }} />
                  <Bar dataKey="Completed (Current)" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Required (To Close Goal)" fill="#313BF5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Remaining Outbound Gap" fill="#E8596D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Numeric Gap Results indicators */}
            <div className="grid grid-cols-3 gap-3.5 mt-4">
              <div className="p-3 bg-brand-blue/5 border border-brand-blue/10 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block uppercase font-mono">WhatsApp Deficit</span>
                <span className={`text-sm font-mono font-bold ${whatsappDeficit > 0 ? "text-brand-pink" : "text-emerald-400"}`}>
                  {whatsappDeficit > 0 ? `+${whatsappDeficit} msgs` : "0 (Met)"}
                </span>
              </div>
              <div className="p-3 bg-[#FFB100]/5 border border-[#FFB100]/10 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block uppercase font-mono">Mail Deficit</span>
                <span className={`text-sm font-mono font-bold ${emailDeficit > 0 ? "text-brand-cheddar" : "text-emerald-400"}`}>
                  {emailDeficit > 0 ? `+${emailDeficit} emails` : "0 (Met)"}
                </span>
              </div>
              <div className="p-3 bg-brand-pink/5 border border-brand-pink/10 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block uppercase font-mono">Voice Call Deficit</span>
                <span className={`text-sm font-mono font-bold ${phoneDeficit > 0 ? "text-brand-pink" : "text-emerald-400"}`}>
                  {phoneDeficit > 0 ? `+${phoneDeficit} calls` : "0 (Met)"}
                </span>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-brand-blue/10 text-[10px] text-gray-400 leading-relaxed font-sans flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-brand-coral shrink-0" />
            <span>Outbound indicators show approximate outreach scale required based on selected conversions ratios. Make call schedules accordingly.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
