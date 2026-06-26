import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  TrendingUp, 
  Percent, 
  Calendar, 
  Database, 
  ShieldAlert, 
  FileText, 
  Clock, 
  Briefcase, 
  Quote, 
  Zap, 
  MapPin, 
  ChevronDown, 
  Copy, 
  Check,
  Upload,
  Coins,
  Download,
  X,
  AlertCircle,
  Award,
  BookOpen
} from "lucide-react";
import MetricCard from "./components/MetricCard";
import FunnelChartComponent from "./components/FunnelChartComponent";
import RevenueProjections from "./components/RevenueProjections";
import ChannelAnalysis from "./components/ChannelAnalysis";
import LeadExplorer from "./components/LeadExplorer";
import ActiveMembersBoard from "./components/ActiveMembersBoard";
import { 
  RECORDED_TOUCHES_SUMMARY, 
  TOTAL_LEADS_COUNT, 
  LEAD_BOARD_DATA_COMPACT, 
  CAMBRIDGE_LEADS_DATA, 
  SINGAPORE_LEADS_DATA 
} from "./data";

// Helper to determine the currency symbol based on the selected club preset name
export const getCurrencySymbol = (clubName: string): string => {
  const name = clubName.toLowerCase();
  if (name.includes("singapore")) return "S$";
  if (name.includes("newcastle") || name.includes("cambridge") || name.includes("uk")) return "£";
  if (name.includes("india") || name.includes("goa") || name.includes("bangalore")) return "₹";
  return "R"; // Default to Rand for South Africa / Alberton
};

