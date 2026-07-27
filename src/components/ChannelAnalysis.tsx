import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  TrendingUp
} from "lucide-react";

interface ChannelAnalysisProps {
  totalLeadsContacted: number;
  setTotalLeadsContacted: (val: number) => void;
  conversationsSummary?: {
    total: number;
    whatsapp: number;
    email: number;
    call: number;
  };
}

export default function ChannelAnalysis({
  totalLeadsContacted,
  setTotalLeadsContacted,
  conversationsSummary
}: ChannelAnalysisProps) {
  // Specific touch inputs (which can overlap across the total contacted leads)
  const [phoneCallContacts, setPhoneCallContacts] = useState<number>(42);
  const [emailContacts, setEmailContacts] = useState<number>(68);
  const [textContacts, setTextContacts] = useState<number>(55);
  const [clientsVisiting, setClientsVisiting] = useState<number>(24);

  // Derived conversion rate to visiting studio
  const visitConversionRate = totalLeadsContacted > 0 
    ? ((clientsVisiting / totalLeadsContacted) * 100).toFixed(1) 
    : "0.0";

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-200 block w-max mb-1">
            Outreach Tracker
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Leads Contacted This Month
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your total unique leads contacted and record outreach touchpoints across Phone, Email, Text/WhatsApp, and Studio visits.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl font-mono text-xs text-slate-700">
          <span>Total Leads Contacted:</span>
          <strong className="text-brand-blue font-bold text-sm">{totalLeadsContacted}</strong>
        </div>
      </div>

      {/* Multi-Channel Explanation Note */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Multi-Channel Outreach Rule:</strong> A single lead may receive a phone call, an email, AND a WhatsApp message. Therefore, phone, email, and text counts represent touchpoint coverage of your total leads and do not need to add up to the total leads contacted.
        </div>
      </div>

      {/* Inputs Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-200 flex items-center gap-2">
          <Phone className="h-4 w-4 text-brand-blue" />
          <span>Total Contacted &amp; Channel Touch Inputs</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* 1. Total Leads Contacted Input */}
          <div className="space-y-1.5 lg:col-span-1">
            <label className="block text-xs font-bold text-slate-900">
              Total Leads Contacted *
            </label>
            <div className="relative flex items-center">
              <Users className="absolute left-3 h-4 w-4 text-brand-blue pointer-events-none" />
              <input
                type="number"
                min={0}
                value={totalLeadsContacted}
                onChange={(e) => setTotalLeadsContacted(Math.max(0, Number(e.target.value)))}
                className="w-full bg-blue-50/50 border-2 border-brand-blue/30 rounded-xl pl-9 pr-3 py-2 text-xs font-black text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 85"
              />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Total unique leads reached</span>
          </div>

          {/* 2. Phone Call Contacts */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Phone Calls Made *
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="number"
                min={0}
                value={phoneCallContacts}
                onChange={(e) => setPhoneCallContacts(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 42"
              />
            </div>
            <span className="text-[10px] text-slate-400">Leads who received phone calls</span>
          </div>

          {/* 3. Email Contacts */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Emails Sent *
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="number"
                min={0}
                value={emailContacts}
                onChange={(e) => setEmailContacts(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 68"
              />
            </div>
            <span className="text-[10px] text-slate-400">Leads who received emails</span>
          </div>

          {/* 4. Text / WhatsApp Contacts */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Texts / WhatsApp *
            </label>
            <div className="relative flex items-center">
              <MessageSquare className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="number"
                min={0}
                value={textContacts}
                onChange={(e) => setTextContacts(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue focus:bg-white transition-all font-mono"
                placeholder="e.g. 55"
              />
            </div>
            <span className="text-[10px] text-slate-400">Leads who received text / WhatsApp</span>
          </div>

          {/* 5. Clients Visiting */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Clients Visiting *
            </label>
            <div className="relative flex items-center">
              <Users className="absolute left-3 h-4 w-4 text-amber-600 pointer-events-none" />
              <input
                type="number"
                min={0}
                value={clientsVisiting}
                onChange={(e) => setClientsVisiting(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-amber-600 focus:bg-white transition-all font-mono"
                placeholder="e.g. 24"
              />
            </div>
            <span className="text-[10px] text-amber-700 font-medium">Attended trial / studio visit</span>
          </div>

        </div>

      </div>

      {/* Outcome Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Phone Outreach</span>
            <div className="p-2 rounded-xl bg-blue-50 text-brand-blue border border-blue-200">
              <Phone className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">{phoneCallContacts}</div>
          <p className="text-[11px] text-slate-500">
            {totalLeadsContacted > 0 ? Math.min(100, Math.round((phoneCallContacts / totalLeadsContacted) * 100)) : 0}% of total contacted leads received calls
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Email Outreach</span>
            <div className="p-2 rounded-xl bg-blue-50 text-brand-blue border border-blue-200">
              <Mail className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">{emailContacts}</div>
          <p className="text-[11px] text-slate-500">
            {totalLeadsContacted > 0 ? Math.min(100, Math.round((emailContacts / totalLeadsContacted) * 100)) : 0}% of total contacted leads received emails
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Text / WhatsApp</span>
            <div className="p-2 rounded-xl bg-blue-50 text-brand-blue border border-blue-200">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">{textContacts}</div>
          <p className="text-[11px] text-slate-500">
            {totalLeadsContacted > 0 ? Math.min(100, Math.round((textContacts / totalLeadsContacted) * 100)) : 0}% of total contacted leads received texts
          </p>
        </div>

        <div className="bg-white border-2 border-amber-300 p-5 rounded-2xl shadow-sm space-y-2 bg-amber-50/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-900">Visiting Clients</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-amber-900">{clientsVisiting}</div>
          <p className="text-[11px] font-bold text-amber-800">
            {visitConversionRate}% contact-to-visit conversion rate
          </p>
        </div>

      </div>

      {/* Summary Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-3 text-xs text-slate-700">
        <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0" />
        <p className="leading-relaxed">
          <strong>Outreach Channel Summary:</strong> From a total of <strong>{totalLeadsContacted} leads contacted</strong>, outreach included {phoneCallContacts} phone calls, {emailContacts} emails, and {textContacts} texts/WhatsApp messages. From these contacted leads, <strong>{clientsVisiting} clients visited</strong> the club (<strong>{visitConversionRate}% conversion</strong>).
        </p>
      </div>

    </div>
  );
}
