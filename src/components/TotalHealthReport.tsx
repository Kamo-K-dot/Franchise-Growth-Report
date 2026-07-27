import React from "react";
import { motion } from "motion/react";
import { 
  Printer, 
  Download, 
  Sparkles, 
  Users, 
  Phone, 
  Calendar, 
  Target, 
  CheckCircle2, 
  Clock
} from "lucide-react";

interface TotalHealthReportProps {
  clubName: string;
  currencySymbol: string;
  hqLeadsGenerated: number;
  setHqLeadsGenerated: (val: number) => void;
  totalLearnersAdded: number;
  setTotalLearnersAdded: (val: number) => void;
  totalLeadsContacted: number;
  setTotalLeadsContacted: (val: number) => void;
  totalFreeTrials: number;
  setTotalFreeTrials: (val: number) => void;
  totalAmountGenerated: number;
  setTotalAmountGenerated: (val: number) => void;
  clubTotalLearners: number;
  setClubTotalLearners: (val: number) => void;
  yearTargetStudents: number;
  setYearTargetStudents: (val: number) => void;
  yearTargetRevenue: number;
  setYearTargetRevenue: (val: number) => void;
  revenueToDate: number;
  setRevenueToDate: (val: number) => void;
  studentsToDate: number;
  setStudentsToDate: (val: number) => void;
}