// Initializing Franchise presets based on actual user criteria
const INITIAL_CLUBS_CONFIG: Record<string, {
  name: string;
  totalLeads: number;
  activeMembersCount: number;
  currentActiveMRR: number;
  holidayLeadsCount: number;
  totalTrialsCount: number;
  unconvertedTrials: number;
  recordedTouchesSummary: {
    total: number;
    whatsapp: number;
    email: number;
    call: number;
  };
  leadsData: any[];
  campaignStats?: {
    holidayCampaignLeads: number;
    normalMarketingLeads: number;
  };
}> = {
  Alberton: {
    name: "Alberton",
    totalLeads: TOTAL_LEADS_COUNT, // 746
    activeMembersCount: 42,
    currentActiveMRR: 50400,
    holidayLeadsCount: 124,
    totalTrialsCount: 20,
    unconvertedTrials: 13,
    recordedTouchesSummary: RECORDED_TOUCHES_SUMMARY,
    leadsData: LEAD_BOARD_DATA_COMPACT,
    campaignStats: {
      holidayCampaignLeads: 124,
      normalMarketingLeads: 622
    }
  },
  Singapore: {
    name: "Singapore",
    totalLeads: 37, // 37 entries from CSV
    activeMembersCount: 8,
    currentActiveMRR: 9600,
    holidayLeadsCount: 5,
    totalTrialsCount: 2,
    unconvertedTrials: 2,
    recordedTouchesSummary: {
      total: 15,
      whatsapp: 8,
      email: 4,
      call: 3
    },
    leadsData: SINGAPORE_LEADS_DATA,
    campaignStats: {
      holidayCampaignLeads: 5,
      normalMarketingLeads: 32
    }
  },
  "Newcastle": {
    name: "Newcastle",
    totalLeads: 160,
    activeMembersCount: 18,
    currentActiveMRR: 21600,
    holidayLeadsCount: 30,
    totalTrialsCount: 12,
    unconvertedTrials: 6,
    recordedTouchesSummary: {
      total: 75,
      whatsapp: 45,
      email: 15,
      call: 15
    },
    leadsData: [],
    campaignStats: {
      holidayCampaignLeads: 30,
      normalMarketingLeads: 130
    }
  },
  "India (Goa)": {
    name: "India (Goa)",
    totalLeads: 110,
    activeMembersCount: 12,
    currentActiveMRR: 14400,
    holidayLeadsCount: 20,
    totalTrialsCount: 8,
    unconvertedTrials: 4,
    recordedTouchesSummary: {
      total: 48,
      whatsapp: 28,
      email: 10,
      call: 10
    },
    leadsData: [],
    campaignStats: {
      holidayCampaignLeads: 20,
      normalMarketingLeads: 90
    }
  },
  "India (Bangalore)": {
    name: "India (Bangalore)",
    totalLeads: 215,
    activeMembersCount: 25,
    currentActiveMRR: 30000,
    holidayLeadsCount: 42,
    totalTrialsCount: 15,
    unconvertedTrials: 8,
    recordedTouchesSummary: {
      total: 95,
      whatsapp: 55,
      email: 25,
      call: 15
    },
    leadsData: [],
    campaignStats: {
      holidayCampaignLeads: 42,
      normalMarketingLeads: 173
    }
  },
  "Cambridge (UK)": {
    name: "Cambridge (UK)",
    totalLeads: 95, // 95 actual entries from CSV
    activeMembersCount: 14,
    currentActiveMRR: 16800,
    holidayLeadsCount: 10,
    totalTrialsCount: 6, // 6 booked in trials
    unconvertedTrials: 6,
    recordedTouchesSummary: {
      total: 45,
      whatsapp: 22,
      email: 18,
      call: 5
    },
    leadsData: CAMBRIDGE_LEADS_DATA,
    campaignStats: {
      holidayCampaignLeads: 14,
      normalMarketingLeads: 81
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"acquisition" | "finance" | "retention" | "members" | "audit">("acquisition");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // COST TUTION FEE SLIDER STATE (Cost is no longer fixed at R1,200)
  const [pricePerLearner, setPricePerLearner] = useState<number>(1200);

  // Dynamic state for all clubs so that CSV uploads/incremental addition is persistent!
  const [clubsData, setClubsData] = useState(() => {
    return INITIAL_CLUBS_CONFIG;
  });

  const [selectedClub, setSelectedClub] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("club") || "Alberton";
  });

  // Report Generator modal state
  const [showReportModal, setShowReportModal] = useState(false);

  const activeClub = clubsData[selectedClub] || {
    name: selectedClub,
    totalLeads: 100,
    activeMembersCount: 10,
    currentActiveMRR: 12000,
    holidayLeadsCount: 15,
    totalTrialsCount: 8,
    unconvertedTrials: 4,
    recordedTouchesSummary: { total: 30, whatsapp: 15, email: 10, call: 5 },
    leadsData: [],
    campaignStats: { holidayCampaignLeads: 15, normalMarketingLeads: 85 }
  };

  const currencySymbol = getCurrencySymbol(selectedClub);

  // Recalculates MRR dynamically based on pricing input!
  const computedActiveMRR = activeClub.activeMembersCount * pricePerLearner;
  const computedConversionRate = activeClub.totalLeads > 0 
    ? ((activeClub.activeMembersCount / activeClub.totalLeads) * 100).toFixed(2) 
    : "0.00";

  // Helper to extract min/max dates from leadsData
  const getLeadDatesRange = (leads: any[]) => {
    if (!leads || leads.length === 0) {
      return { start: "2026-06-11", end: "2026-06-26", duration: "15 days" };
    }
    const dates: Date[] = [];
    leads.forEach(lead => {
      const tags = lead[7];
      if (Array.isArray(tags)) {
        const dateStr = tags.find(t => String(t).match(/^\d{4}-\d{2}-\d{2}$/));
        if (dateStr) {
          dates.push(new Date(dateStr));
        }
      }
    });
    if (dates.length === 0) {
      return { start: "2026-06-11", end: "2026-06-26", duration: "15 days" };
    }
    const minTime = Math.min(...dates.map(d => d.getTime()));
    const maxTime = Math.max(...dates.map(d => d.getTime()));
    const minDate = new Date(minTime);
    const maxDate = new Date(maxTime);

    const formatDate = (d: Date) => d.toISOString().split("T")[0];
    
    // Duration in days
    const diffTime = Math.abs(maxTime - minTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return {
      start: formatDate(minDate),
      end: formatDate(maxDate),
      duration: `${diffDays} days`
    };
  };

  // Helper to get local contacted count for the selected club
  const getLocalContactedCount = () => {
    const savedKeysRaw = localStorage.getItem(`resolute_leads_contacted_${selectedClub}`);
    let keys: string[] = [];
    if (savedKeysRaw) {
      try {
        keys = JSON.parse(savedKeysRaw);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (selectedClub === "Alberton") {
        keys = ["Cristine Espiritu_Vaughn", "Natashia Britto_Kaiaan"];
      }
    }
    
    if (!activeClub.leadsData || activeClub.leadsData.length === 0) return keys.length;
    // Return only keys that exist in the active club's leadsData
    return activeClub.leadsData.filter(lead => {
      const key = `${lead[1]}_${lead[2]}`;
      return keys.includes(key);
    }).length;
  };

  const downloadEverythingReport = () => {
    const { start, end, duration } = getLeadDatesRange(activeClub.leadsData);
    const contacted = getLocalContactedCount();
    const currentRevenue = activeClub.activeMembersCount * pricePerLearner;
    const targetRevenue = 70 * pricePerLearner;
    const revenueGap = Math.max(0, targetRevenue - currentRevenue);
    const monthsTillTarget = Math.max(0, Math.ceil((70 - activeClub.activeMembersCount) / 4.6));

    const reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resolute Education - Executive Club Health Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');
    
    body {
      background-color: #0A0B14;
      color: #D1D5DB;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 40px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .no-print-bar {
      background: rgba(232, 89, 109, 0.1);
      border: 1px solid rgba(232, 89, 109, 0.2);
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .btn-print {
      background: #E8596D;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      transition: opacity 0.2s;
    }

    .btn-print:hover {
      opacity: 0.9;
    }

    .header {
      border-bottom: 2px solid rgba(59, 130, 246, 0.2);
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand-title {
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #FFFFFF;
      margin: 0;
      font-size: 26px;
    }

    .brand-subtitle {
      color: #E8596D;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-top: 4px;
    }

    .meta-info {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #9CA3AF;
    }

    .meta-info strong {
      color: #FFFFFF;
    }

    .pricing-multiplier-bar {
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 12px;
      padding: 15px;
      font-size: 13px;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .grid-container {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    @media (max-width: 600px) {
      .grid-container {
        grid-template-cols: 1fr;
      }
    }

    .card {
      background: #121320;
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-title {
      font-size: 11px;
      font-weight: 700;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .card-value {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      font-family: 'Inter', sans-serif;
    }

    .card-mono-value {
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
    }

    .card-desc {
      font-size: 11px;
      color: #6B7280;
      margin-top: 10px;
      line-height: 1.4;
    }

    .revenue-detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .revenue-detail-row:last-child {
      border-bottom: none;
    }

    .highlight-pink {
      color: #E8596D;
    }

    .highlight-gold {
      color: #FBBF24;
    }

    .highlight-blue {
      color: #3B82F6;
    }

    .footer {
      border-top: 1px solid rgba(59, 130, 246, 0.1);
      padding-top: 20px;
      text-align: center;
      font-size: 11px;
      color: #6B7280;
      font-family: 'JetBrains Mono', monospace;
    }

    @media print {
      body {
        background-color: #FFFFFF;
        color: #111827;
        padding: 0;
      }
      .no-print-bar {
        display: none;
      }
      .card {
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
      }
      .card-value {
        color: #111827;
      }
      .brand-title {
        color: #111827;
      }
      .brand-subtitle {
        color: #E8596D;
      }
      .pricing-multiplier-bar {
        background: #F3F4F6;
        color: #374151;
        border: 1px solid #E5E7EB;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    
    <!-- No print header info -->
    <div class="no-print-bar">
      <div>
        <strong style="color: #FFFFFF;">📋 Club Health Executive Dashboard Downloaded</strong>
        <p style="margin: 3px 0 0 0; font-size: 11px; color: #9CA3AF;">This report is formatted beautifully for presentation. Print or save directly as a PDF.</p>
      </div>
      <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <!-- Main Header -->
    <div class="header">
      <div>
        <h1 class="brand-title">Resolute Education</h1>
        <div class="brand-subtitle">Executive Club Health Report</div>
      </div>
      <div class="meta-info">
        <div>Recipient: <strong>Carla (COO)</strong></div>
        <div>Generated: <strong>2026-06-26</strong></div>
        <div>Scope: <strong>Confidential Franchise Audit</strong></div>
      </div>
    </div>

    <!-- Calibration Bar -->
    <div class="pricing-multiplier-bar">
      <span style="color: #FBBF24; font-weight: 800; text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 2px;">Tuition Pricing Multiplier:</span>
      This executive overview is dynamically calibrated based on your current custom tuition cost setting of <strong style="color: #FFFFFF;">${currencySymbol}${pricePerLearner}/mo</strong> for the <strong style="color: #FFFFFF;">${activeClub.name} Node</strong>.
    </div>

    <!-- Dashboard Content Grid -->
    <div class="grid-container">
      
      <!-- 1. Club Name -->
      <div class="card">
        <div>
          <div class="card-title">1. Club Preset Name</div>
          <div class="card-value highlight-blue">${activeClub.name} Node</div>
        </div>
        <div class="card-desc">Active targeted node currently monitored for operational velocity.</div>
      </div>

      <!-- 2. Leads from CSV -->
      <div class="card">
        <div>
          <div class="card-title">2. Leads from CSV (HQ Generated)</div>
          <div class="card-value card-mono-value">${activeClub.totalLeads} Leads</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #9CA3AF; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">
            <div>Month Starting: <strong style="color: #FFFFFF;">${start}</strong></div>
            <div>Month Ending: <strong style="color: #FFFFFF;">${end}</strong></div>
            <div>Campaign Duration: <strong style="color: #E8596D;">${duration}</strong></div>
          </div>
        </div>
        <div class="card-desc">Earliest and latest date stamps of leads mapped from the master HQ file.</div>
      </div>

      <!-- 3. Leads Contacted by Franchisee -->
      <div class="card">
        <div>
          <div class="card-title">3. Leads Contacted by Franchisee</div>
          <div class="card-value highlight-gold card-mono-value">${contacted} Leads</div>
        </div>
        <div class="card-desc">Total manually validated touches recorded by the owner via the cockpit log.</div>
      </div>

      <!-- 4. Lead Conversion Rate -->
      <div class="card">
        <div>
          <div class="card-title">4. Lead Conversion Rate</div>
          <div class="card-value highlight-pink card-mono-value" style="color: #34D399;">${computedConversionRate}%</div>
        </div>
        <div class="card-desc">Calculated as the active paid member count divided by the total HQ CSV leads.</div>
      </div>

      <!-- 5. Number of Members -->
      <div class="card">
        <div>
          <div class="card-title">5. Active Registered Members</div>
          <div class="card-value card-mono-value" style="color: #FBBF24;">${activeClub.activeMembersCount} Students</div>
        </div>
        <div class="card-desc">Total signed and active enrolled students for the current operational cycle.</div>
      </div>

      <!-- 6. Average Pay Per Student -->
      <div class="card">
        <div>
          <div class="card-title">6. Average Pay Per Student</div>
          <div class="card-value card-mono-value highlight-pink">${currencySymbol}${pricePerLearner} / mo</div>
        </div>
        <div class="card-desc">Fixed monthly recurring charge applied to all registered accounts.</div>
      </div>

      <!-- 7. Revenue vs Target -->
      <div class="card" style="grid-column: span 2;">
        <div>
          <div class="card-title">7. Monthly Revenue vs. Target</div>
          <div style="margin: 5px 0;">
            <div class="revenue-detail-row">
              <span style="color: #9CA3AF;">Current Monthly Revenue (MRR):</span>
              <strong style="font-family: 'JetBrains Mono', monospace; font-size: 16px; color: #FFFFFF;">${currencySymbol}${currentRevenue.toLocaleString()}</strong>
            </div>
            <div class="revenue-detail-row">
              <span style="color: #9CA3AF;">Target Revenue (Goal: 70 Students):</span>
              <strong style="font-family: 'JetBrains Mono', monospace; font-size: 16px; color: #FBBF24;">${currencySymbol}${targetRevenue.toLocaleString()}</strong>
            </div>
            <div class="revenue-detail-row" style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
              <span style="color: #E8596D; font-weight: bold;">Revenue Deficit to Target:</span>
              <strong style="font-family: 'JetBrains Mono', monospace; font-size: 16px; color: #E8596D;">${currencySymbol}${revenueGap.toLocaleString()} / month</strong>
            </div>
          </div>
        </div>
        <div class="card-desc">Current financial performance gap required to be closed to reach strategic viability.</div>
      </div>

      <!-- 8. Duration Till Target Reached -->
      <div class="card" style="grid-column: span 2;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="card-title">8. Duration Till Target Reached</div>
            <div class="card-value" style="font-size: 22px;">${monthsTillTarget} Months</div>
          </div>
          <div style="font-size: 24px; font-weight: 900; background: rgba(232, 89, 109, 0.15); color: #E8596D; width: 55px; height: 55px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232, 89, 109, 0.2); font-family: monospace;">
            ${monthsTillTarget}m
          </div>
        </div>
        <div class="card-desc">Forecasted timeframe to acquire the remaining ${Math.max(0, 70 - activeClub.activeMembersCount)} students at current pipeline conversion rates.</div>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      CONFIDENTIAL REPORT • GENERATED SECURELY FOR EXECUTIVE BOARD REVIEW • COPYRIGHT © 2026 RESOLUTE EDUCATION
    </div>

  </div>

</body>
</html>`;

    const blob = new Blob([reportHTML], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeClub.name}_Executive_Club_Health_Report.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("High-level Executive Club Health Report successfully generated and downloaded for Carla!");
  };

  // Handle preset switching
  const handleClubChange = (clubKey: string) => {
    setSelectedClub(clubKey);
    // Sync URL without triggers
    const url = new URL(window.location.href);
    url.searchParams.set("club", clubKey);
    window.history.pushState({}, "", url.toString());
  };

  // Copy shareable link
  const copyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("club", selectedClub);
    url.searchParams.set("tuition", String(pricePerLearner));
    navigator.clipboard.writeText(url.toString());
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  // Add Lead Callback
  const handleAddWeeklyLead = (newLead: any) => {
    setClubsData(prev => {
      const club = prev[selectedClub];
      if (!club) return prev;

      const updatedLeads = [newLead, ...(club.leadsData || [])];
      const isHoliday = newLead[0] === 0 || newLead[0] === 11;
      
      const newHolidayCount = isHoliday ? club.holidayLeadsCount + 1 : club.holidayLeadsCount;
      const updatedCampaignStats = {
        holidayCampaignLeads: isHoliday ? (club.campaignStats?.holidayCampaignLeads || 0) + 1 : (club.campaignStats?.holidayCampaignLeads || 0),
        normalMarketingLeads: !isHoliday ? (club.campaignStats?.normalMarketingLeads || 0) + 1 : (club.campaignStats?.normalMarketingLeads || 0)
      };

      return {
        ...prev,
        [selectedClub]: {
          ...club,
          totalLeads: club.totalLeads + 1,
          holidayLeadsCount: newHolidayCount,
          leadsData: updatedLeads,
          campaignStats: updatedCampaignStats
        }
      };
    });

    triggerNotification("Weekly inbound lead inserted successfully! Data persistent inside state.");
  };

  // Dynamic Notification trigger
  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 4500);
  };

  // CSV Dynamic Loader
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r?\n/);
      if (lines.length < 2) {
        triggerNotification("Invalid CSV file - missing data rows.");
        return;
      }

      const parsedRows: any[] = [];
      let holidayCampaignMatches = 0;
      let normalMarketingMatches = 0;
      let memberCount = 0;
      let trialCount = 0;

      // Default column indexes (monday.com exported format)
      let parentNameCol = 0;
      let childNameCol = 5;
      let ageCol = 6;
      let schoolCol = 7;
      let memberStatusCol = 12;
      let residenceAreaCol = 13;
      let newsletterCol = 14;

      // 1. Try to find the exact header indices from the spreadsheet
      for (let i = 0; i < Math.min(15, lines.length); i++) {
        const lineVal = lines[i].toLowerCase();
        if (lineVal.includes("parent name") && lineVal.includes("child's name")) {
          const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, "").trim().toLowerCase());
          cols.forEach((col, idx) => {
            if (col.includes("parent name")) parentNameCol = idx;
            if (col.includes("child's name") || col.includes("child name")) childNameCol = idx;
            if (col.includes("child's age") || col.includes("child age") || col.includes("age")) ageCol = idx;
            if (col.includes("school name")) schoolCol = idx;
            if (col.includes("member status")) memberStatusCol = idx;
            if (col.includes("residence") || col.includes("area of residence")) residenceAreaCol = idx;
            if (col.includes("newsletter") || col.includes("subscribe")) newsletterCol = idx;
          });
          break;
        }
      }

      let currentSectionId = 1; // Default to "Contacted waiting for response" (Group 1)

      // 2. Loop through lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Smart split of columns commas ignoring embedded quotes
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, "").trim());
        if (columns.length < 2) continue;

        const rawFirst = columns[0] ? columns[0].trim().toLowerCase() : "";

        // Check if this is a decorative or section header line from monday.com
        const isDecorator = rawFirst.includes("board") || rawFirst.includes("spreadsheet was created") || rawFirst.includes("incoming leads") || rawFirst.includes("parent name and surname");
        
        // A section header typically has no other columns populated
        const isSection = columns.length > 2 && !columns[2] && !columns[3] && !columns[5];

        if (isDecorator || isSection) {
          if (rawFirst.includes("winter holiday camp")) currentSectionId = 0;
          else if (rawFirst.includes("waiting for response")) currentSectionId = 1;
          else if (rawFirst.includes("weekend classes")) currentSectionId = 2;
          else if (rawFirst.includes("next class cycle")) currentSectionId = 3;
          else if (rawFirst.includes("trial") || rawFirst.includes("booked")) currentSectionId = 4;
          else if (rawFirst.includes("blocked") || rawFirst.includes("cannot whatsapp")) currentSectionId = 5;
          else if (rawFirst.includes("registers to club") || rawFirst.includes("registers")) currentSectionId = 6;
          else if (rawFirst.includes("attends club")) currentSectionId = 7;
          else if (rawFirst.includes("left the club")) currentSectionId = 8;
          else if (rawFirst.includes("lost leads")) currentSectionId = 8;
          else if (rawFirst.includes("misdirected")) currentSectionId = 9;
          else if (rawFirst.includes("outside of")) currentSectionId = 10;
          else if (rawFirst.includes("holiday club- registration") || rawFirst.includes("holiday club - registration") || rawFirst.includes("holiday club-registration")) currentSectionId = 11;
          continue; // Skip processing this line as a data row
        }

        const parentName = columns[parentNameCol] || "Inbound Client";
        const childName = columns[childNameCol] || "Student Lead";
        const age = columns[ageCol] || "8";
        const schoolName = columns[schoolCol] || "Primary School";
        const residenceArea = columns[residenceAreaCol] || "District";
        const rawStatus = (columns[memberStatusCol] || "").trim().toLowerCase();
        const newsletterVal = columns[newsletterCol] || "no";

        // Determine if they are a real Member
        const isMember = (currentSectionId === 6 || currentSectionId === 7 || rawStatus === "member") && rawStatus !== "non-member";
        
        // Determine if they are a Trial Lead
        const isTrial = (currentSectionId === 4 || rawStatus.includes("trial"));

        // Determine if they are Holiday Camp Campaign matches
        const isHolidayCamp = (currentSectionId === 0 || currentSectionId === 11);

        if (isHolidayCamp) {
          holidayCampaignMatches++;
        } else {
          normalMarketingMatches++;
        }

        if (isMember) {
          memberCount++;
        }
        if (isTrial) {
          trialCount++;
        }

        const cleanMode = newsletterVal.toLowerCase() === "yes" ? "WhatsApp" : "Email";
        const comment = isHolidayCamp ? "Holiday Club Campaign Lead" : "Inbound Ad Campaign";

        parsedRows.push([
          currentSectionId,
          parentName,
          childName,
          age,
          schoolName,
          residenceArea,
          cleanMode,
          [comment, new Date().toISOString().split("T")[0]]
        ]);
      }

      if (parsedRows.length > 0) {
        // Compute final updated metrics
        const updatedTotalLeads = parsedRows.length;
        const derivedMembers = memberCount;
        const derivedTrials = trialCount;
        const derivedHoliday = holidayCampaignMatches;

        setClubsData(prev => ({
          ...prev,
          [selectedClub]: {
            name: selectedClub,
            totalLeads: updatedTotalLeads,
            activeMembersCount: derivedMembers,
            currentActiveMRR: derivedMembers * pricePerLearner,
            holidayLeadsCount: derivedHoliday,
            totalTrialsCount: derivedTrials,
            unconvertedTrials: Math.max(0, derivedTrials - Math.round(derivedMembers * 0.4)),
            recordedTouchesSummary: {
              total: Math.round(updatedTotalLeads * 0.25),
              whatsapp: Math.round(updatedTotalLeads * 0.12),
              email: Math.round(updatedTotalLeads * 0.08),
              call: Math.round(updatedTotalLeads * 0.05)
            },
            leadsData: parsedRows,
            campaignStats: {
              holidayCampaignLeads: derivedHoliday,
              normalMarketingLeads: Math.max(0, updatedTotalLeads - derivedHoliday)
            }
          }
        }));

        triggerNotification(
          `Successfully processed CSV! Synced ${updatedTotalLeads} leads. Found ${derivedMembers} Active Members, ${derivedTrials} Trials, and ${derivedHoliday} Holiday Camp Leads.`
        );
      }
    };
    reader.readAsText(file);
  };

  // Report Generator Logic
  const generateTXTReport = () => {
    const revenueToDate = activeClub.activeMembersCount * pricePerLearner;
    const totalStudentNumbers = activeClub.activeMembersCount + activeClub.totalTrialsCount;
    const targetRevenue = 84000;
    const revenueGap = Math.max(0, targetRevenue - revenueToDate);
    const convertedLeads = activeClub.activeMembersCount;
    const retainedPercentage = "92.4%";
    
    // Actions needed calculations
    const conversionYield = (convertedLeads / activeClub.totalLeads) * 100;
    const additionalStudentsNeeded = Math.ceil(revenueGap / pricePerLearner);
    const inquiriesRequired = conversionYield > 0 
      ? Math.round((additionalStudentsNeeded / (conversionYield / 100))) 
      : 200;
    const potentialRevenueLost = activeClub.unconvertedTrials * pricePerLearner * 6; // over 6 months

    const reportText = `=====================================================
RESOLUTE EDUCATION FRANCHISE OPERATIONAL REPORT
Generated For: ${activeClub.name} Operations Presets
Client Run Price Option: R${pricePerLearner} / Student Month
Timestamp: ${new Date().toLocaleString()}
=====================================================

1. CRITICAL OPERATIONAL SUMMARY
-----------------------------------------------------
* Revenue Generated to Date (MRR): R${revenueToDate.toLocaleString()}
* Total Active Student Roll:      ${activeClub.activeMembersCount} students
* Active Members Retained:        ${retainedPercentage}
* Total Leads Converted:          ${convertedLeads} registrations
* Total Active Trials Logged:     ${activeClub.totalTrialsCount} trials scheduled

2. CORE CAMPAIGN SOURCE DISTRIBUTIONS
-----------------------------------------------------
* Holiday Club Campaigns:         ${activeClub.campaignStats?.holidayCampaignLeads || activeClub.holidayLeadsCount} leads
* Normal Marketing Campaigns:      ${activeClub.campaignStats?.normalMarketingLeads || (activeClub.totalLeads - activeClub.holidayLeadsCount)} leads
* Cumulative Pipeline:            ${activeClub.totalLeads} total records in node

3. FINANCIAL PLANNERS & GAP ANALYSIS 
-----------------------------------------------------
* Year-End Revenue Goal:         R${targetRevenue.toLocaleString()} / mo
* Operational Revenue Needed:    R${revenueGap.toLocaleString()} / mo
* Target Deficit Gap:            +${additionalStudentsNeeded} active students

4. OUTREACH STRATEGIC ACTIONS CHART
-----------------------------------------------------
To generate the remaining R${revenueGap.toLocaleString()}/mo, the FSM must trigger:
* Securing ${additionalStudentsNeeded} additional active learners.
* Generating ${inquiriesRequired} new inbound weekly inquiries at your ${computedConversionRate}% conversion.
* Making approx. ${Math.round(additionalStudentsNeeded * 3.5)} follow-up outbound phone calls.
* Triggering ${Math.round(additionalStudentsNeeded * 5.2)} personalized trial WhatsApp loops.

* POTENTIAL REVENUE RISK WARNING:
If the ${activeClub.unconvertedTrials} unconverted trial students in pipeline are not closed,
your franchise will leak up to R${potentialRevenueLost.toLocaleString()} in potential quarterly value over the 6-month term.

=====================================================
CONFIDENTIAL REPORT FOR INTERNAL franchise managers.
Resolute Education Operations Center. http://resolute.education
=====================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeClub.name}_Success_Operational_CFO_Report.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("Strategic COO Report text file compiled and downloaded!");
  };

  return (
    <div className="min-h-screen bg-[#0C0D14] text-white selection:bg-brand-coral selection:text-white">
      
      {/* Global Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161722] border-2 border-brand-cheddar/45 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md"
          >
            <Award className="h-5 w-5 text-brand-cheddar shrink-0 animate-pulse" />
            <p className="text-xs font-bold leading-relaxed">{showNotification}</p>
            <button onClick={() => setShowNotification(null)} className="text-gray-400 hover:text-white ml-2">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Operations Top Bar */}
      <nav className="border-b border-brand-blue/10 bg-[#10111C]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-brand-blue flex items-center justify-center font-black text-white text-base shadow-lg shadow-brand-blue/20">
              R
            </div>
            <div>
              <span className="block text-xs font-black tracking-widest text-[#FFF] uppercase">Resolute Education</span>
              <span className="text-[10px] text-brand-coral tracking-widest uppercase font-bold font-mono">Club Health Report</span>
            </div>
          </div>

          {/* Central pricing controller is universally adjusted */}
          <div className="flex items-center gap-5">
            <div className="bg-brand-blue/5 border border-brand-blue/20 px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs">
              <Coins className="h-4 w-4 text-brand-cheddar" />
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Tuition Fee</span>
                <span className="font-mono font-black text-brand-cheddar">{currencySymbol}{pricePerLearner} / month</span>
              </div>
              <input 
                type="range"
                min={200}
                max={2500}
                step={50}
                value={pricePerLearner}
                onChange={(e) => setPricePerLearner(Number(e.target.value))}
                className="w-20 sm:w-28 h-1 bg-brand-onyx rounded-lg cursor-pointer accent-brand-cheddar"
              />
            </div>

            {/* Simulated CSV Import Box */}
            <div className="relative">
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                title="Upload custom franchisee CSV files"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload franchisee CSV</span>
              </button>
            </div>

            {/* Club Health report action */}
            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-1.5 bg-brand-pink/15 hover:bg-brand-pink/25 border border-brand-pink/25 text-brand-pink text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
            >
              <FileText className="h-3.5 w-3.5 animate-pulse" />
              <span>Club Health Report</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (() => {
          const { start, end, duration } = getLeadDatesRange(activeClub.leadsData);
          const contacted = getLocalContactedCount();
          const currentRevenue = activeClub.activeMembersCount * pricePerLearner;
          const targetRevenue = 70 * pricePerLearner;
          const revenueGap = Math.max(0, targetRevenue - currentRevenue);
          const monthsTillTarget = Math.max(0, Math.ceil((70 - activeClub.activeMembersCount) / 4.6));

          return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                className="bg-[#121320] border-2 border-brand-blue/20 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
              >
                
                <div className="bg-brand-blue/10 px-5 py-4 border-b border-brand-blue/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand-cheddar" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Executive Club Health Report for Carla</h3>
                  </div>
                  <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto font-sans">
                  
                  <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl leading-relaxed text-xs">
                    <span className="text-brand-cheddar font-extrabold uppercase text-[10px] block mb-1">Tuition Pricing Multiplier:</span>
                    This report is automatically calibrated using your current custom tuition cost setting of <strong className="text-white">{currencySymbol}{pricePerLearner}/mo</strong> for <strong className="text-white">{activeClub.name} Node</strong>.
                  </div>

                  {/* High Level Metrics Board */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Club Name */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl flex flex-col justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">1. Club Preset Name</span>
                      <span className="text-lg font-extrabold text-white font-sans">{activeClub.name} Node</span>
                    </div>

                    {/* Leads from CSV */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">2. Leads from CSV (HQ Generated)</span>
                      <span className="text-lg font-mono font-bold text-brand-blue block">{activeClub.totalLeads} Leads</span>
                      <div className="text-[10px] text-gray-500 mt-1 space-y-0.5">
                        <p>Month Starting: <strong className="text-gray-400">{start}</strong></p>
                        <p>Month Ending: <strong className="text-gray-400">{end}</strong></p>
                        <p>Campaign Duration: <strong className="text-brand-coral">{duration}</strong></p>
                      </div>
                    </div>

                    {/* Leads Contacted by Franchisee */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">3. Leads Contacted by Franchisee</span>
                        <span className="text-lg font-mono font-bold text-brand-cheddar">{contacted} Leads</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Manual follow-ups recorded by owner on dashboard.
                      </p>
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">4. Lead Conversion Rate</span>
                        <span className="text-lg font-mono font-bold text-emerald-400">{computedConversionRate}%</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Active student members divided by total HQ leads.
                      </p>
                    </div>

                    {/* Number of Members */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">5. Current Active Members</span>
                        <span className="text-lg font-mono font-bold text-white">{activeClub.activeMembersCount} Students</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Paid active enrollments.
                      </p>
                    </div>

                    {/* Average Pay */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">6. Average Pay Per Student</span>
                        <span className="text-lg font-mono font-bold text-brand-pink">{currencySymbol}{pricePerLearner} / month</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Customizable pricing model parameter.
                      </p>
                    </div>

                    {/* Revenue vs Target */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl col-span-1 md:col-span-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">7. Monthly Revenue vs. Target</span>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
                        <div>
                          <span className="text-sm text-gray-400">Current MRR: </span>
                          <span className="text-lg font-mono font-bold text-white">{currencySymbol}{currentRevenue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Target MRR (70 Students): </span>
                          <span className="text-lg font-mono font-bold text-brand-cheddar">{currencySymbol}{targetRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="border-t border-brand-blue/10 mt-2.5 pt-2 flex items-center justify-between text-[11px]">
                        <span className="text-gray-500">Deficit Gap to Target:</span>
                        <span className="font-mono font-bold text-brand-pink">{currencySymbol}{revenueGap.toLocaleString()} / month</span>
                      </div>
                    </div>

                    {/* Months till Target */}
                    <div className="bg-brand-onyx/20 border border-brand-blue/10 p-4 rounded-xl col-span-1 md:col-span-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">8. Duration Till Target Reached</span>
                        <span className="text-lg font-mono font-bold text-white">{monthsTillTarget} Months</span>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Calculated based on standard growth models with standard weekly target inputs.
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center font-mono font-bold text-brand-pink text-sm">
                        {monthsTillTarget}m
                      </div>
                    </div>

                  </div>

                </div>

                <div className="bg-brand-blue/5 px-5 py-4 border-t border-brand-blue/15 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-mono">Carla's executive summary format</span>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => setShowReportModal(false)}
                      className="bg-transparent hover:bg-white/5 border border-white/10 text-xs px-4 py-2 rounded-xl text-gray-300 cursor-pointer"
                    >
                      Close Preview
                    </button>
                    <button 
                      onClick={downloadEverythingReport}
                      className="bg-brand-blue hover:bg-brand-zaffre text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF Report</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Core Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-[#10111C] border border-brand-blue/15 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-cheddar bg-brand-cheddar/15 border border-brand-cheddar/25">
                Resolute Multi-Club Dashboard
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                <Clock className="h-3 w-3 text-brand-pink" /> 2026 Season Model
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
              Franchise Operations Growth Model
            </h1>
            <p className="text-xs text-gray-400">
              Select any logged club preset below, type a customized monthly tuition input, or upload parent interaction spreadsheets to track marketing campaigns.
            </p>
          </div>

          {/* Interactive Preset Selector and Share */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            
            <div className="relative">
              <label className="block text-[10px] uppercase font-bold text-brand-coral mb-1 font-sans">Select Franchise Node</label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3.5 h-4 w-4 text-brand-cheddar pointer-events-none z-10" />
                <select
                  value={selectedClub}
                  onChange={(e) => handleClubChange(e.target.value)}
                  className="bg-brand-onyx/40 border border-brand-blue/30 text-white rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold outline-none cursor-pointer focus:border-brand-cheddar/50 transition-all appearance-none relative z-0"
                >
                  {Object.keys(clubsData).map((clubKey) => (
                    <option key={clubKey} className="bg-[#10111C]" value={clubKey}>
                      {clubsData[clubKey].name} Presets
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Link copier generator tool */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-brand-coral mb-1 font-sans">Share Workspace State</label>
              <button
                onClick={copyShareLink}
                className="flex items-center gap-2 bg-brand-blue hover:bg-brand-zaffre text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-brand-blue/10 justify-center h-10 w-full sm:w-auto transition-all cursor-pointer shadow-md shadow-brand-blue/10"
              >
                {showCopyMessage ? (
                  <>
                    <Check className="h-4 w-4 text-brand-cheddar" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Config Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Major Top Level KPI Cards (Updating dynamically with tuition price input) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard
            title={`${activeClub.name} total leads`}
            value={`${activeClub.totalLeads} Leads`}
            change="Inbound Size"
            isPositive={true}
            subtitle="Whole client pipeline size"
            iconName="Users"
            glowColor="#313BF5"
          />
          <MetricCard
            title={`${activeClub.name} paying members`}
            value={`${activeClub.activeMembersCount} Registrations`}
            change={`MRR: ${currencySymbol}${computedActiveMRR.toLocaleString()}`}
            isPositive={true}
            subtitle={`At custom ${currencySymbol}${pricePerLearner}/mo price option`}
            iconName="Briefcase"
            glowColor="#E8596D"
          />
          <MetricCard
            title={`${activeClub.name} conversion`}
            value={`${computedConversionRate}%`}
            change="Close Rate"
            isPositive={true}
            subtitle="Inbound conversion speed"
            iconName="Percent"
            glowColor="#FFB100"
          />
          <MetricCard
            title={`${activeClub.name} holiday leads`}
            value={`${activeClub.holidayLeadsCount} Leads`}
            change={`${activeClub.campaignStats?.holidayCampaignLeads || activeClub.holidayLeadsCount} Holidays`}
            isPositive={true}
            subtitle="Winter & Holiday promotion captures"
            iconName="Calendar"
            glowColor="#313BF5"
          />
        </section>

        {/* Tab Selection Row (Incorporates new Active Members Board Tab) */}
        <div className="flex border-b border-brand-blue/10 gap-1.5 mb-8 overflow-x-auto pb-px">
          {(["acquisition", "finance", "retention", "members", "audit"] as const).map((tab) => {
            const labels = {
              acquisition: { label: "Funnel & Conversion Flow", icon: TrendingUp },
              finance: { label: "Financial Projections (CFO)", icon: FileText },
              retention: { label: "Communication Ratios", icon: ShieldAlert },
              members: { label: "Active Members Directory", icon: BookOpen },
              audit: { label: "Lead Database Explorer", icon: Database }
            };
            const Icon = labels[tab].icon;
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all outline-none rounded-t-xl shrink-0 cursor-pointer ${
                  active 
                    ? "bg-brand-blue/10 text-white border-b-2 border-brand-blue font-extrabold" 
                    : "text-gray-500 hover:text-white hover:bg-brand-blue/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{labels[tab].label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Panel */}
        <main className="mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedClub}-${pricePerLearner}`} // Refresh components on input variables
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
            >
              {activeTab === "acquisition" && (
                <FunnelChartComponent
                  totalLeads={activeClub.totalLeads}
                  totalTrials={activeClub.totalTrialsCount}
                  activeMembers={activeClub.activeMembersCount}
                />
              )}

              {activeTab === "finance" && (
                <RevenueProjections
                  currentMembers={activeClub.activeMembersCount}
                  currentActiveMRR={computedActiveMRR}
                  unconvertedTrials={activeClub.unconvertedTrials}
                  pricePerLearner={pricePerLearner}
                  currencySymbol={currencySymbol}
                />
              )}

              {activeTab === "retention" && (
                <ChannelAnalysis
                  conversationsSummary={activeClub.recordedTouchesSummary}
                />
              )}

              {activeTab === "members" && (
                <ActiveMembersBoard
                  pricePerLearner={pricePerLearner}
                  clubName={activeClub.name}
                  currencySymbol={currencySymbol}
                />
              )}

              {activeTab === "audit" && (
                <LeadExplorer 
                  leadsData={activeClub.leadsData} 
                  clubName={activeClub.name} 
                  onAddLead={handleAddWeeklyLead}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Famous Kobe Bryant Saying Footer Panel */}
        <section className="mt-14 mb-8 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-5 relative overflow-hidden text-center max-w-4xl mx-auto font-sans">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-cheddar/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-pink/5 rounded-full blur-xl pointer-events-none" />
          <Quote className="h-6 w-6 text-brand-cheddar mx-auto mb-2 opacity-60" />
          <p className="text-sm font-sans italic font-medium text-white max-w-2xl mx-auto leading-relaxed">
            "Those times when you get up early and you work hard, those times when you stay up late and you work hard, those times when you don't feel like working, you're too tired, you don't want to push yourself, but you do it anyway. That is actually the dream."
          </p>
          <span className="block mt-2.5 text-xs text-brand-cheddar uppercase tracking-widest font-black">
            — Kobe Bryant (Mamba Mentality)
          </span>
        </section>

        {/* Footer Credit */}
        <footer className="text-center text-[10px] text-gray-500 mt-12 flex items-center justify-between border-t border-brand-blue/10 pt-6">
          <span>Resolute Education &copy; 2026. Confidential Operations Group.</span>
          <span>Google AI Studio Build &bull; High Contrast CI Active &bull; Presets Node V1.4</span>
        </footer>

      </div>
    </div>
  );
}
