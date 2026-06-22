import { useState, useEffect } from "react";
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
  Check
} from "lucide-react";
import MetricCard from "./components/MetricCard";
import FunnelChartComponent from "./components/FunnelChartComponent";
import RevenueProjections from "./components/RevenueProjections";
import ChannelAnalysis from "./components/ChannelAnalysis";
import LeadExplorer from "./components/LeadExplorer";
import { RECORDED_TOUCHES_SUMMARY, TOTAL_LEADS_COUNT } from "./data";

// Profile definitions for multi-franchise operational presets
const CLUBS_CONFIG: Record<string, {
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
}> = {
  Alberton: {
    name: "Alberton",
    totalLeads: TOTAL_LEADS_COUNT, // 746
    activeMembersCount: 7,
    currentActiveMRR: 7200,
    holidayLeadsCount: 124,
    totalTrialsCount: 20,
    unconvertedTrials: 13,
    recordedTouchesSummary: RECORDED_TOUCHES_SUMMARY
  },
  Randhart: {
    name: "Randhart",
    totalLeads: 412,
    activeMembersCount: 12,
    currentActiveMRR: 14400,
    holidayLeadsCount: 68,
    totalTrialsCount: 25,
    unconvertedTrials: 10,
    recordedTouchesSummary: {
      total: 60,
      whatsapp: 28,
      email: 8,
      call: 24
    }
  },
  Meyersdal: {
    name: "Meyersdal",
    totalLeads: 518,
    activeMembersCount: 15,
    currentActiveMRR: 18000,
    holidayLeadsCount: 89,
    totalTrialsCount: 32,
    unconvertedTrials: 16,
    recordedTouchesSummary: {
      total: 82,
      whatsapp: 38,
      email: 14,
      call: 30
    }
  },
  Brackenhurst: {
    name: "Brackenhurst",
    totalLeads: 320,
    activeMembersCount: 8,
    currentActiveMRR: 9600,
    holidayLeadsCount: 52,
    totalTrialsCount: 14,
    unconvertedTrials: 8,
    recordedTouchesSummary: {
      total: 44,
      whatsapp: 20,
      email: 6,
      call: 18
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"acquisition" | "finance" | "retention" | "audit">("acquisition");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  
  // Set up selected club state with URL parsing
  const [selectedClub, setSelectedClub] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("club") || "Alberton";
  });

  // Parse custom parameters from URL to allow dynamic franchise mapping on the same URL
  const params = new URLSearchParams(window.location.search);
  const urlLeads = params.get("leads") ? parseInt(params.get("leads")!) : 500;
  const urlMembers = params.get("members") ? parseInt(params.get("members")!) : 10;
  const urlMRR = params.get("mrr") ? parseInt(params.get("mrr")!) : 12000;
  const urlHoliday = params.get("holiday") ? parseInt(params.get("holiday")!) : 80;
  const urlTrials = params.get("trials") ? parseInt(params.get("trials")!) : 15;
  const urlUnconverted = params.get("unconverted") ? parseInt(params.get("unconverted")!) : 10;

  // Derive final club metrics dynamically based on preset or custom URL override parameters
  const isCustomClub = !CLUBS_CONFIG[selectedClub];
  const activeClub = CLUBS_CONFIG[selectedClub] || {
    name: selectedClub,
    totalLeads: urlLeads,
    activeMembersCount: urlMembers,
    currentActiveMRR: urlMRR,
    holidayLeadsCount: urlHoliday,
    totalTrialsCount: urlTrials,
    unconvertedTrials: urlUnconverted,
    recordedTouchesSummary: {
      total: Math.round(urlLeads * 0.15),
      whatsapp: Math.round(urlLeads * 0.08),
      email: Math.round(urlLeads * 0.03),
      call: Math.round(urlLeads * 0.04)
    }
  };

  // Synchronize URL search queries with component state
  useEffect(() => {
    const syncParams = new URLSearchParams(window.location.search);
    
    // Set tab state from URL if present
    const tabParam = syncParams.get("tab");
    if (tabParam && ["acquisition", "finance", "retention", "audit"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
    
    // Set club state from URL if present
    const clubParam = syncParams.get("club");
    if (clubParam) {
      setSelectedClub(clubParam);
    }
  }, []);

  const handleTabChange = (tab: "acquisition" | "finance" | "retention" | "audit") => {
    setActiveTab(tab);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.pushState({}, "", newUrl.toString());
  };

  const handleClubChange = (clubKey: string) => {
    setSelectedClub(clubKey);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("club", clubKey);
    
    // If selecting a custom club, keep its parameters, else clear other customization overrides for preset cleanliness
    if (CLUBS_CONFIG[clubKey]) {
      newUrl.searchParams.delete("leads");
      newUrl.searchParams.delete("members");
      newUrl.searchParams.delete("mrr");
      newUrl.searchParams.delete("holiday");
      newUrl.searchParams.delete("trials");
      newUrl.searchParams.delete("unconverted");
    }
    window.history.pushState({}, "", newUrl.toString());
  };

  // Generate shareable pre-filled custom link for the COO
  const copyShareLink = () => {
    const demoUrl = new URL(window.location.origin + window.location.pathname);
    demoUrl.searchParams.set("club", "Johannesburg");
    demoUrl.searchParams.set("leads", "650");
    demoUrl.searchParams.set("members", "18");
    demoUrl.searchParams.set("mrr", "21600");
    demoUrl.searchParams.set("holiday", "92");
    demoUrl.searchParams.set("trials", "28");
    
    navigator.clipboard.writeText(demoUrl.toString()).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0D16] text-[#E1E3EB] font-sans selection:bg-brand-blue selection:text-white pb-16">
      
      {/* Decorative Grid Mesh & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(49,59,245,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(49,59,245,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative">
        
        {/* Company Header with SVGs logo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 mt-2">
          
          {/* Resolute Education Franchising Logo */}
          <div className="flex items-center gap-3 bg-[rgba(26,27,38,0.4)] border border-brand-blue/15 px-4 py-2.5 rounded-2xl w-fit">
            <div className="relative flex items-center justify-center p-2 bg-brand-blue rounded-xl text-white shadow-lg shadow-brand-blue/15">
              <Zap className="h-5 w-5 text-brand-cheddar fill-brand-cheddar" />
              <div className="absolute inset-0 border-2 border-white/20 rounded-xl" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white uppercase font-sans">RESOLUTE</span>
                <span className="text-base font-bold text-brand-blue font-sans">EDUCATION</span>
              </div>
              <span className="block text-[9px] uppercase tracking-widest text-brand-cheddar font-black font-sans">
                Franchising Department
              </span>
            </div>
          </div>

          {/* Connected Database Sync status */}
          <div className="flex items-center gap-3">
            <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl px-4 py-2 flex items-center gap-3">
              <Database className="h-4 w-4 text-brand-cheddar" />
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-gray-400 font-bold">Data Warehouse</span>
                <span className="block text-[11px] font-bold text-white font-mono">Synced Preset Sheets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Club Controller Cockpit Header */}
        <div className="bg-gradient-to-r from-brand-blue/10 via-brand-pink/5 to-transparent border border-brand-blue/20 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-brand-cheddar/20 text-brand-cheddar font-extrabold uppercase px-2.5 py-0.5 rounded-md border border-brand-cheddar/30 tracking-wider">
                Multi-Franchise Active Node
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold font-mono">
                <Clock className="h-3 w-3" />
                Updated June 2026
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
              Franchise Cockpit &amp; Operations Growth Model
            </h1>
            <p className="text-xs text-gray-400">
              Select any logged club preset below or paste query overrides directly into the browser URL to model custom locations on the fly.
            </p>
          </div>

          {/* Interactive Preset Selector dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <label className="block text-[10px] uppercase font-bold text-brand-coral mb-1 font-sans">Select Franchise Node</label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3.5 h-4 w-4 text-brand-cheddar pointer-events-none" />
                <select
                  value={selectedClub}
                  onChange={(e) => handleClubChange(e.target.value)}
                  className="bg-brand-onyx/40 border border-brand-blue/30 text-white rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold outline-none cursor-pointer focus:border-brand-cheddar/50 transition-all appearance-none"
                >
                  {Object.keys(CLUBS_CONFIG).map((clubKey) => (
                    <option key={clubKey} className="bg-[#10111C]" value={clubKey}>
                      Preset: {CLUBS_CONFIG[clubKey].name}
                    </option>
                  ))}
                  {isCustomClub && (
                    <option className="bg-[#10111C]" value={selectedClub}>
                      Custom: {selectedClub} (URL Parameter)
                    </option>
                  )}
                </select>
                <ChevronDown className="absolute right-3 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Link copier generator tool */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-brand-coral mb-1 font-sans">Share Custom Template</label>
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
                    <span>Generate Custom Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Instructional Notification on URL usage */}
        {isCustomClub && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-brand-cheddar/10 border border-brand-cheddar/20 text-xs text-gray-300"
          >
            <span className="font-extrabold text-brand-cheddar uppercase block mb-1">💡 Custom Parameters Override Loaded Successfully!</span>
            You are currently viewing a custom operational projection modeled directly from URL values for <strong className="text-white">"{selectedClub}"</strong>. All metrics, graphs, charts and slider models have adjusted dynamically. Just copy this browser URL to share this exact configuration with your franchise managers!
          </motion.div>
        )}

        {/* Major Top Level KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard
            title={`${activeClub.name} total leads`}
            value={`${activeClub.totalLeads} Leads`}
            change="Cap Target"
            isPositive={true}
            subtitle="Raw franchise list size"
            iconName="Users"
            glowColor="#313BF5"
          />
          <MetricCard
            title={`${activeClub.name} memberships`}
            value={`${activeClub.activeMembersCount} Members`}
            change={`+${activeClub.activeMembersCount} active`}
            isPositive={true}
            subtitle="Paying active cohorts"
            iconName="Briefcase"
            glowColor="#E8596D"
          />
          <MetricCard
            title={`${activeClub.name} conversion`}
            value={`${((activeClub.activeMembersCount / activeClub.totalLeads) * 100).toFixed(2)}%`}
            change="Close Yield"
            isPositive={activeClub.activeMembersCount > 10}
            subtitle="Inbound conversion speed"
            iconName="Percent"
            glowColor="#FFB100"
          />
          <MetricCard
            title={`${activeClub.name} holiday leads`}
            value={`${activeClub.holidayLeadsCount} Leads`}
            change="Camp Registered"
            isPositive={true}
            subtitle="Holiday promotion captures"
            iconName="Calendar"
            glowColor="#313BF5"
          />
        </section>

        {/* Tab Selection Row */}
        <div className="flex border-b border-brand-blue/10 gap-1.5 mb-8 overflow-x-auto pb-px">
          {(["acquisition", "finance", "retention", "audit"] as const).map((tab) => {
            const labels = {
              acquisition: { label: "Funnel & Conversion Flow", icon: TrendingUp },
              finance: { label: "Financial Projections (CFO)", icon: FileText },
              retention: { label: "Communication Ratios", icon: ShieldAlert },
              audit: { label: "Lead Database Explorer", icon: Database }
            };
            const Icon = labels[tab].icon;
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
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
              key={`${activeTab}-${selectedClub}`} // Reset state when switching clubs
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
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
                  currentActiveMRR={activeClub.currentActiveMRR}
                  unconvertedTrials={activeClub.unconvertedTrials}
                />
              )}

              {activeTab === "retention" && (
                <ChannelAnalysis
                  conversationsSummary={activeClub.recordedTouchesSummary}
                />
              )}

              {activeTab === "audit" && (
                <LeadExplorer />
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
          <span>Google AI Studio Build &bull; High Contrast CI Active &bull; Presets Node V1.2</span>
        </footer>

      </div>
    </div>
  );
}
