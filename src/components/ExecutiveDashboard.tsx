import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  RotateCcw, 
  Upload, 
  DollarSign, 
  Percent, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Sliders, 
  Award, 
  Zap,
  ChevronRight,
  FileSpreadsheet,
  Edit3,
  Printer,
  Download,
  Building2,
  FileText
} from "lucide-react";

interface ExecutiveDashboardProps {
  clubName: string;
  currencySymbol: string;
  onResetApp: () => void;
  onUploadLeadsCSV: () => void;
  onUploadMembersCSV: () => void;
}

export default function ExecutiveDashboard({
  clubName,
  currencySymbol,
  onResetApp,
  onUploadLeadsCSV,
  onUploadMembersCSV
}: ExecutiveDashboardProps) {
  // THIS MONTH'S DYNAMIC MANUAL & CSV INPUT METRICS
  const [activeMembers, setActiveMembers] = useState<number>(11); // Exactly 11 active monthly members
  const [totalLeads, setTotalLeads] = useState<number>(120);
  const [leadsContacted, setLeadsContacted] = useState<number>(75);
  const [contactFrequency, setContactFrequency] = useState<number>(2.2);
  const [trialClasses, setTrialClasses] = useState<number>(8);
  const [tuitionFee, setTuitionFee] = useState<number>(1200);

  // SIMPLIFIED COMMUNICATION BREAKDOWN STATE
  const [whatsappCount, setWhatsappCount] = useState<number>(45);
  const [emailCount, setEmailCount] = useState<number>(20);
  const [phoneCallCount, setPhoneCallCount] = useState<number>(10);
  const [smsCount, setSmsCount] = useState<number>(0);

  // ACTION FROM CONTACT STATE
  const [actionTrials, setActionTrials] = useState<number>(8);
  const [actionMeetings, setActionMeetings] = useState<number>(5);
  const [actionEnrolled, setActionEnrolled] = useState<number>(11);

  // Toggle Edit mode for inputs
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // AUTO-CALCULATED VALUES
  const conversionRateTotal = totalLeads > 0 
    ? ((activeMembers / totalLeads) * 100).toFixed(1) 
    : "0.0";

  const conversionRateContacted = leadsContacted > 0 
    ? ((activeMembers / leadsContacted) * 100).toFixed(1) 
    : "0.0";

  const revenueDueThisMonth = activeMembers * tuitionFee;

  const handlePrint = () => {
    try {
      // Try standard print first
      window.print();
    } catch (e) {
      console.warn("Direct window.print() blocked, creating print pop-up window fallback", e);
    }
    
    // Fallback printable popup window for environments where iframe print is intercepted or restricted
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Executive Health Statement - ${clubName}</title>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #0f172a; background: #fff; }
              .header { border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px; }
              .title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; }
              .subtitle { font-size: 14px; color: #64748b; margin-top: 4px; }
              .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
              .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
              .card-title { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; }
              .card-value { font-size: 24px; font-weight: 900; color: #0f172a; margin: 8px 0 4px; font-family: monospace; }
              .card-sub { font-size: 11px; color: #059669; font-weight: 600; }
              table { width: 100%; border-collapse: collapse; margin-top: 16px; }
              th { text-align: left; background: #f1f5f9; padding: 10px; font-size: 11px; text-transform: uppercase; color: #475569; }
              td { padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
              .section-title { font-size: 16px; font-weight: 800; margin-top: 24px; margin-bottom: 8px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="title">${clubName} Franchise — Executive Health Statement</h1>
              <p class="subtitle">Generated on ${currentDateStr} • Resolute Education Group</p>
            </div>

            <div class="grid">
              <div class="card">
                <div class="card-title">Active Members</div>
                <div class="card-value">${activeMembers}</div>
                <div class="card-sub">Monthly Paying Students</div>
              </div>
              <div class="card">
                <div class="card-title">Revenue Due This Month</div>
                <div class="card-value">${currencySymbol}${revenueDueThisMonth.toLocaleString()}</div>
                <div class="card-sub">${activeMembers} × ${currencySymbol}${tuitionFee}/mo</div>
              </div>
              <div class="card">
                <div class="card-title">Conversion Rate</div>
                <div class="card-value">${conversionRateTotal}%</div>
                <div class="card-sub">Total Leads &rarr; Members</div>
              </div>
              <div class="card">
                <div class="card-title">Free Trials Booked</div>
                <div class="card-value">${trialClasses}</div>
                <div class="card-sub">Trial Attendees</div>
              </div>
            </div>

            <div class="section-title">Active Members Directory (${activeMembers})</div>
            <table>
              <thead>
                <tr>
                  <th>Learner Name</th>
                  <th>Parent / Guardian</th>
                  <th>Contact Phone</th>
                  <th>Status</th>
                  <th style="text-align: right">Monthly Tuition</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Oatile Malahlela</td><td>Nomonde P Malahlela</td><td>+27 76 096 6125</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Njanyezi Shozi</td><td>Thandeka Shozi</td><td>+27 82 561 5471</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Tumi Bhengu</td><td>Sipho Bhengu</td><td>+27 83 234 5678</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Aarav Sharma</td><td>Priya Sharma</td><td>+27 84 345 6789</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Jessica Smith</td><td>David Smith</td><td>+27 81 987 6543</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Thabo Mokoena</td><td>Lerato Mokoena</td><td>+27 72 876 5432</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Zoe Van Zyl</td><td>Anneri Van Zyl</td><td>+27 79 123 4567</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Liam Patel</td><td>Ketan Patel</td><td>+27 71 555 0192</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Kabelo Dlamini</td><td>Busisiwe Dlamini</td><td>+27 82 444 3322</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Boyza Tlou</td><td>Tshepo Tlou</td><td>+27 83 456 7890</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
                <tr><td>Nikky Van Tonder</td><td>Stephan Van Tonder</td><td>+27 82 111 2233</td><td>Active Member</td><td style="text-align: right">${currencySymbol}${tuitionFee}</td></tr>
              </tbody>
            </table>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 text-slate-900">
      
      {/* Top Banner / Actions (Light Theme & Print Header) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200">
              Executive Health Statement • {currentDateStr}
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              {clubName} Node
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Club Health & Operations Summary
          </h2>
          <p className="text-xs text-slate-500">
            Simplified monthly report: Active monthly members, revenue due this month, and core outreach conversion metrics.
          </p>
        </div>

        {/* Global Control Buttons (Hidden in print) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-zaffre text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-brand-blue/20"
          >
            <Printer className="h-4 w-4" />
            <span>Export / Print Health Report</span>
          </button>

          <button
            onClick={onResetApp}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer"
            title="Restart app and reset metrics back to initial clean state"
          >
            <RotateCcw className="h-4 w-4 text-rose-600" />
            <span>Restart App</span>
          </button>

          <button
            onClick={onUploadLeadsCSV}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Upload className="h-4 w-4 text-blue-600" />
            <span>CSV 1 (Leads)</span>
          </button>

          <button
            onClick={onUploadMembersCSV}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>CSV 2 (Members)</span>
          </button>
        </div>
      </div>

      {/* THIS MONTH'S ABSOLUTE BASIC STATS (Light Theme Metric Cards) */}
      <div className="break-inside-avoid">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-extrabold text-slate-900">This Month's Key Performance Numbers</h3>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="no-print flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-600" />
            <span>{isEditing ? "Close Inputs" : "Input / Modify This Month's Numbers"}</span>
          </button>
        </div>

        {/* Dynamic Metric Cards (Crisp White + Borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Active Members */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Monthly Members</span>
              <div className="p-2 bg-emerald-100/80 rounded-xl">
                <Users className="h-4 w-4 text-emerald-700" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono mb-1">
              {activeMembers}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold">
              Paying monthly members (Excludes holiday camp)
            </p>
          </div>

          {/* 2. Revenue Due THIS Month */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue Due THIS Month</span>
              <div className="p-2 bg-blue-100/80 rounded-xl">
                <DollarSign className="h-4 w-4 text-blue-700" />
              </div>
            </div>
            <div className="text-3xl font-black text-blue-700 font-mono mb-1">
              {currencySymbol}{revenueDueThisMonth.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-600 font-semibold">
              Calculated: {activeMembers} × {currencySymbol}{tuitionFee.toLocaleString()}/mo tuition
            </p>
          </div>

          {/* 3. Conversion Rate */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">This Month's Conversion</span>
              <div className="p-2 bg-amber-100/80 rounded-xl">
                <Percent className="h-4 w-4 text-amber-700" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-700 font-mono mb-1">
              {conversionRateTotal}%
            </div>
            <p className="text-[11px] text-amber-800 font-semibold">
              ({conversionRateContacted}% of contacted leads)
            </p>
          </div>

          {/* 4. Trial Classes Booked */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trial Classes Booked</span>
              <div className="p-2 bg-purple-100/80 rounded-xl">
                <Zap className="h-4 w-4 text-purple-700" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono mb-1">
              {trialClasses}
            </div>
            <p className="text-[11px] text-purple-700 font-semibold">
              Trial attendees this month
            </p>
          </div>

        </div>
      </div>

      {/* MANUAL OVERRIDE INPUT FORM (Light Mode - Hidden in print) */}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="no-print bg-slate-50 border border-brand-blue/30 rounded-2xl p-6 shadow-md space-y-4"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Sliders className="h-4 w-4 text-brand-blue" />
            <h4 className="text-sm font-bold text-slate-900">Manual Metric Generator (Auto-Calculates Conversion & Revenue)</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            
            <div>
              <label className="block text-slate-600 font-bold mb-1">Active Monthly Members</label>
              <input 
                type="number" 
                value={activeMembers}
                onChange={(e) => setActiveMembers(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">This Month's Total Leads</label>
              <input 
                type="number" 
                value={totalLeads}
                onChange={(e) => setTotalLeads(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Leads Contacted</label>
              <input 
                type="number" 
                value={leadsContacted}
                onChange={(e) => setLeadsContacted(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Contact Frequency (Times)</label>
              <input 
                type="number" 
                step="0.1"
                value={contactFrequency}
                onChange={(e) => setContactFrequency(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Trial Classes Booked</label>
              <input 
                type="number" 
                value={trialClasses}
                onChange={(e) => setTrialClasses(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Monthly Tuition ({currencySymbol})</label>
              <input 
                type="number" 
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold outline-none focus:border-brand-blue"
              />
            </div>

          </div>

          <p className="text-[11px] text-brand-blue font-semibold italic">
            * Adjusting any input field instantly updates Conversion Rate ({conversionRateTotal}%) and Revenue Due ({currencySymbol}{revenueDueThisMonth.toLocaleString()}).
          </p>
        </motion.div>
      )}

      {/* SIMPLIFIED COMMUNICATION RATIOS PART (Light Theme) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 break-inside-avoid">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-600" />
              <span>Simplified Communication Ratios & Channels</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct breakdown of outreach volume, contact methods, and converted trial/meeting actions.
            </p>
          </div>
        </div>

        {/* 4 Clean Interactive Light Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          {/* Block 1: Leads Contacted */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px] block">1. Leads Contacted This Month</span>
            <div className="flex items-center justify-between">
              <input 
                type="number" 
                value={leadsContacted}
                onChange={(e) => setLeadsContacted(parseInt(e.target.value) || 0)}
                className="text-2xl font-black text-slate-900 font-mono bg-transparent w-24 outline-none border-b border-slate-300 focus:border-blue-600"
              />
              <span className="text-slate-500 text-[10px] font-semibold">/ {totalLeads} Total Leads</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, totalLeads > 0 ? (leadsContacted / totalLeads) * 100 : 0)}%` }}
              />
            </div>
          </div>

          {/* Block 2: How Many Times Contacted */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px] block">2. Frequency of Contact</span>
            <div className="flex items-center justify-between">
              <input 
                type="number" 
                step="0.1"
                value={contactFrequency}
                onChange={(e) => setContactFrequency(parseFloat(e.target.value) || 0)}
                className="text-2xl font-black text-purple-700 font-mono bg-transparent w-24 outline-none border-b border-slate-300 focus:border-purple-600"
              />
              <span className="text-slate-500 text-[10px] font-semibold">Touches per Lead</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              Avg. contact touches before decision
            </p>
          </div>

          {/* Block 3: Form of Contact */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px] block">3. Form of Contact</span>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-emerald-700 font-bold"><MessageSquare className="h-3 w-3" /> WhatsApp</span>
                <input 
                  type="number" 
                  value={whatsappCount} 
                  onChange={(e) => setWhatsappCount(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-slate-900 font-mono font-bold border-b border-slate-300"
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-blue-700 font-bold"><Mail className="h-3 w-3" /> Email</span>
                <input 
                  type="number" 
                  value={emailCount} 
                  onChange={(e) => setEmailCount(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-slate-900 font-mono font-bold border-b border-slate-300"
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-amber-700 font-bold"><PhoneCall className="h-3 w-3" /> Phone Call</span>
                <input 
                  type="number" 
                  value={phoneCallCount} 
                  onChange={(e) => setPhoneCallCount(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-slate-900 font-mono font-bold border-b border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Block 4: Action From Contact */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px] block">4. Action From Contact</span>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-700 font-bold">⚡ Booked Free Trial</span>
                <input 
                  type="number" 
                  value={actionTrials} 
                  onChange={(e) => setActionTrials(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-purple-700 font-mono font-bold border-b border-slate-300"
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-blue-700 font-bold">🤝 Booked Meeting</span>
                <input 
                  type="number" 
                  value={actionMeetings} 
                  onChange={(e) => setActionMeetings(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-blue-700 font-mono font-bold border-b border-slate-300"
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-black">🎓 Enrolled Member</span>
                <input 
                  type="number" 
                  value={actionEnrolled} 
                  onChange={(e) => setActionEnrolled(parseInt(e.target.value) || 0)}
                  className="w-12 text-right bg-transparent text-emerald-800 font-mono font-black border-b border-slate-300"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ACTIVE MONTHLY MEMBERS LIST (EXCLUSIVELY 11 PAYING MEMBERS - Light Theme Table) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <span>Active Monthly Paying Members ({activeMembers})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Verified active recurring monthly club members (Holiday camp registrants excluded).
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl font-mono">
            {currencySymbol}{revenueDueThisMonth.toLocaleString()} Due This Month
          </span>
        </div>

        {/* Clean Light Theme Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Learner Name</th>
                <th className="p-3">Parent / Guardian</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Monthly Tuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900">
              {[
                { student: "Oatile Malahlela", parent: "Nomonde P Malahlela", phone: "+27 76 096 6125", status: "Active Monthly Member" },
                { student: "Njanyezi Shozi", parent: "Thandeka Shozi", phone: "+27 82 561 5471", status: "Active Monthly Member" },
                { student: "Greylin Pillay", parent: "Mary-cell Petersen", phone: "+27 62 314 6045", status: "Active Monthly Member" },
                { student: "Eon de Witt", parent: "Wendy de Witt", phone: "+27 83 380 9476", status: "Active Monthly Member" },
                { student: "Mason Naude", parent: "Jessica Naude", phone: "+27 74 137 9567", status: "Active Monthly Member" },
                { student: "Mehaan Bhikha", parent: "Deepa", phone: "+27 72 455 9450", status: "Active Monthly Member" },
                { student: "Amir Rassool", parent: "Imraan Rassool", phone: "+27 79 671 4096", status: "Active Monthly Member" },
                { student: "Katleho Webb", parent: "Alfreda Webb-Mokele", phone: "+27 82 990 1234", status: "Active Monthly Member" },
                { student: "Doctor Sondlane", parent: "Kealeboga Sondlane", phone: "+27 71 888 2345", status: "Active Monthly Member" },
                { student: "Boyza Tlou", parent: "Tshepo Tlou", phone: "+27 83 456 7890", status: "Active Monthly Member" },
                { student: "Nikky Van Tonder", parent: "Stephan Van Tonder", phone: "+27 82 111 2233", status: "Active Monthly Member" },
              ].slice(0, activeMembers).map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-extrabold text-slate-900">{item.student}</td>
                  <td className="p-3 text-slate-700">{item.parent}</td>
                  <td className="p-3 font-mono text-slate-500 text-[11px]">{item.phone}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono font-extrabold text-slate-900">
                    {currencySymbol}{tuitionFee.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

