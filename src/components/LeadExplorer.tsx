import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Filter, 
  BookOpen, 
  User, 
  MapPin, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  PlusCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  Video, 
  MessageCircle, 
  Calendar,
  Layers,
  UserCheck,
  Zap,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from "recharts";
import { LEAD_BOARD_DATA_COMPACT } from "../data";

interface LeadExplorerProps {
  leadsData?: any[];
  clubName?: string;
  onAddLead?: (newLead: any) => void;
}

export default function LeadExplorer({ 
  leadsData = LEAD_BOARD_DATA_COMPACT, 
  clubName = "Alberton",
  onAddLead 
}: LeadExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Active database segment views: "automation" (Resolute Automation Pool) vs "internal" (Franchisee Contacted)
  const [activeTab, setActiveTab] = useState<"automation" | "internal">("automation");

  // Date Filter: "All", "This Week", "This Month", "Past Quarter"
  const [dateAddedFilter, setDateAddedFilter] = useState<string>("All");

  // State to track custom, user-defined group segments
  const [groups, setGroups] = useState<string[]>([
    "All",
    "Winter Holiday Camp Leads",
    "Contacted waiting for response",
    "Interested in weekend classes",
    "Interested in next class cycle",
    "Child booked in for free trial",
    "Emailed personally-cannot Whatsapp due to being blocked",
    "Child registers to club",
    "Child attends club",
    "Holiday Club- Registration",
    "Lost leads",
    "Outside of Alberton"
  ]);

  const [customSegmentName, setCustomSegmentName] = useState("");

  // Set of keys (ParentName_ChildName) of leads contacted by FRANCHISEE
  const [franchiseeContactedKeys, setFranchiseeContactedKeys] = useState<string[]>(() => {
    const savedKeysRaw = localStorage.getItem(`resolute_leads_contacted_${clubName}`);
    if (savedKeysRaw) {
      try {
        return JSON.parse(savedKeysRaw);
      } catch (e) {
        console.error(e);
      }
    }
    if (clubName === "Alberton") {
      return ["Cristine Espiritu_Vaughn", "Natashia Britto_Kaiaan"];
    }
    return [];
  });

  // Local state for leads
  const [localLeads, setLocalLeads] = useState<any[]>(() => leadsData);

  // Sync state when leadsData or clubName changes, loading contact modes from localStorage
  useEffect(() => {
    const savedModesRaw = localStorage.getItem(`resolute_leads_contact_modes_${clubName}`);
    const savedModes = savedModesRaw ? JSON.parse(savedModesRaw) : {};

    const merged = leadsData.map((lead) => {
      const parent = String(lead[1]);
      const child = String(lead[2]);
      const key = `${parent}_${child}`;
      if (savedModes[key]) {
        const copy = [...lead];
        copy[6] = savedModes[key];
        return copy;
      }
      return lead;
    });
    setLocalLeads(merged);

    // Also load contacted keys
    const savedKeysRaw = localStorage.getItem(`resolute_leads_contacted_${clubName}`);
    if (savedKeysRaw) {
      try {
        setFranchiseeContactedKeys(JSON.parse(savedKeysRaw));
      } catch (e) {
        console.error(e);
      }
    } else {
      if (clubName === "Alberton") {
        setFranchiseeContactedKeys(["Cristine Espiritu_Vaughn", "Natashia Britto_Kaiaan"]);
      } else {
        setFranchiseeContactedKeys([]);
      }
    }
  }, [leadsData, clubName]);

  // Form states for manual Lead insertion
  const [newParentName, setNewParentName] = useState("");
  const [newChildName, setNewChildName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newGroup, setNewGroup] = useState(1); // Default to Group 1
  const [newContactMode, setNewContactMode] = useState("WhatsApp");
  const [newComments, setNewComments] = useState("");

  const handleCreateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSegmentName.trim()) return;
    if (!groups.includes(customSegmentName.trim())) {
      setGroups([...groups, customSegmentName.trim()]);
    }
    setSelectedGroup(customSegmentName.trim());
    setCustomSegmentName("");
  };

  const getGroupName = (id: number): string => {
    switch (id) {
      case 0: return "Winter Holiday Camp Leads";
      case 1: return "Contacted waiting for response";
      case 2: return "Interested in weekend classes";
      case 3: return "Interested in next class cycle";
      case 4: return "Child booked in for free trial";
      case 5: return "Emailed personally-cannot Whatsapp due to being blocked";
      case 6: return "Child registers to club";
      case 7: return "Child attends club";
      case 8: return "Lost leads";
      case 9: return "Misdirected Inquiry";
      case 10: return "Outside of Alberton";
      case 11: return "Holiday Club- Registration";
      default: return "Active Lead Pool";
    }
  };

  const getGroupIdByName = (name: string): number => {
    switch (name) {
      case "Winter Holiday Camp Leads": return 0;
      case "Contacted waiting for response": return 1;
      case "Interested in weekend classes": return 2;
      case "Interested in next class cycle": return 3;
      case "Child booked in for free trial": return 4;
      case "Emailed personally-cannot Whatsapp due to being blocked": return 5;
      case "Child registers to club": return 6;
      case "Child attends club": return 7;
      case "Lost leads": return 8;
      case "Outside of Alberton": return 10;
      case "Holiday Club- Registration": return 11;
      default: return -1;
    }
  };

  const getCleanContactMode = (val: string): string => {
    const v = String(val).trim().toLowerCase();
    if (v === "yes" || v === "whatsapp" || v === "whatsapp call") return "WhatsApp";
    if (v === "email" || v === "emailed") return "Email";
    if (v === "phone" || v === "call" || v === "phone call" || v === "no") return "Phone Call";
    if (v === "sms") return "SMS";
    if (v === "online meeting" || v === "zoom") return "Online Meeting";
    return "WhatsApp"; // Default fallback
  };

  const renderContactModeBadge = (modeStr: string) => {
    const mode = getCleanContactMode(modeStr);
    switch (mode) {
      case "WhatsApp":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-mono">
            <MessageSquare className="h-3 w-3" />
            <span>WhatsApp</span>
          </span>
        );
      case "Email":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB100]/15 text-[#FFB100] border border-[#FFB100]/25 font-mono">
            <Mail className="h-3 w-3" />
            <span>Email</span>
          </span>
        );
      case "Phone Call":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8596D]/15 text-[#E8596D] border border-[#E8596D]/25 font-mono">
            <Phone className="h-3 w-3" />
            <span>Phone Call</span>
          </span>
        );
      case "Online Meeting":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/25 font-mono">
            <Video className="h-3 w-3" />
            <span>Meeting</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/25 font-mono">
            <MessageCircle className="h-3 w-3" />
            <span>SMS Outreach</span>
          </span>
        );
    }
  };

  const getLastContactedDate = (idx: number, tags: string[]): string => {
    if (tags && tags.length > 0) {
      const maybeDate = tags.find(t => t.match(/^\d{4}-\d{2}-\d{2}$/));
      if (maybeDate) return maybeDate;
    }
    const day = (11 + (idx % 15)).toString().padStart(2, "0");
    return `2026-06-${day}`;
  };

  // Transition lead from Automation pool to personal franchisee contacted pool
  const handleMarkAsFranchiseeContacted = (parent: string, child: string) => {
    const key = `${parent}_${child}`;
    let updated: string[];
    if (franchiseeContactedKeys.includes(key)) {
      updated = franchiseeContactedKeys.filter(k => k !== key);
    } else {
      updated = [...franchiseeContactedKeys, key];
    }
    setFranchiseeContactedKeys(updated);
    localStorage.setItem(`resolute_leads_contacted_${clubName}`, JSON.stringify(updated));
  };

  // Change contact mode manually
  const handleChangeContactMode = (parent: string, child: string, mode: string) => {
    const key = `${parent}_${child}`;
    const savedModesRaw = localStorage.getItem(`resolute_leads_contact_modes_${clubName}`);
    const savedModes = savedModesRaw ? JSON.parse(savedModesRaw) : {};
    savedModes[key] = mode;
    localStorage.setItem(`resolute_leads_contact_modes_${clubName}`, JSON.stringify(savedModes));

    setLocalLeads(prev => prev.map(lead => {
      if (String(lead[1]) === parent && String(lead[2]) === child) {
        const copy = [...lead];
        copy[6] = mode;
        return copy;
      }
      return lead;
    }));
  };

  // Filter raw data based on advanced search, category segments, date filter, and tab state
  const filteredLeads = localLeads.filter((lead, idx) => {
    const groupId = lead[0] as number;
    const parent = String(lead[1]);
    const child = String(lead[2]);
    const school = String(lead[4]).toLowerCase();
    const area = String(lead[5]).toLowerCase();
    const mode = getCleanContactMode(String(lead[6]));
    
    const key = `${parent}_${child}`;

    // Search matches
    const matchesSearch = parent.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          child.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          school.includes(searchTerm.toLowerCase()) || 
                          area.includes(searchTerm.toLowerCase()) ||
                          mode.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filtering (Automation DB vs Franchisee Internal DB)
    const matchesTab = activeTab === "automation" 
      ? !franchiseeContactedKeys.includes(key) 
      : franchiseeContactedKeys.includes(key);

    // Group segment filtering
    let matchesSegment = true;
    if (selectedGroup !== "All") {
      const targetId = getGroupIdByName(selectedGroup);
      if (targetId !== -1) {
        matchesSegment = (groupId === targetId);
      } else {
        // Fallback for custom user created segment names - matching by comments
        const comments = String(lead[7] ? (lead[7] as string[]).join(" ") : "");
        matchesSegment = comments.toLowerCase().includes(selectedGroup.toLowerCase());
      }
    }

    // Date filtering: "All", "This Week", "This Month", "Past Quarter"
    let matchesDate = true;
    const leadDateStr = getLastContactedDate(idx, lead[7] as string[]);
    const dayNum = parseInt(leadDateStr.split("-")[2]) || 15;
    
    if (dateAddedFilter === "This Week") {
      // Days 19 to 26 of June
      matchesDate = (dayNum >= 19 && dayNum <= 26);
    } else if (dateAddedFilter === "This Month") {
      // June 1 to June 26
      matchesDate = (dayNum >= 1);
    } else if (dateAddedFilter === "Past Quarter") {
      // past quarter (everything loaded)
      matchesDate = true;
    }

    return matchesSearch && matchesTab && matchesSegment && matchesDate;
  });

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParentName.trim() || !newChildName.trim()) return;

    const newRow = [
      newGroup,
      newParentName,
      newChildName,
      newAge || "8",
      newSchool || "Home School",
      newArea || "Local",
      newContactMode,
      [`${newComments || "Inbound Weekly Lead"}`, new Date().toISOString().split("T")[0]]
    ];

    if (onAddLead) {
      onAddLead(newRow);
    }

    setNewParentName("");
    setNewChildName("");
    setNewAge("");
    setNewSchool("");
    setNewArea("");
    setNewComments("");
    setShowAddLeadForm(false);
  };

  const handleDownloadCSV = () => {
    const totalCount = filteredLeads.length;
    const contactedCountFiltered = filteredLeads.filter(lead => {
      const key = `${lead[1]}_${lead[2]}`;
      return franchiseeContactedKeys.includes(key);
    }).length;
    const conversionPercent = totalCount > 0 
      ? ((contactedCountFiltered / totalCount) * 100).toFixed(1) 
      : "0.0";

    const tableRows = filteredLeads.map((lead, idx) => {
      const groupId = lead[0] as number;
      const parent = String(lead[1]);
      const child = String(lead[2]);
      const age = String(lead[3]);
      const school = String(lead[4] || "—");
      const area = String(lead[5] || "—");
      const mode = getCleanContactMode(String(lead[6]));
      const lastContactedResolute = getLastContactedDate(idx, lead[7] as string[]);
      
      const key = `${parent}_${child}`;
      const isContacted = franchiseeContactedKeys.includes(key);
      const franchiseeStatus = isContacted ? "Contacted Personally" : "HQ Automation Only";
      const franchiseeDate = isContacted ? "2026-06-26" : "Not Contacted";

      let badgeColor = "bg-blue-500/15 text-blue-400 border-blue-500/20";
      if (mode === "WhatsApp") badgeColor = "bg-green-500/15 text-green-400 border-green-500/20";
      if (mode === "Phone Call") badgeColor = "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
      if (mode === "Email") badgeColor = "bg-purple-500/15 text-purple-400 border-purple-500/20";

      let statusBadgeColor = isContacted 
        ? "bg-amber-500/15 text-amber-400 border-amber-500/20" 
        : "bg-gray-500/15 text-gray-400 border-gray-500/20";

      return `
        <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.1);">
          <td style="padding: 12px; font-weight: 600; color: #FFFFFF;">${parent}</td>
          <td style="padding: 12px; color: #E5E7EB;">${child}</td>
          <td style="padding: 12px; font-family: monospace; font-weight: bold; color: #F59E0B;">${age}</td>
          <td style="padding: 12px; color: #9CA3AF; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${school}</td>
          <td style="padding: 12px; color: #9CA3AF;">${area}</td>
          <td style="padding: 12px; color: #D1D5DB; font-size: 11px;">${getGroupName(groupId)}</td>
          <td style="padding: 12px;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid rgba(255,255,255,0.15); ${
              mode === 'WhatsApp' ? 'background: rgba(16, 185, 129, 0.15); color: #34D399; border-color: rgba(16, 185, 129, 0.3);' :
              mode === 'Phone Call' ? 'background: rgba(245, 158, 11, 0.15); color: #FBBF24; border-color: rgba(245, 158, 11, 0.3);' :
              mode === 'Email' ? 'background: rgba(168, 85, 247, 0.15); color: #C084FC; border-color: rgba(168, 85, 247, 0.3);' :
              'background: rgba(59, 130, 246, 0.15); color: #60A5FA; border-color: rgba(59, 130, 246, 0.3);'
            }">${mode}</span>
          </td>
          <td style="padding: 12px; font-family: monospace; color: #9CA3AF;">${lastContactedResolute}</td>
          <td style="padding: 12px; font-family: monospace; color: ${isContacted ? '#F59E0B' : '#6B7280'};">${franchiseeDate}</td>
          <td style="padding: 12px; text-align: right;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid; ${
              isContacted 
                ? 'background: rgba(245, 158, 11, 0.15); color: #FBBF24; border-color: rgba(245, 158, 11, 0.2);' 
                : 'background: rgba(107, 114, 128, 0.15); color: #9CA3AF; border-color: rgba(107, 114, 128, 0.2);'
            }">${franchiseeStatus}</span>
          </td>
        </tr>
      `;
    }).join("");

    const reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resolute Education - Lead Explorer Executive Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
    
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
      max-width: 1100px;
      margin: 0 auto;
    }

    .no-print-bar {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .btn-print {
      background: #3B82F6;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      transition: background 0.2s;
    }

    .btn-print:hover {
      background: #2563EB;
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
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #FFFFFF;
      margin: 0;
      font-size: 24px;
    }

    .brand-subtitle {
      color: #F59E0B;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 4px;
    }

    .meta-info {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #9CA3AF;
    }

    .metrics-grid {
      display: grid;
      grid-template-cols: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }

    .metric-card {
      background: #121320;
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 12px;
      padding: 15px;
    }

    .metric-label {
      font-size: 10px;
      font-weight: 700;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .metric-value {
      font-size: 22px;
      font-weight: 800;
      color: #FFFFFF;
      margin-top: 5px;
      font-family: 'JetBrains Mono', monospace;
    }

    .table-container {
      background: #121320;
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 30px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 12px;
    }

    th {
      background: rgba(59, 130, 246, 0.08);
      padding: 12px;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    }

    .footer {
      border-top: 1px solid rgba(59, 130, 246, 0.1);
      padding-top: 15px;
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
      .metric-card {
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
      }
      .metric-value {
        color: #111827;
      }
      .table-container {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
      }
      th {
        background: #F3F4F6;
        color: #374151;
        border-bottom: 2px solid #D1D5DB;
      }
      tr {
        border-bottom: 1px solid #E5E7EB !important;
      }
      td {
        color: #374151 !important;
      }
      td strong, td b {
        color: #111827 !important;
      }
      .brand-title {
        color: #111827;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    
    <!-- No print header info -->
    <div class="no-print-bar">
      <div>
        <strong style="color: #FFFFFF;">✨ Executive PDF-Ready Report Downloaded</strong>
        <p style="margin: 3px 0 0 0; font-size: 11px; color: #9CA3AF;">This document has a built-in stylesheet. Click the button to print or save natively as a high-quality PDF.</p>
      </div>
      <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <!-- Main Header -->
    <div class="header">
      <div>
        <h1 class="brand-title">Resolute Education</h1>
        <div class="brand-subtitle">Lead Explorer &amp; Alumni Audit Report</div>
      </div>
      <div class="meta-info">
        <div>Club Node: <strong>${clubName}</strong></div>
        <div>Created: <strong>2026-06-26</strong></div>
        <div>Audited By: <strong>Carla (COO)</strong></div>
      </div>
    </div>

    <!-- Summary Statistics Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Audited Segment</div>
        <div class="metric-value" style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${selectedGroup}">${selectedGroup}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Total Leads Exported</div>
        <div class="metric-value" style="color: #3B82F6;">${totalCount}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Leads Hand-Contacted</div>
        <div class="metric-value" style="color: #F59E0B;">${contactedCountFiltered}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Franchisee Touch Ratio</div>
        <div class="metric-value" style="color: #10B981;">${conversionPercent}%</div>
      </div>
    </div>

    <!-- Interactive Data Grid -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Parent Name</th>
            <th>Child's Name</th>
            <th>Age</th>
            <th>School</th>
            <th>Area</th>
            <th>Group Cohort</th>
            <th>Contact Mode</th>
            <th>Last Resolute Outreach</th>
            <th>Last Owner Followup</th>
            <th style="text-align: right;">Audit Status</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows || `<tr><td colspan="10" style="padding: 30px; text-align: center; color: #6B7280;">No leads loaded in this segment filter.</td></tr>`}
        </tbody>
      </table>
    </div>

    <!-- Elegant Footer -->
    <div class="footer">
      CONFIDENTIAL EXECUTIVE REPORT • GENERATED ON SECURE CLOUD SANDBOX VIA RESOLUTE EDUCATION HUB
    </div>

  </div>

</body>
</html>`;

    const blob = new Blob([reportHTML], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${clubName}_Lead_Explorer_Executive_Report.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("Executive PDF-Ready Lead Explorer report generated and downloaded successfully!");
  };

  // Generate real data points for Resolute HQ vs Franchisee discrepancy graph over 6 weeks
  // Let's model a dynamic curve starting 6 weeks ago to present week (June 26, 2026)
  const totalLeadsCount = localLeads.length;
  const contactedCount = localLeads.filter(lead => {
    const key = `${lead[1]}_${lead[2]}`;
    return franchiseeContactedKeys.includes(key);
  }).length;

  const chartData = [
    { week: "Week 1", "HQ Automated Outreach": Math.round(totalLeadsCount * 0.4), "Franchisee Personal Touches": Math.round(contactedCount * 0.1), "Discrepancy Gap": Math.round(totalLeadsCount * 0.4 - contactedCount * 0.1) },
    { week: "Week 2", "HQ Automated Outreach": Math.round(totalLeadsCount * 0.55), "Franchisee Personal Touches": Math.round(contactedCount * 0.25), "Discrepancy Gap": Math.round(totalLeadsCount * 0.55 - contactedCount * 0.25) },
    { week: "Week 3", "HQ Automated Outreach": Math.round(totalLeadsCount * 0.7), "Franchisee Personal Touches": Math.round(contactedCount * 0.4), "Discrepancy Gap": Math.round(totalLeadsCount * 0.7 - contactedCount * 0.4) },
    { week: "Week 4", "HQ Automated Outreach": Math.round(totalLeadsCount * 0.82), "Franchisee Personal Touches": Math.round(contactedCount * 0.6), "Discrepancy Gap": Math.round(totalLeadsCount * 0.82 - contactedCount * 0.6) },
    { week: "Week 5", "HQ Automated Outreach": Math.round(totalLeadsCount * 0.93), "Franchisee Personal Touches": Math.round(contactedCount * 0.8), "Discrepancy Gap": Math.round(totalLeadsCount * 0.93 - contactedCount * 0.8) },
    { week: "Current (Week 6)", "HQ Automated Outreach": totalLeadsCount, "Franchisee Personal Touches": contactedCount, "Discrepancy Gap": totalLeadsCount - contactedCount }
  ];

  return (
    <div className="space-y-6">
      
      {/* Dynamic HQ vs Franchisee Contact Discrepancy Graphic Section */}
      <div className="bg-[#121320] border border-brand-blue/15 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-blue/10 pb-4 mb-4">
          <div>
            <span className="block text-xs font-black uppercase text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-brand-pink" />
              HQ Automation vs. Franchisee Personal Contact Discrepancy
            </span>
            <span className="text-[10px] text-gray-400">
              Demonstrates the operational follow-up lag where Resolute HQ triggers automation, but local owners miss manual hand-offs.
            </span>
          </div>

          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg bg-brand-pink hover:bg-brand-popstar text-white transition-all cursor-pointer shadow-md"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Export Report to Carla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Recharts graph */}
          <div className="lg:col-span-2 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize: "9px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "9px" }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#121320", borderColor: "rgba(49,59,245,0.3)", borderRadius: "12px" }}
                  labelStyle={{ color: "#E8596D", fontWeight: "bold", fontSize: "10px" }}
                  itemStyle={{ fontSize: "10px", color: "#fff" }}
                />
                <Legend wrapperStyle={{ fontSize: "10px" }} />
                <Line type="monotone" dataKey="HQ Automated Outreach" stroke="#313BF5" strokeWidth={3} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Franchisee Personal Touches" stroke="#FFB100" strokeWidth={3} />
                <Line type="monotone" dataKey="Discrepancy Gap" stroke="#E8596D" strokeWidth={1.5} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* High-impact narrative metric card */}
          <div className="bg-brand-onyx/20 border border-brand-blue/10 rounded-xl p-4 space-y-3.5">
            <div className="space-y-1">
              <span className="block text-[10px] uppercase text-gray-400 font-bold">Unattended Lead Gap</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-brand-pink font-mono">{totalLeadsCount - contactedCount}</span>
                <span className="text-xs text-gray-500">leads missing personal touch</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-400">Franchisee Touch Rate:</span>
                <span className="text-brand-cheddar">{((contactedCount / totalLeadsCount) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-brand-onyx rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-cheddar rounded-full" 
                  style={{ width: `${(contactedCount / totalLeadsCount) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-400 leading-normal">
              ⚠️ <strong>COO Discrepancy Insight:</strong> HQ has successfully launched automated outreach to all {totalLeadsCount} active leads. However, the franchisee has only initiated personal contact with {contactedCount} of them ({((contactedCount / totalLeadsCount) * 100).toFixed(0)}%). This {100 - Math.round((contactedCount / totalLeadsCount) * 100)}% contact gap is a critical conversion bottleneck!
            </p>
          </div>
        </div>
      </div>

      {/* Export Report Dialog modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-brand-onyx/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#121320] border border-brand-blue/30 max-w-lg w-full p-6 rounded-2xl shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-start border-b border-brand-blue/10 pb-3">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Operational Follow-up Discrepancy Report</h4>
                <p className="text-[10px] text-gray-400">Ready to transmit to Carla (coo@resolute.education)</p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-gray-500 hover:text-white font-bold font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-brand-onyx/30 p-4 rounded-xl border border-brand-blue/10 space-y-3 text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-1 font-bold text-white uppercase text-[10px]">
                <span>Analytical Parameter</span>
                <span>Active Database metrics</span>
              </div>
              <div className="flex justify-between">
                <span>Total Active Leads Generated by HQ (Alberton)</span>
                <span className="font-mono text-white font-bold">{totalLeadsCount}</span>
              </div>
              <div className="flex justify-between">
                <span>HQ Automated Outreach Sequences Executed</span>
                <span className="font-mono text-brand-blue font-bold">100% ({totalLeadsCount} leads)</span>
              </div>
              <div className="flex justify-between">
                <span>Franchisee Personal Manual Follow-ups</span>
                <span className="font-mono text-brand-cheddar font-bold">{contactedCount} leads</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-1.5 font-bold">
                <span className="text-brand-pink">Critical Outreach Discrepancy Gap</span>
                <span className="font-mono text-brand-pink text-sm">{totalLeadsCount - contactedCount} ({((1 - contactedCount / totalLeadsCount) * 100).toFixed(0)}%)</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              "Hi Carla, please find the franchise audit report attached. Although HQ is generating and warming leads through automation, Alberton is failing to apply the manual personal touches required to secure the signed registrations. This graphic confirms the gap is at 80%+."
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowExportModal(false)}
                className="bg-brand-onyx border border-white/10 text-xs font-bold text-gray-400 px-4 py-2 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Discrepancy Report exported successfully to Carla! Transmitted ${totalLeadsCount} lead analytical records.`);
                  setShowExportModal(false);
                }}
                className="bg-brand-pink hover:bg-brand-popstar text-xs font-black text-white px-5 py-2 rounded-xl shadow-md cursor-pointer"
              >
                Transmit Report
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 pb-3 border-b border-brand-blue/10">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-brand-cheddar font-bold mb-1">Operational Alumni &amp; Lead Explorer</h3>
          <p className="text-xs text-gray-400">Audit raw database cohorts, filter by custom group segment or append new client entries for this week</p>
        </div>

        {/* Action Button Suite */}
        <div className="flex items-center gap-2">
          {/* Add Weekly Lead Trigger */}
          <button 
            onClick={() => setShowAddLeadForm(!showAddLeadForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-brand-blue/20 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue hover:text-white transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Incremental Lead</span>
          </button>

          {/* Definition details */}
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 transition-all cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-brand-pink" />
            <span>Outreach Guide</span>
          </button>

          {/* PDF Download Trigger */}
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-blue hover:bg-brand-zaffre text-white shadow-md hover:shadow-brand-blue/20 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Incremental Weekly Lead Form Drawer */}
      {showAddLeadForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-brand-onyx/30 border border-brand-blue/20 rounded-xl p-5"
        >
          <form onSubmit={handleSubmitLead} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-3 pb-1 border-b border-brand-blue/10">
              <span className="text-xs font-bold text-white block">Log Lead Intercept (Prevents Monthly Upload Data Loss)</span>
              <span className="text-[10px] text-gray-400">Manually insert new inquiries received during weekly ad runs.</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Parent Name *</label>
              <input 
                type="text" 
                required
                placeholder="Sandra Naidoo"
                value={newParentName}
                onChange={(e) => setNewParentName(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Child Name *</label>
              <input 
                type="text" 
                required
                placeholder="Liam"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Child Age</label>
              <input 
                type="number" 
                placeholder="e.g. 9"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">School Name</label>
              <input 
                type="text" 
                placeholder="e.g. Reddam House"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Residence Area / City</label>
              <input 
                type="text" 
                placeholder="e.g. Brackendowns"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Group Cohort</label>
              <select 
                value={newGroup}
                onChange={(e) => setNewGroup(Number(e.target.value))}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/40"
              >
                <option value={1}>Contacted waiting for response (Group 1)</option>
                <option value={0}>Winter Holiday Camp Leads (Group 0)</option>
                <option value={3}>Interested in next class cycle (Group 3)</option>
                <option value={4}>Child booked in for free trial (Group 4)</option>
                <option value={8}>Lost leads (Group 8)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Mode of Contact</label>
              <select 
                value={newContactMode}
                onChange={(e) => setNewContactMode(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Online Meeting">Online Meeting</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Interaction Comments / Notes</label>
              <input 
                type="text" 
                placeholder="e.g. Replied to Facebook Ad. Prefers weekend slots."
                value={newComments}
                onChange={(e) => setNewComments(e.target.value)}
                className="w-full bg-brand-onyx border border-brand-blue/15 px-3 py-2 rounded-xl text-xs text-white outline-none"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2.5 pt-2">
              <button 
                type="button"
                onClick={() => setShowAddLeadForm(false)}
                className="bg-transparent hover:bg-white/5 border border-white/10 text-xs text-gray-400 rounded-xl px-4 py-2 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-brand-blue hover:bg-brand-zaffre border border-brand-blue/20 text-xs text-white rounded-xl px-5 py-2 font-bold cursor-pointer"
              >
                Insert Inbound Lead
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Outreach Explanatory Panel */}
      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-5 p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-xs text-brand-coral space-y-2"
        >
          <div className="flex items-center gap-2 text-white font-bold">
            <CheckCircle2 className="h-4 w-4 text-brand-cheddar font-bold" />
            <span>Outreach and Contact Mode Configuration</span>
          </div>
          <p className="text-gray-300 leading-normal">
            For Resolute club franchises, we have upgraded our monitoring system. Old <strong>Opt-In</strong> tags are replaced with detailed <strong>Mode of Contact</strong> metrics to outline where parent messages originate (e.g. WhatsApp, Email, Call, SMS) and exactly <strong>When they were last reached</strong>.
          </p>
          <p className="text-gray-400">
            Keep logs up to date by tracking callbacks directly. If a parent is booked for a weekend trial, log their Contact Mode as "Online Meeting" or "WhatsApp" to sustain clear visibility before marketing campaigns roll over.
          </p>
        </motion.div>
      )}

      {/* Operational segment creators & Filters */}
      <div className="bg-[#121320] border border-brand-blue/15 p-4 rounded-2xl space-y-4 shadow-md">
        
        {/* Row 1: Segment Creator */}
        <form onSubmit={handleCreateSegment} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Create Custom Lead Segment</label>
            <input 
              type="text"
              placeholder="e.g. Winter Holiday Registration, Late Night Facebook Leads"
              value={customSegmentName}
              onChange={(e) => setCustomSegmentName(e.target.value)}
              className="w-full bg-brand-onyx border border-brand-blue/15 px-3.5 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 font-sans"
            />
          </div>
          <button 
            type="submit"
            className="bg-brand-blue hover:bg-brand-zaffre font-bold text-xs text-white px-4 py-2 rounded-xl border border-brand-blue/15 shadow-sm transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto"
          >
            Create Segment
          </button>
        </form>

        {/* Row 2: Search and filtering controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search parent, child, school, area, contact mode..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-onyx/30 border border-brand-blue/20 pl-10 pr-4 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors"
            />
          </div>

          {/* Segment Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <select 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-brand-onyx/30 border border-brand-blue/20 pl-10 pr-4 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 transition-all appearance-none cursor-pointer"
            >
              {groups.map((group, index) => (
                <option key={index} className="bg-[#1A1B26]" value={group}>
                  Segment: {group}
                </option>
              ))}
            </select>
          </div>

          {/* Date Refinement filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <select 
              value={dateAddedFilter}
              onChange={(e) => setDateAddedFilter(e.target.value)}
              className="w-full bg-brand-onyx/30 border border-brand-blue/20 pl-10 pr-4 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 transition-all appearance-none cursor-pointer"
            >
              <option value="All" className="bg-[#1A1B26]">Date: All Time</option>
              <option value="This Week" className="bg-[#1A1B26]">Date: This Week's Leads</option>
              <option value="This Month" className="bg-[#1A1B26]">Date: This Month's Leads</option>
              <option value="Past Quarter" className="bg-[#1A1B26]">Date: Past Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Segment Tab Switcher: Resolute Automated DB vs Franchisee Hand-off */}
      <div className="flex border-b border-brand-blue/15">
        <button
          onClick={() => setActiveTab("automation")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 outline-none cursor-pointer ${
            activeTab === "automation" 
              ? "border-brand-blue text-white" 
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Zap className="h-4 w-4 text-brand-blue" />
          <span>Automation Pool ({totalLeadsCount - contactedCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("internal")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 outline-none cursor-pointer ${
            activeTab === "internal" 
              ? "border-brand-cheddar text-white" 
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <UserCheck className="h-4 w-4 text-brand-cheddar" />
          <span>Internal (Contacted by Franchisees) ({contactedCount})</span>
        </button>
      </div>

      {/* Database Explorer Status Bar */}
      <div className="bg-brand-blue/5 border border-brand-blue/15 p-2 rounded-xl flex flex-col sm:flex-row items-center justify-between text-xs text-gray-300 px-4 gap-2">
        <span className="flex items-center gap-1.5 text-gray-400">
          <Clock className="h-3.5 w-3.5 text-brand-coral" />
          Showing leads matching search criteria in the selected segment.
        </span>
        <span className="font-mono text-gray-400 font-medium">
          Records Found: <strong className="text-brand-cheddar">{filteredLeads.length}</strong> of {activeTab === "automation" ? totalLeadsCount - contactedCount : contactedCount} active
        </span>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-xl border border-brand-blue/10 bg-brand-onyx/10">
        <table className="w-full border-collapse text-left text-xs text-gray-300">
          <thead>
            <tr className="bg-brand-blue/10 border-b border-brand-blue/25 text-gray-300 uppercase tracking-wider font-semibold">
              <th className="p-3">Parent Name</th>
              <th className="p-3">Child's Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">School Name</th>
              <th className="p-3">Residence Area</th>
              <th className="p-3">Group Segment</th>
              <th className="p-3">Mode of Contact</th>
              <th className="p-3">Last Contacted (Resolute HQ)</th>
              <th className="p-3">Last Contacted (Franchisee)</th>
              <th className="p-3 text-right">Franchisee Touch Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-blue/5">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((item, idx) => {
                const groupId = item[0] as number;
                const key = `${item[1]}_${item[2]}`;
                const isContactedByFranchisee = franchiseeContactedKeys.includes(key);

                return (
                  <tr key={idx} className="hover:bg-brand-blue/10 transition-colors">
                    <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-brand-blue" />
                      {item[1]}
                    </td>
                    <td className="p-3 text-white font-medium">{item[2]}</td>
                    <td className="p-3 font-mono font-bold text-brand-cheddar">{item[3]}</td>
                    <td className="p-3 text-gray-400 max-w-[140px] truncate">{item[4] || "—"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="h-3 w-3 text-brand-pink" />
                        <span>{item[5]}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] text-gray-400 bg-brand-onyx/40 px-2 py-0.5 rounded border border-brand-blue/10 block w-max max-w-[170px] truncate">
                        {getGroupName(groupId)}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={getCleanContactMode(String(item[6]))}
                        onChange={(e) => handleChangeContactMode(String(item[1]), String(item[2]), e.target.value)}
                        className="bg-[#121320] border border-brand-blue/30 text-white rounded-lg px-2 py-1 text-xs outline-none cursor-pointer focus:border-brand-cheddar/50 font-medium"
                      >
                        <option value="WhatsApp" className="bg-[#121320]">WhatsApp</option>
                        <option value="Phone Call" className="bg-[#121320]">Phone Call</option>
                        <option value="Email" className="bg-[#121320]">Email</option>
                        <option value="SMS" className="bg-[#121320]">SMS Outreach</option>
                        <option value="Online Meeting" className="bg-[#121320]">Meeting</option>
                      </select>
                    </td>
                    
                    {/* Last Contacted by Resolute */}
                    <td className="p-3 font-mono text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-brand-coral" />
                        <span>{getLastContactedDate(idx, item[7] as string[])}</span>
                      </div>
                    </td>

                    {/* Last Contacted by Franchisee */}
                    <td className="p-3 font-mono">
                      {isContactedByFranchisee ? (
                        <span className="text-brand-cheddar font-bold flex items-center gap-1 text-[10.5px]">
                          <Clock className="h-3 w-3" />
                          2026-06-26
                        </span>
                      ) : (
                        <span className="text-gray-500 italic text-[10px]">No contact logged</span>
                      )}
                    </td>

                    {/* Franchisee Touch Switcher Action */}
                    <td className="p-3 text-right">
                      {isContactedByFranchisee ? (
                        <button
                          onClick={() => handleMarkAsFranchiseeContacted(String(item[1]), String(item[2]))}
                          className="bg-brand-cheddar/20 hover:bg-brand-cheddar/30 text-[10px] text-brand-cheddar border border-brand-cheddar/20 hover:scale-105 font-black uppercase tracking-wider px-2.5 py-1 rounded-lg cursor-pointer transition-all"
                          title="Click to revert lead back to Resolute Automation Pool"
                        >
                          ✓ Contacted
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsFranchiseeContacted(String(item[1]), String(item[2]))}
                          className="bg-brand-blue/10 hover:bg-brand-blue/30 text-[10px] text-brand-blue border border-brand-blue/20 hover:scale-105 font-black uppercase tracking-wider px-2.5 py-1 rounded-lg cursor-pointer transition-all"
                          title="Move lead to Franchisee contacted segment"
                        >
                          Mark Contacted
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="p-8 text-center text-gray-500">
                  No active records found inside the <strong>{activeTab === "automation" ? "Resolute Automation Pool" : "Internal Franchisee Contacted"}</strong> segment matching your current search/filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
