import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  MapPin, 
  Upload, 
  CheckCircle, 
  Smile, 
  Meh, 
  Frown, 
  BookOpen, 
  Phone, 
  Mail, 
  Layers, 
  Search, 
  PlusCircle, 
  Trash2,
  FileText
} from "lucide-react";

interface Member {
  id: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  signOnDate: string;
  course: string;
  lastCheckInDate: string;
  lastCheckInStatus: string;
  contactMode: string;
  popStatus: "Pending" | "Uploaded";
  popFileName?: string;
  tuition: number;
  membershipDuration: number;
  paymentMonthsOutstanding: number;
}

interface ActiveMembersBoardProps {
  pricePerLearner: number;
  clubName: string;
  currencySymbol?: string;
}

export default function ActiveMembersBoard({ pricePerLearner, clubName, currencySymbol = "R" }: ActiveMembersBoardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploadingIdx, setIsUploadingIdx] = useState<string | null>(null);

  // Default active academic cohorts with custom tuitions and membership stats
  const [members, setMembers] = useState<Member[]>([
    {
      id: "mem1",
      studentName: "Penelope Daroczi",
      parentName: "Renelyn Daróczi",
      parentEmail: "quinquitorenelyn@gmail.com",
      parentPhone: "+44 742 696 8924",
      signOnDate: "2026-01-14",
      course: "Novice Robotics",
      lastCheckInDate: "2026-06-18",
      lastCheckInStatus: "Amazing progress with ultrasonic sensors",
      contactMode: "WhatsApp",
      popStatus: "Uploaded",
      popFileName: "POP_June2026_Daroczi.pdf",
      tuition: 1200,
      membershipDuration: 6,
      paymentMonthsOutstanding: 0
    },
    {
      id: "mem2",
      studentName: "Kaiaan Britto",
      parentName: "Natashia Britto",
      parentEmail: "natzbrittz@yahoo.co.uk",
      parentPhone: "+44 796 975 3956",
      signOnDate: "2026-02-01",
      course: "Scratch Game Dev",
      lastCheckInDate: "2026-06-20",
      lastCheckInStatus: "Completed Level 2 platformer physics design",
      contactMode: "WhatsApp",
      popStatus: "Pending",
      tuition: 1100,
      membershipDuration: 4,
      paymentMonthsOutstanding: 2
    },
    {
      id: "mem3",
      studentName: "Can Ozturker",
      parentName: "Özlem Özmen",
      parentEmail: "ozlemozmenn@gmail.com",
      parentPhone: "+90 551 234 5678",
      signOnDate: "2026-03-11",
      course: "Intermediate Robotics",
      lastCheckInDate: "2026-06-15",
      lastCheckInStatus: "Struggled slightly with mechanical gears, needs review",
      contactMode: "Phone Call",
      popStatus: "Uploaded",
      popFileName: "POP_Ozturker_Fees.pdf",
      tuition: 1200,
      membershipDuration: 3,
      paymentMonthsOutstanding: 0
    },
    {
      id: "mem4",
      studentName: "Vaughn Manrique",
      parentName: "Cristine Espiritu",
      parentEmail: "cristine.vanessaespiritu@nhs.net",
      parentPhone: "+44 739 951 5169",
      signOnDate: "2026-03-25",
      course: "Advanced Python Coding",
      lastCheckInDate: "2026-06-21",
      lastCheckInStatus: "Excellent logic execution in Tkinter GUIs",
      contactMode: "Email",
      popStatus: "Pending",
      tuition: 1500,
      membershipDuration: 2,
      paymentMonthsOutstanding: 1
    },
    {
      id: "mem5",
      studentName: "Musa Khan",
      parentName: "Ani Iqbal",
      parentEmail: "ayeshaiqbal@nhs.net",
      parentPhone: "+44 750 576 8718",
      signOnDate: "2026-04-05",
      course: "Novice Robotics",
      lastCheckInDate: "2026-06-12",
      lastCheckInStatus: "Warm engagement, parent wants more homework",
      contactMode: "WhatsApp",
      popStatus: "Uploaded",
      popFileName: "POP_Musa_Club_Fees.pdf",
      tuition: 1200,
      membershipDuration: 1,
      paymentMonthsOutstanding: 0
    },
    {
      id: "mem6",
      studentName: "Celeste Maidment",
      parentName: "Marie Sengonzi",
      parentEmail: "mariesengonzi@gmail.com",
      parentPhone: "+44 798 527 8307",
      signOnDate: "2026-04-18",
      course: "Electronics & IoT",
      lastCheckInDate: "2026-06-14",
      lastCheckInStatus: "Slight cold, missed last Saturday check-in",
      contactMode: "Phone Call",
      popStatus: "Pending",
      tuition: 950,
      membershipDuration: 6,
      paymentMonthsOutstanding: 2
    },
    {
      id: "mem7",
      studentName: "Imraan Naidoo",
      parentName: "Kavin Naidoo",
      parentEmail: "kavin.naidoo@resolute.com",
      parentPhone: "+27 82 455 6789",
      signOnDate: "2026-05-02",
      course: "Advanced Python Coding",
      lastCheckInDate: "2026-06-22",
      lastCheckInStatus: "Understands object-oriented paradigms quickly",
      contactMode: "Online Meeting",
      popStatus: "Uploaded",
      popFileName: "CONFIRMED_POP_IMRAAN.pdf",
      tuition: 1350,
      membershipDuration: 5,
      paymentMonthsOutstanding: 0
    }
  ]);

  // Form states for adding members
  const [newStudent, setNewStudent] = useState("");
  const [newParent, setNewParent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCourse, setNewCourse] = useState("Novice Robotics");
  const [newContact, setNewContact] = useState("WhatsApp");
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newTuition, setNewTuition] = useState<number>(pricePerLearner);
  const [newDuration, setNewDuration] = useState<number>(1);
  const [newArrears, setNewArrears] = useState<number>(0);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.trim() || !newParent.trim()) return;

    const newM: Member = {
      id: "mem_" + Date.now(),
      studentName: newStudent,
      parentName: newParent,
      parentEmail: newEmail || "N/A",
      parentPhone: newPhone || "N/A",
      signOnDate: new Date().toISOString().split("T")[0],
      course: newCourse,
      lastCheckInDate: new Date().toISOString().split("T")[0],
      lastCheckInStatus: newCheckIn || "Successfully onboarded to club",
      contactMode: newContact,
      popStatus: "Pending",
      tuition: newTuition,
      membershipDuration: newDuration,
      paymentMonthsOutstanding: newArrears
    };

    setMembers([newM, ...members]);
    setNewStudent("");
    setNewParent("");
    setNewEmail("");
    setNewPhone("");
    setNewCheckIn("");
    setNewTuition(pricePerLearner);
    setNewDuration(1);
    setNewArrears(0);
    setShowAddForm(false);
  };

  // Dynamic metric calculations for the top dashboard
  const totalActiveMembers = members.length;
  const accumulatedMonthlyRevenue = members.reduce((sum, m) => sum + m.tuition, 0);
  const averageTuition = totalActiveMembers > 0 ? Math.round(accumulatedMonthlyRevenue / totalActiveMembers) : 0;
  const criticalArrearsCount = members.filter(m => m.paymentMonthsOutstanding >= 2).length;
  const milestoneMembersCount = members.filter(m => m.membershipDuration === 6).length;

  const handleSimulateUploadPOP = (id: string) => {
    setIsUploadingIdx(id);
    setTimeout(() => {
      setMembers(mList => mList.map(m => {
        if (m.id === id) {
          return {
            ...m,
            popStatus: "Uploaded",
            popFileName: `POP_${m.studentName.replace(/\s+/g, "_")}_June.pdf`
          };
        }
        return m;
      }));
      setIsUploadingIdx(null);
    }, 1200);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(mList => mList.filter(m => m.id !== id));
  };

  const filteredMembers = members.filter(m => 
    m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Accumulated Revenue & Cohort Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total revenue block */}
        <div className="bg-[#121320] border border-emerald-500/20 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">Accumulated Monthly Revenue</span>
          <div className="my-2">
            <span className="text-2xl font-black text-white font-mono">{currencySymbol}{accumulatedMonthlyRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-gray-500 block">Sum of all individual student tuitions</span>
          </div>
          <div className="text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 w-fit">
            Active Cash Flow
          </div>
        </div>

        {/* Total member count block */}
        <div className="bg-[#121320] border border-brand-blue/25 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-brand-blue">Total Active Members</span>
          <div className="my-2">
            <span className="text-2xl font-black text-white font-mono">{totalActiveMembers} Students</span>
            <span className="text-[10px] text-gray-500 block">Registered active learners</span>
          </div>
          <div className="text-[9px] text-brand-blue font-mono bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/10 w-fit">
            Cohort Capacity
          </div>
        </div>

        {/* Average tuition block */}
        <div className="bg-[#121320] border border-brand-cheddar/20 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-brand-cheddar">Average Student Tuition</span>
          <div className="my-2">
            <span className="text-2xl font-black text-white font-mono">{currencySymbol}{averageTuition.toLocaleString()}</span>
            <span className="text-[10px] text-gray-500 block">Average fee collected / mo</span>
          </div>
          <div className="text-[9px] text-brand-cheddar font-mono bg-brand-cheddar/10 px-2 py-0.5 rounded border border-brand-cheddar/10 w-fit">
            Yield Per Kid
          </div>
        </div>

        {/* Arrears count block */}
        <div className="bg-[#121320] border border-brand-pink/20 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-brand-pink">Payment Arrears Alert</span>
          <div className="my-2">
            <span className="text-2xl font-black text-white font-mono">{criticalArrearsCount} Students</span>
            <span className="text-[10px] text-gray-500 block">&gt;= 2 Months outstanding fees</span>
          </div>
          {criticalArrearsCount > 0 ? (
            <div className="text-[9px] text-brand-pink font-mono bg-brand-pink/10 px-2 py-0.5 rounded border border-brand-pink/15 w-fit uppercase font-bold animate-pulse">
              🚨 Caution Required
            </div>
          ) : (
            <div className="text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 w-fit">
              All Paid Up
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-cheddar" />
            <span>Active Members Directory &amp; Billing Control</span>
          </h3>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Real-time paying cohorts synced to {clubName} Operations. Change individual tuition fees, courses, and track membership duration alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search active students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-brand-onyx/40 border border-brand-blue/20 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white outline-none focus:border-brand-cheddar/50 w-full sm:w-56 transition-all"
            />
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-zaffre font-bold text-xs text-white px-4 py-2 rounded-xl border border-brand-blue/15 transition-all outline-none cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Onboard Student</span>
          </button>
        </div>
      </div>

      {/* Onboard Form Drawer */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[rgba(26,27,38,0.95)] border border-brand-blue/25 p-5 rounded-2xl shadow-xl max-w-2xl"
        >
          <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-cheddar border-b border-brand-blue/10 pb-1.5 mb-2">Onboard New Active Student</h4>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Student Full Name *</label>
              <input 
                type="text"
                required 
                placeholder="e.g. Liam Naidoo"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Parent Full Name *</label>
              <input 
                type="text"
                required 
                placeholder="e.g. Sivan Naidoo"
                value={newParent}
                onChange={(e) => setNewParent(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Parent Email</label>
              <input 
                type="email" 
                placeholder="parent@email.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Parent Phone Line</label>
              <input 
                type="text" 
                placeholder="e.g. +27 82 123 4567"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Registered Program</label>
              <select 
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              >
                <option value="Novice Robotics">Novice Robotics</option>
                <option value="Intermediate Robotics">Intermediate Robotics</option>
                <option value="Advanced Python Coding">Advanced Python Coding</option>
                <option value="Scratch Game Dev">Scratch Game Dev</option>
                <option value="Electronics & IoT">Electronics & IoT</option>
                <option value="Holiday Club Only">Holiday Club Only</option>
                <option value="Winter Holiday Club">Winter Holiday Club</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Preferred Mode of Contact</label>
              <select 
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
                <option value="Online Meeting">Online Meeting</option>
              </select>
            </div>

            {/* Custom Billing & Membership Duration Inputs inside Onboarding form */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Custom Tuition Fee ({currencySymbol === "R" ? "ZAR" : currencySymbol})</label>
              <input 
                type="number"
                min="0"
                value={newTuition}
                onChange={(e) => setNewTuition(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Duration (Months)</label>
                <input 
                  type="number"
                  min="0"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Arrears (Months)</label>
                <select 
                  value={newArrears}
                  onChange={(e) => setNewArrears(parseInt(e.target.value) || 0)}
                  className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
                >
                  <option value={0}>Paid Up (0)</option>
                  <option value={1}>1 Month</option>
                  <option value={2}>2 Months Outstanding</option>
                  <option value={3}>3+ Months Overdue</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">First Progress Log / Check-In Status</label>
              <input 
                type="text" 
                placeholder="e.g. Highly active. Excited to construct the planetary motor gearboxes."
                value={newCheckIn}
                onChange={(e) => setNewCheckIn(e.target.value)}
                className="w-full bg-brand-onyx/40 border border-brand-blue/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-cheddar/40"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2.5 pt-2">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-transparent hover:bg-white/5 border border-white/10 text-xs text-gray-400 rounded-xl px-4 py-2 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-brand-blue hover:bg-brand-zaffre border border-brand-blue/20 text-xs text-white rounded-xl px-5 py-2 font-bold cursor-pointer"
              >
                Confirm Onboard
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Directory Table */}
      <div className="overflow-x-auto rounded-xl border border-brand-blue/10 bg-brand-onyx/10">
        <table className="w-full border-collapse text-left text-xs text-gray-300">
          <thead>
            <tr className="bg-brand-blue/10 border-b border-brand-blue/25 text-gray-300 uppercase tracking-wider font-semibold">
              <th className="p-3">Student Name</th>
              <th className="p-3">Parent / Contact Details</th>
              <th className="p-3">Schedule Program</th>
              <th className="p-3">Tuition / Mo</th>
              <th className="p-3">Last Check-In / Status Date</th>
              <th className="p-3">POP Verification</th>
              <th className="p-3">Duration &amp; Alerts</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-blue/5">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((m) => {
                const isUploading = isUploadingIdx === m.id;
                
                return (
                  <tr key={m.id} className="hover:bg-brand-blue/5 transition-colors">
                    
                    {/* Student Info */}
                    <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                      <div className="h-6 w-6 rounded-full bg-brand-blue/15 flex items-center justify-center text-[10px] text-brand-blue uppercase font-bold border border-brand-blue/20">
                        {m.studentName.charAt(0)}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">{m.studentName}</span>
                        <span className="text-[10px] text-gray-500 font-mono">Sign-on: {m.signOnDate}</span>
                      </div>
                    </td>

                    {/* Contact details */}
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="block font-medium text-gray-200 text-xs">{m.parentName}</span>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <span className="flex items-center gap-0.5"><Phone className="h-2.5 w-2.5 text-brand-cheddar" /> {m.parentPhone}</span>
                          <span className="flex items-center gap-0.5"><Mail className="h-2.5 w-2.5 text-brand-pink" /> {m.parentEmail}</span>
                        </div>
                      </div>
                    </td>

                    {/* Program Selector */}
                    <td className="p-3">
                      <select
                        value={m.course}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMembers(mList => mList.map(member => member.id === m.id ? { ...member, course: val } : member));
                        }}
                        className="bg-brand-onyx/40 border border-brand-blue/20 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-brand-cheddar max-w-[150px]"
                      >
                        <option value="Novice Robotics">Novice Robotics</option>
                        <option value="Intermediate Robotics">Intermediate Robotics</option>
                        <option value="Advanced Python Coding">Advanced Python Coding</option>
                        <option value="Scratch Game Dev">Scratch Game Dev</option>
                        <option value="Electronics & IoT">Electronics & IoT</option>
                        <option value="Holiday Club Only">Holiday Club Only</option>
                        <option value="Winter Holiday Club">Winter Holiday Club</option>
                      </select>
                    </td>

                    {/* Tuition price per month - EDITABLE! */}
                    <td className="p-3 font-mono">
                      <div className="relative flex items-center w-24">
                        <span className="absolute left-2 text-[10px] text-brand-cheddar font-bold">{currencySymbol}</span>
                        <input
                          type="number"
                          value={m.tuition}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setMembers(mList => mList.map(member => member.id === m.id ? { ...member, tuition: val } : member));
                          }}
                          className="w-full bg-brand-onyx/30 border border-brand-blue/20 rounded-lg pl-5 pr-1.5 py-1 text-xs text-brand-cheddar font-mono font-bold outline-none focus:border-brand-cheddar"
                        />
                      </div>
                    </td>

                    {/* Progress check in log */}
                    <td className="p-3 max-w-[180px]">
                      <div className="space-y-0.5">
                        <span className="block text-[10px] text-gray-500">{m.lastCheckInDate} ({m.contactMode})</span>
                        <span className="block text-[10.5px] italic text-gray-300 leading-normal truncate hover:text-white transition-colors cursor-help" title={m.lastCheckInStatus}>
                          "{m.lastCheckInStatus}"
                        </span>
                      </div>
                    </td>

                    {/* POP file validation */}
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {m.popStatus === "Uploaded" ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit font-bold uppercase">
                              <CheckCircle className="h-2.5 w-2.5 fill-emerald-500/15" />
                              POP Synced
                            </span>
                            <span className="text-[9px] text-gray-500 font-mono italic max-w-[100px] truncate" title={m.popFileName}>{m.popFileName}</span>
                          </div>
                        ) : (
                          <button
                            disabled={isUploading}
                            onClick={() => handleSimulateUploadPOP(m.id)}
                            className="bg-brand-blue/10 hover:bg-brand-blue/20 text-[10px] text-brand-blue px-2 py-1 rounded border border-brand-blue/20 flex items-center gap-1 font-bold tracking-wide cursor-pointer transition-all disabled:opacity-50"
                          >
                            <Upload className={`h-2.5 w-2.5 ${isUploading ? "animate-bounce" : ""}`} />
                            {isUploading ? "Uploading..." : "Upload POP"}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Membership Duration & Alerts - REPLACES Parent Vibe column */}
                    <td className="p-3">
                      <div className="flex flex-col gap-1.5 min-w-[160px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">Duration:</span>
                          <input
                            type="number"
                            min="0"
                            value={m.membershipDuration}
                            onChange={(e) => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              setMembers(mList => mList.map(member => member.id === m.id ? { ...member, membershipDuration: val } : member));
                            }}
                            className="w-12 bg-brand-onyx/30 border border-brand-blue/10 rounded px-1.5 py-0.5 text-xs text-white outline-none focus:border-brand-cheddar font-mono"
                          />
                          <span className="text-[10px] text-gray-500">mo</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">Arrears:</span>
                          <select
                            value={m.paymentMonthsOutstanding}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setMembers(mList => mList.map(member => member.id === m.id ? { ...member, paymentMonthsOutstanding: val } : member));
                            }}
                            className="bg-brand-onyx/40 border border-brand-blue/10 rounded px-1 py-0.5 text-[10px] text-white outline-none cursor-pointer"
                          >
                            <option value={0}>Paid (0 mo)</option>
                            <option value={1}>1 Mo Unpaid</option>
                            <option value={2}>2 Mo Unpaid</option>
                            <option value={3}>3+ Mo Overdue</option>
                          </select>
                        </div>

                        {/* Reminders badge panel */}
                        <div className="space-y-1">
                          {m.membershipDuration === 6 && (
                            <span className="block text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">
                              🏆 6-Mo Milestone! Congratulate!
                            </span>
                          )}
                          {m.paymentMonthsOutstanding >= 2 && (
                            <span className="block text-[9px] bg-[#E8596D]/15 text-[#E8596D] border border-[#E8596D]/25 px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">
                              ⚠️ 2 Mo Late: Issue Cautionary
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Delete item */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteMember(m.id)}
                        className="text-gray-500 hover:text-brand-pink transition-colors p-1"
                        title="Offboard lead from payment roll"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">No active members found. onboard new ones using the CTA button above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
