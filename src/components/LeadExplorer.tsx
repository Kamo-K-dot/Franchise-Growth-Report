import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, BookOpen, User, MapPin, Download, HelpCircle, CheckCircle2 } from "lucide-react";
import { LEAD_BOARD_DATA_COMPACT, GROUP_COUNTS } from "../data";

export default function LeadExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [showOptInHelp, setShowOptInHelp] = useState(false);

  const groups = [
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
  ];

  // Group Map Helper
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
      default: return "Unknown Group";
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

  const filteredLeads = LEAD_BOARD_DATA_COMPACT.filter((lead) => {
    const groupId = lead[0] as number;
    const parent = String(lead[1]).toLowerCase();
    const child = String(lead[2]).toLowerCase();
    const school = String(lead[4]).toLowerCase();
    const area = String(lead[5]).toLowerCase();
    const matchesSearch = parent.includes(searchTerm.toLowerCase()) || 
                          child.includes(searchTerm.toLowerCase()) || 
                          school.includes(searchTerm.toLowerCase()) || 
                          area.includes(searchTerm.toLowerCase());

    if (selectedGroup === "All") {
      return matchesSearch;
    }
    return groupId === getGroupIdByName(selectedGroup) && matchesSearch;
  });

  // Client-Side CSV Download Function
  const handleDownloadCSV = () => {
    const headers = ["Group ID", "Category", "Parent Name", "Child Name", "Age", "School Name", "Residence Area", "Has Opted In", "Interactions"];
    
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map(lead => {
        const groupId = lead[0];
        const categoryName = `"${getGroupName(groupId as number)}"` ;
        const parent = `"${String(lead[1]).replace(/"/g, '""')}"`;
        const child = `"${String(lead[2]).replace(/"/g, '""')}"`;
        const age = `"${lead[3]}"`;
        const school = `"${String(lead[4] || '').replace(/"/g, '""')}"`;
        const area = `"${String(lead[5] || '').replace(/"/g, '""')}"`;
        const optIn = `"${lead[6]}"`;
        const touches = `"${(lead[7] as string[]).join(" | ")}"`;

        return [groupId, categoryName, parent, child, age, school, area, optIn, touches].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Alberton_Leads_Report_${selectedGroup.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[rgba(26,27,38,0.7)] border border-brand-blue/20 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-brand-blue/10">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-brand-cheddar font-bold mb-1">Operational Alumni and Lead Explorer</h3>
          <p className="text-xs text-gray-400">Search and audit the leads database, manage touch logs and export directly as spreadsheet format</p>
        </div>

        {/* Action Button Suite */}
        <div className="flex items-center gap-2">
          {/* What is Opt-In Info Trigger */}
          <button 
            id="opt-in-info-btn"
            onClick={() => setShowOptInHelp(!showOptInHelp)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-brand-blue/20 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue hover:text-white transition-all cursor-pointer"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Definition: Opt-In</span>
          </button>

          {/* CSV Download Trigger */}
          <button 
            id="download-leads-csv-btn"
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-blue hover:bg-brand-zaffre text-white shadow-md hover:shadow-brand-blue/20 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Selected (.CSV)</span>
          </button>
        </div>
      </div>

      {/* Opt-In Explanatory Panel */}
      {showOptInHelp && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-5 p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-xs text-brand-coral space-y-2"
        >
          <div className="flex items-center gap-2 text-white font-bold">
            <CheckCircle2 className="h-4 w-4 text-brand-cheddar font-bold" />
            <span>What does "Opt-In" indicate inside the leads database?</span>
          </div>
          <p className="text-gray-300 leading-relaxed leading-normal">
            For Alberton Operations, **Opt-In ("yes")** represents leads and parents who explicitly toggled the informational agreement checkbox on social ads or landing pages, indicating complete legal consent to receive official Resolute Education curriculum reports, weekly WhatsApp/SMS broadcasts, and term-activity reminders.
          </p>
          <p className="text-gray-400">
            Unregulated marketing messages can draw spam complaints (causing blocked WhatsApp channels matching Group 5). Prioritizing high-quality, verified <strong>Opt-In</strong> contacts ensures safe outreach performance.
          </p>
        </motion.div>
      )}

      {/* Filters & Search Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        
        {/* Search Input */}
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search name, school, area..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-onyx/30 border border-brand-blue/20 pl-10 pr-4 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 transition-colors"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative md:col-span-1">
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <select 
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full bg-brand-onyx/30 border border-brand-blue/20 pl-10 pr-4 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-cheddar/50 transition-all appearance-none cursor-pointer"
          >
            {groups.map((group, index) => (
              <option key={index} className="bg-[#1A1B26]" value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Group Name Info Header */}
        <div className="md:col-span-1 bg-brand-blue/5 border border-brand-blue/10 p-2 rounded-xl flex items-center justify-between text-[11px] text-gray-300 px-3.5">
          <span>Active Category:</span>
          <span className="font-bold text-brand-cheddar truncate max-w-[120px]">{selectedGroup}</span>
        </div>

        {/* Record Counter banner */}
        <div className="md:col-span-1 bg-brand-blue/10 border border-brand-blue/20 p-2 rounded-xl flex items-center justify-between text-xs text-gray-300 px-4">
          <span>Records:</span>
          <span className="font-mono font-bold text-brand-cheddar">{filteredLeads.length} of {LEAD_BOARD_DATA_COMPACT.length} found</span>
        </div>
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
              <th className="p-3">Logged Tag</th>
              <th className="p-3 text-right">Opt-In Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-blue/5">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((item, idx) => {
                const groupId = item[0] as number;
                return (
                  <motion.tr 
                    key={idx} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(idx * 0.005, 0.2) }}
                    className="hover:bg-brand-blue/10 transition-colors"
                  >
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
                      <span className="text-[10px] text-gray-400 bg-brand-onyx/40 px-2 py-0.5 rounded border border-brand-blue/10 block w-max max-w-[180px] truncate">
                        {getGroupName(groupId)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1 flex-wrap">
                        {(item[7] as string[]).length > 0 ? (
                          (item[7] as string[]).map((t, index) => (
                            <span key={index} className="text-[9px] bg-brand-blue/10 text-brand-blue px-1.5 py-0.5 rounded border border-brand-blue/20">
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] text-gray-500 italic">None</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item[6] === "yes" 
                          ? "bg-brand-cheddar/20 text-brand-cheddar border border-brand-cheddar/30" 
                          : "bg-brand-onyx text-gray-500 border border-transparent"
                      }`}>
                        {String(item[6]).toUpperCase()}
                      </span>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">No active students or leads match your current criteria. Adjust filters or search text.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