export default function TotalHealthReport({
  clubName,
  currencySymbol,
  hqLeadsGenerated,
  setHqLeadsGenerated,
  totalLearnersAdded,
  setTotalLearnersAdded,
  totalLeadsContacted,
  setTotalLeadsContacted,
  totalFreeTrials,
  setTotalFreeTrials,
  totalAmountGenerated,
  setTotalAmountGenerated,
  clubTotalLearners,
  setClubTotalLearners,
  yearTargetStudents,
  setYearTargetStudents,
  yearTargetRevenue,
  setYearTargetRevenue,
  revenueToDate,
  setRevenueToDate,
  studentsToDate,
  setStudentsToDate
}: TotalHealthReportProps) {

  // Calculations derived purely from manual inputs
  const studentTargetProgress = yearTargetStudents > 0 
    ? Math.min(100, Math.round((studentsToDate / yearTargetStudents) * 100)) 
    : 0;
  const studentDeficit = Math.max(0, yearTargetStudents - studentsToDate);

  const revenueTargetProgress = yearTargetRevenue > 0 
    ? Math.min(100, Math.round((revenueToDate / yearTargetRevenue) * 100)) 
    : 0;
  const revenueDeficit = Math.max(0, yearTargetRevenue - revenueToDate);

  const trialConversionRate = totalLeadsContacted > 0 
    ? Math.min(100, Number(((totalFreeTrials / totalLeadsContacted) * 100).toFixed(1))) 
    : "0.0";

  const learnerConversionRate = totalFreeTrials > 0 
    ? Math.min(100, Number(((totalLearnersAdded / totalFreeTrials) * 100).toFixed(1))) 
    : "0.0";

  const generateReportHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${clubName} - Total Health Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      margin: 0;
      padding: 36px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .container {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 18px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .subtitle {
      color: #2563eb;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 4px;
    }
    .meta {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #64748b;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1e293b;
      margin-top: 24px;
      margin-bottom: 12px;
      border-left: 4px solid #2563eb;
      padding-left: 10px;
    }
    .grid {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }
    .grid-2 {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
    }
    .card-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .card-value {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      font-family: 'JetBrains Mono', monospace;
    }
    .progress-bar-bg {
      background: #e2e8f0;
      height: 6px;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 6px;
    }
    .progress-bar-fill {
      background: #2563eb;
      height: 100%;
      border-radius: 999px;
    }
    .footer {
      margin-top: 32px;
      border-top: 1px solid #e2e8f0;
      padding-top: 14px;
      text-align: center;
      font-size: 9px;
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
    }
    @media print {
      body { padding: 0; }
      .container { border: none; shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 class="title">Resolute Education</h1>
        <div class="subtitle">Total Club Health Report &bull; ${clubName}</div>
      </div>
      <div class="meta">
        <div>Date Generated: <strong>${new Date().toISOString().split('T')[0]}</strong></div>
        <div>Report Status: <strong>User Verified Inputs</strong></div>
      </div>
    </div>

    <div class="section-title">1. Monthly Operational Performance</div>
    <div class="grid">
      <div class="card">
        <div class="card-label">Learners Added This Month</div>
        <div class="card-value" style="color: #2563eb;">+${totalLearnersAdded}</div>
      </div>
      <div class="card">
        <div class="card-label">Leads Contacted This Month</div>
        <div class="card-value">${totalLeadsContacted}</div>
      </div>
      <div class="card">
        <div class="card-label">Total Free Trials</div>
        <div class="card-value">${totalFreeTrials}</div>
      </div>
      <div class="card">
        <div class="card-label">Amount Generated This Month</div>
        <div class="card-value" style="color: #16a34a;">${currencySymbol}${totalAmountGenerated.toLocaleString()}</div>
      </div>
      <div class="card">
        <div class="card-label">Club Total Learners</div>
        <div class="card-value">${clubTotalLearners}</div>
      </div>
      <div class="card">
        <div class="card-label">Trial Close Ratio (Trials &rarr; Learners)</div>
        <div class="card-value" style="color: #d97706;">${learnerConversionRate}%</div>
        <div style="font-size: 9px; color: #64748b; margin-top: 3px;">${totalLearnersAdded} learners closed / ${totalFreeTrials} free trials</div>
      </div>
    </div>

    <div class="section-title">2. Year-To-Date & Target Progress</div>
    <div class="grid-2">
      <div class="card">
        <div class="card-label">Students To Date vs Year Target</div>
        <div class="card-value">${studentsToDate} / ${yearTargetStudents}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Progress: <strong>${studentTargetProgress}%</strong> (Deficit: ${studentDeficit} students)</div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${studentTargetProgress}%;"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-label">Revenue To Date vs Year Target</div>
        <div class="card-value">${currencySymbol}${revenueToDate.toLocaleString()} / ${currencySymbol}${yearTargetRevenue.toLocaleString()}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Progress: <strong>${revenueTargetProgress}%</strong> (Deficit: ${currencySymbol}${revenueDeficit.toLocaleString()})</div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${revenueTargetProgress}%; background: #16a34a;"></div>
        </div>
      </div>
    </div>

    <div class="footer">
      CONFIDENTIAL TOTAL HEALTH REPORT &bull; RESOLUTE EDUCATION &bull; GENERATED BASED ON USER MANUAL INPUTS ONLY
    </div>
  </div>
</body>
</html>`;
  };

  const handlePrintReport = () => {
    const htmlContent = generateReportHTML();
    const printWindow = window.open("", "_blank", "width=850,height=900");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const handleDownloadHTMLReport = () => {
    const htmlContent = generateReportHTML();
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${clubName}_Total_Health_Report.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Title & Instructions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-200">
              Report Generator
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-600" /> Manual Data Input Mode
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Build Total Health Report
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Type in your monthly and year-to-date metrics below. The total report is generated exclusively from these manual inputs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer border border-slate-300"
          >
            <Printer className="h-4 w-4 text-slate-600" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={handleDownloadHTMLReport}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-brand-blue hover:bg-brand-zaffre text-white transition-all shadow-sm cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Section 1: Monthly Inputs */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 mb-4 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-blue" />
            <span>Monthly Performance Inputs (This Month)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Leads Generated by Resolute (HQ) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Leads Generated by Resolute (HQ) *
              </label>
              <div className="relative flex items-center">
                <Target className="absolute left-3 h-4 w-4 text-brand-blue pointer-events-none" />
                <input
                  type="number"
                  min={0}
                  value={hqLeadsGenerated}
                  onChange={(e) => setHqLeadsGenerated(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-blue-50/40 border border-blue-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 100"
                />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Total leads assigned/generated by HQ</span>
            </div>

            {/* 2. Total Learners Added This Month */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Total Learners Added This Month *
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min={0}
                  value={totalLearnersAdded}
                  onChange={(e) => setTotalLearnersAdded(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 20"
                />
              </div>
              <span className="text-[10px] text-slate-400">Newly signed paid students this month</span>
            </div>

            {/* 2. Total Leads Contacted This Month */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Total Leads Contacted This Month *
              </label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min={0}
                  value={totalLeadsContacted}
                  onChange={(e) => setTotalLeadsContacted(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 85"
                />
              </div>
              <span className="text-[10px] text-slate-400">Phone, email, or text touches made</span>
            </div>

            {/* 3. Total Free Trials */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Total Free Trials *
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min={0}
                  value={totalFreeTrials}
                  onChange={(e) => setTotalFreeTrials(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 18"
                />
              </div>
              <span className="text-[10px] text-slate-400">Trial studio sessions booked or attended</span>
            </div>

            {/* 4. Total Amount Generated This Month */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Total Amount Generated This Month *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-bold text-slate-500 font-mono pointer-events-none">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min={0}
                  value={totalAmountGenerated}
                  onChange={(e) => setTotalAmountGenerated(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 16800"
                />
              </div>
              <span className="text-[10px] text-slate-400">Total monthly revenue generated</span>
            </div>

            {/* 5. Club Total Learners */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Club Total Learners *
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min={0}
                  value={clubTotalLearners}
                  onChange={(e) => setClubTotalLearners(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 112"
                />
              </div>
              <span className="text-[10px] text-slate-400">Total active enrolled headcount in club</span>
            </div>

          </div>
        </div>

        {/* Section 2: Year Targets & Cumulative Inputs */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 mb-4 border-b border-slate-200 flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-600" />
            <span>Year Targets &amp; Cumulative Metrics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Year Target Students */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Year Target Students *
              </label>
              <input
                type="number"
                min={0}
                value={yearTargetStudents}
                onChange={(e) => setYearTargetStudents(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 150"
              />
              <span className="text-[10px] text-slate-400">Annual student enrollment target</span>
            </div>

            {/* Year Target Revenue */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Year Target Revenue *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-slate-500 font-mono pointer-events-none">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min={0}
                  value={yearTargetRevenue}
                  onChange={(e) => setYearTargetRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 216000"
                />
              </div>
              <span className="text-[10px] text-slate-400">Annual revenue target</span>
            </div>

            {/* Revenue to Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Revenue to Date *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-slate-500 font-mono pointer-events-none">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min={0}
                  value={revenueToDate}
                  onChange={(e) => setRevenueToDate(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                  placeholder="e.g. 134400"
                />
              </div>
              <span className="text-[10px] text-slate-400">Cumulative revenue generated YTD</span>
            </div>

            {/* Students to Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Students to Date *
              </label>
              <input
                type="number"
                min={0}
                value={studentsToDate}
                onChange={(e) => setStudentsToDate(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 112"
              />
              <span className="text-[10px] text-slate-400">Total active students to date</span>
            </div>

          </div>
        </div>

      </div>

      {/* Generated Report Display Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-brand-blue/30 rounded-2xl p-6 sm:p-8 shadow-md space-y-6"
      >
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase text-brand-blue tracking-wider block">
              Official Generated Document
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Total Health Report — {clubName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Calculated strictly from manually entered values. No external assumptions or hidden CSV data used.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer border border-slate-300"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleDownloadHTMLReport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-brand-blue hover:bg-brand-zaffre text-white transition-all cursor-pointer shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Output Cards */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-3">
            1. Monthly Operational Highlights
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Learners Added</span>
              <span className="text-2xl font-black font-mono text-brand-blue">+{totalLearnersAdded}</span>
              <span className="block text-[10px] text-slate-400">This Month</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Leads Contacted</span>
              <span className="text-2xl font-black font-mono text-slate-900">{totalLeadsContacted}</span>
              <span className="block text-[10px] text-slate-400">This Month</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Free Trials</span>
              <span className="text-2xl font-black font-mono text-amber-700">{totalFreeTrials}</span>
              <span className="block text-[10px] text-slate-400">Sessions booked</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Amount Generated</span>
              <span className="text-2xl font-black font-mono text-emerald-600">{currencySymbol}{totalAmountGenerated.toLocaleString()}</span>
              <span className="block text-[10px] text-slate-400">This Month</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1 col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Club Total Learners</span>
              <span className="text-2xl font-black font-mono text-slate-900">{clubTotalLearners}</span>
              <span className="block text-[10px] text-slate-400">Current Roll</span>
            </div>

          </div>
        </div>

        {/* Target Progress Outputs */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-3">
            2. Annual Target &amp; Progress Analysis
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Students Progress */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-700 uppercase">Student Target Progress</span>
                <span className="font-mono font-bold text-xs text-brand-blue">{studentsToDate} / {yearTargetStudents} Students</span>
              </div>

              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-blue h-full rounded-full transition-all duration-500" 
                  style={{ width: `${studentTargetProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Target Achieved: <strong className="text-slate-900">{studentTargetProgress}%</strong></span>
                <span>Remaining Gap: <strong className="text-rose-600">{studentDeficit} students</strong></span>
              </div>
            </div>

            {/* Revenue Progress */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-700 uppercase">Revenue Target Progress</span>
                <span className="font-mono font-bold text-xs text-emerald-700">{currencySymbol}{revenueToDate.toLocaleString()} / {currencySymbol}{yearTargetRevenue.toLocaleString()}</span>
              </div>

              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${revenueTargetProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Target Achieved: <strong className="text-slate-900">{revenueTargetProgress}%</strong></span>
                <span>Remaining Deficit: <strong className="text-rose-600">{currencySymbol}{revenueDeficit.toLocaleString()}</strong></span>
              </div>
            </div>

          </div>
        </div>

        {/* Ratios & Summary Table */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <CheckCircle2 className="h-4 w-4 text-brand-blue" />
            <span>Calculated Ratios &amp; Summary</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-[11px]">
            <div>
              <span className="text-slate-500">Contact-to-Trial Conversion:</span>{" "}
              <strong className="text-slate-900">{trialConversionRate}%</strong> ({totalFreeTrials} trials from {totalLeadsContacted} leads)
            </div>
            <div>
              <span className="text-slate-500">Trial-to-Learner Close Rate:</span>{" "}
              <strong className="text-slate-900">{learnerConversionRate}%</strong> ({totalLearnersAdded} learners from {totalFreeTrials} trials)
            </div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
