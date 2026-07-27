// Utility functions for parsing Marketing Leads CSV and Club Members CSV, and cross-matching both.

export interface ParsedLead {
  groupId: number;
  parentName: string;
  childName: string;
  age: string;
  schoolName: string;
  residenceArea: string;
  contactMode: string;
  tags: string[];
  email: string;
  phone: string;
  isContacted: boolean;
  touchCount: number;
  emailsSent: number;
  whatsAppSent: number;
  phoneCallsMade: number;
  rawStatusText: string;
  createdDate: string;
  lastContactDate: string;
  isMatchedMember?: boolean;
  matchedTuition?: number;
  [key: number]: any; // Index signature for backward compatibility with [groupId, parentName, childName...] array accesses
}

export interface ParsedMember {
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
  isMatchedWithLead?: boolean;
  matchedLeadGroup?: number;
}

export interface CrossMatchSummary {
  totalLeads: number;
  contactedLeads: number;
  uncontactedLeads: number;
  contactedPercentage: number;
  emailsSentTotal: number;
  whatsAppSentTotal: number;
  phoneCallsMadeTotal: number;
  touchDistribution: {
    zero: number;
    oneToTwo: number;
    threeToFour: number;
    fivePlus: number;
  };
  matchedMembersCount: number;
  matchedMRR: number;
  leadConversionRate: number;
  contactedConversionRate: number;
  holidayCampaignLeads: number;
  normalMarketingLeads: number;
  totalTrialsCount: number;
}

// Smart CSV line splitter handling quotes
export const splitCSVLine = (line: string): string[] => {
  return line
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map(v => v.replace(/^"|"$/g, "").trim());
};

// Normalize text for matching
export const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
};

// Parse Marketing Leads CSV (e.g., monday.com export with 1300+ leads)
export const parseMarketingLeadsCSV = (csvText: string): ParsedLead[] => {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  let parentNameCol = 0;
  let childNameCol = 5;
  let ageCol = 6;
  let schoolCol = 7;
  let memberStatusCol = 12;
  let residenceAreaCol = 13;
  let newsletterCol = 14;
  let emailCol = -1;
  let phoneCol = -1;
  let touchCol = -1;
  let emailsSentCol = -1;

  // Header detection logic
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    const lineVal = lines[i].toLowerCase();
    if (lineVal.includes("parent name") || lineVal.includes("child's name") || lineVal.includes("email") || lineVal.includes("phone")) {
      const cols = splitCSVLine(lines[i]).map(c => c.toLowerCase());
      cols.forEach((col, idx) => {
        if (col.includes("parent name") || col.includes("parent’s name")) parentNameCol = idx;
        if (col.includes("child's name") || col.includes("child name") || col.includes("childs name")) childNameCol = idx;
        if (col.includes("child's age") || col.includes("child age") || col.includes("age")) ageCol = idx;
        if (col.includes("school name") || col.includes("school")) schoolCol = idx;
        if (col.includes("member status") || col.includes("status") || col.includes("lead status")) memberStatusCol = idx;
        if (col.includes("residence") || col.includes("area of residence")) residenceAreaCol = idx;
        if (col.includes("newsletter") || col.includes("subscribe")) newsletterCol = idx;
        if (col.includes("email") || col.includes("e-mail")) emailCol = idx;
        if (col.includes("phone") || col.includes("whatsapp") || col.includes("contact number") || col.includes("mobile")) phoneCol = idx;
        if (col.includes("touch") || col.includes("contact frequency") || col.includes("times contacted")) touchCol = idx;
        if (col.includes("emails sent") || col.includes("email count") || col.includes("invoices sent")) emailsSentCol = idx;
      });
      break;
    }
  }

  const parsed: ParsedLead[] = [];
  let currentSectionId = 1; // Default to Contacted waiting for response

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = splitCSVLine(line);
    if (columns.length < 2) continue;

    const rawFirst = columns[0] ? columns[0].trim().toLowerCase() : "";

    // Check for monday.com group headers or spreadsheet decor
    const isDecorator = rawFirst.includes("board") || rawFirst.includes("spreadsheet was created") || rawFirst.includes("incoming leads") || rawFirst.includes("parent name and surname");
    const isSection = columns.length > 2 && !columns[2] && !columns[3] && !columns[5];

    if (isDecorator || isSection) {
      if (rawFirst.includes("winter holiday camp")) currentSectionId = 0;
      else if (rawFirst.includes("waiting for response")) currentSectionId = 1;
      else if (rawFirst.includes("weekend classes")) currentSectionId = 2;
      else if (rawFirst.includes("next class cycle")) currentSectionId = 3;
      else if (rawFirst.includes("trial") || rawFirst.includes("booked")) currentSectionId = 4;
      else if (rawFirst.includes("blocked") || rawFirst.includes("cannot whatsapp")) currentSectionId = 5;
      else if (rawFirst.includes("registers to club")) currentSectionId = 6;
      else if (rawFirst.includes("attends club")) currentSectionId = 7;
      else if (rawFirst.includes("left the club") || rawFirst.includes("lost leads")) currentSectionId = 8;
      else if (rawFirst.includes("misdirected")) currentSectionId = 9;
      else if (rawFirst.includes("outside of")) currentSectionId = 10;
      else if (rawFirst.includes("holiday club- registration") || rawFirst.includes("holiday club - registration")) currentSectionId = 11;
      continue;
    }

    const parentName = columns[parentNameCol] || "Inbound Parent";
    const childName = columns[childNameCol] || "Student Lead";
    const age = columns[ageCol] || "8";
    const schoolName = columns[schoolCol] || "Primary School";
    const residenceArea = columns[residenceAreaCol] || "District";
    const rawStatus = (columns[memberStatusCol] || "").trim().toLowerCase();
    const newsletterVal = (columns[newsletterCol] || "no").toLowerCase();
    
    // Extract Email & Phone from explicit columns or scanning
    let email = emailCol >= 0 && columns[emailCol] ? columns[emailCol].trim() : "";
    let phone = phoneCol >= 0 && columns[phoneCol] ? columns[phoneCol].trim() : "";

    // Fallback scanner for email & phone in columns if not explicitly found
    if (!email) {
      const emailColMatch = columns.find(c => c.includes("@") && c.includes("."));
      if (emailColMatch) email = emailColMatch.trim();
    }
    if (!phone) {
      const phoneColMatch = columns.find(c => c.length >= 8 && /^[+\d\s()-]+$/.test(c.trim()));
      if (phoneColMatch) phone = phoneColMatch.trim();
    }

    // Determine contact mode
    let contactMode = "WhatsApp";
    if (currentSectionId === 5 || rawStatus.includes("email")) {
      contactMode = "Email";
    } else if (newsletterVal === "yes") {
      contactMode = "WhatsApp";
    } else if (rawStatus.includes("phone") || rawStatus.includes("call")) {
      contactMode = "Phone Call";
    }

    // Determine if contacted
    const isContacted = (
      currentSectionId !== 8 && // Not lost/misdirected
      currentSectionId !== 9 &&
      currentSectionId !== 10
    ) || rawStatus.includes("contacted") || rawStatus.includes("emailed") || rawStatus.includes("waiting") || rawStatus.includes("trial") || rawStatus.includes("member");

    // Touch count derivation
    let touchCount = 0;
    if (touchCol >= 0 && columns[touchCol] && !isNaN(parseInt(columns[touchCol]))) {
      touchCount = parseInt(columns[touchCol]);
    } else {
      if (currentSectionId === 0) touchCount = 1;
      else if (currentSectionId === 1) touchCount = 2; // Waiting for response
      else if (currentSectionId === 2) touchCount = 2;
      else if (currentSectionId === 3) touchCount = 3;
      else if (currentSectionId === 4) touchCount = 3; // Trial booked
      else if (currentSectionId === 5) touchCount = 4; // Emailed personally
      else if (currentSectionId === 6 || currentSectionId === 7) touchCount = 5; // Registered/attends
      else if (isContacted) touchCount = 1;
      else touchCount = 0;
    }

    // Email count derivation
    let emailsSent = 0;
    if (emailsSentCol >= 0 && columns[emailsSentCol] && !isNaN(parseInt(columns[emailsSentCol]))) {
      emailsSent = parseInt(columns[emailsSentCol]);
    } else {
      if (contactMode === "Email" || currentSectionId === 5) emailsSent = Math.max(1, touchCount);
      else if (newsletterVal === "yes") emailsSent = 1;
      else if (isContacted) emailsSent = 1;
      else emailsSent = 0;
    }

    let whatsAppSent = contactMode === "WhatsApp" ? Math.max(1, touchCount) : 0;
    let phoneCallsMade = contactMode === "Phone Call" ? Math.max(1, touchCount) : 0;

    const dateStr = new Date().toISOString().split("T")[0];
    const isHolidayCamp = currentSectionId === 0 || currentSectionId === 11;
    const comment = isHolidayCamp ? "Holiday Club Campaign Lead" : "Inbound Ad Campaign";

    // Create array with array index support for legacy code
    const rowObj: any = [
      currentSectionId,
      parentName,
      childName,
      age,
      schoolName,
      residenceArea,
      contactMode,
      [comment, dateStr]
    ];

    // Attach rich metadata properties
    rowObj.groupId = currentSectionId;
    rowObj.parentName = parentName;
    rowObj.childName = childName;
    rowObj.age = age;
    rowObj.schoolName = schoolName;
    rowObj.residenceArea = residenceArea;
    rowObj.contactMode = contactMode;
    rowObj.tags = [comment, dateStr];
    rowObj.email = email;
    rowObj.phone = phone;
    rowObj.isContacted = isContacted;
    rowObj.touchCount = touchCount;
    rowObj.emailsSent = emailsSent;
    rowObj.whatsAppSent = whatsAppSent;
    rowObj.phoneCallsMade = phoneCallsMade;
    rowObj.rawStatusText = rawStatus;
    rowObj.createdDate = dateStr;
    rowObj.lastContactDate = dateStr;

    parsed.push(rowObj);
  }

  return parsed;
};

// Parse Club Members CSV (active members file)
export const parseClubMembersCSV = (csvText: string, defaultTuition: number = 1200): ParsedMember[] => {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  let nameCol = 0;
  let statusCol = -1;
  let childNameCol = -1;
  let parentNameCol = -1;
  let tuitionCol = -1;
  let courseCol = -1;
  let emailCol = -1;
  let phoneCol = -1;

  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const lineVal = lines[i].toLowerCase();
    if (lineVal.includes("name") || lineVal.includes("status") || lineVal.includes("payment") || lineVal.includes("tuition")) {
      const cols = splitCSVLine(lines[i]).map(c => c.toLowerCase());
      cols.forEach((col, idx) => {
        if (col.includes("child's name") || col.includes("childs name") || col.includes("child name")) childNameCol = idx;
        if (col.includes("parent’s name") || col.includes("parent name") || col.includes("parent's name")) parentNameCol = idx;
        if (col.includes("membership status") || col.includes("status")) statusCol = idx;
        if (col.includes("payment amount") || col.includes("tuition") || col.includes("fee") || col.includes("amount")) tuitionCol = idx;
        if (col.includes("program option") || col.includes("course") || col.includes("program")) courseCol = idx;
        if (col.includes("email")) emailCol = idx;
        if (col.includes("phone") || col.includes("number")) phoneCol = idx;
        if (col.includes("name") && nameCol === 0) nameCol = idx;
      });
      break;
    }
  }

  const members: ParsedMember[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = splitCSVLine(line);
    if (columns.length < 2) continue;

    const rawFirst = columns[0] ? columns[0].trim().toLowerCase() : "";
    if (rawFirst.includes("name") && rawFirst.includes("status")) continue; // Skip header

    let studentName = childNameCol >= 0 && columns[childNameCol] ? columns[childNameCol].trim() : columns[nameCol] || "Active Student";
    let parentName = parentNameCol >= 0 && columns[parentNameCol] ? columns[parentNameCol].trim() : "Guardian";
    let email = emailCol >= 0 && columns[emailCol] ? columns[emailCol].trim() : "";
    let phone = phoneCol >= 0 && columns[phoneCol] ? columns[phoneCol].trim() : "";
    let course = courseCol >= 0 && columns[courseCol] ? columns[courseCol].trim() : "Robotics & Coding";
    
    let tuitionVal = defaultTuition;
    if (tuitionCol >= 0 && columns[tuitionCol]) {
      const parsedFee = parseFloat(columns[tuitionCol].replace(/[^0-9.]/g, ""));
      if (!isNaN(parsedFee) && parsedFee > 0) tuitionVal = parsedFee;
    }

    if (!email) {
      const matchedEmail = columns.find(c => c.includes("@") && c.includes("."));
      if (matchedEmail) email = matchedEmail.trim();
    }
    if (!phone) {
      const matchedPhone = columns.find(c => c.length >= 7 && /^[+\d\s()-]+$/.test(c.trim()));
      if (matchedPhone) phone = matchedPhone.trim();
    }

    members.push({
      id: `mem_csv_${i + 1}`,
      studentName,
      parentName,
      parentEmail: email,
      parentPhone: phone,
      signOnDate: new Date().toISOString().split("T")[0],
      course,
      lastCheckInDate: "Recent Check-in",
      lastCheckInStatus: "Active Member Attendance",
      contactMode: "WhatsApp",
      popStatus: "Uploaded",
      tuition: tuitionVal,
      membershipDuration: 6,
      paymentMonthsOutstanding: 0
    });
  }

  return members;
};

// Cross-match Marketing Leads against Club Members
export const crossMatchData = (
  leadsArr: ParsedLead[],
  membersArr: ParsedMember[]
): {
  updatedLeads: ParsedLead[];
  updatedMembers: ParsedMember[];
  summary: CrossMatchSummary;
} => {
  // Build lookup maps from members
  const memberEmailMap = new Set<string>();
  const memberNameMap = new Set<string>();
  const memberPhoneMap = new Set<string>();

  membersArr.forEach(m => {
    if (m.parentEmail) memberEmailMap.add(normalizeText(m.parentEmail));
    if (m.parentName && m.studentName) {
      memberNameMap.add(`${normalizeText(m.parentName)}_${normalizeText(m.studentName)}`);
    }
    if (m.parentPhone) memberPhoneMap.add(normalizeText(m.parentPhone));
  });

  let contactedCount = 0;
  let uncontactedCount = 0;
  let emailsSentTotal = 0;
  let whatsAppSentTotal = 0;
  let phoneCallsMadeTotal = 0;
  let zeroTouch = 0;
  let oneToTwoTouch = 0;
  let threeToFourTouch = 0;
  let fivePlusTouch = 0;
  let matchedMembersCount = 0;
  let matchedMRR = 0;
  let holidayCampaignLeads = 0;
  let normalMarketingLeads = 0;
  let totalTrialsCount = 0;

  const leadMatchedMap = new Set<string>();

  const updatedLeads = leadsArr.map(lead => {
    const pName = normalizeText(lead.parentName || String(lead[1]));
    const cName = normalizeText(lead.childName || String(lead[2]));
    const key = `${pName}_${cName}`;
    const emailNorm = normalizeText(lead.email || "");
    const phoneNorm = normalizeText(lead.phone || "");

    const isMemberByCSV = (
      (emailNorm && memberEmailMap.has(emailNorm)) ||
      memberNameMap.has(key) ||
      (phoneNorm && memberPhoneMap.has(phoneNorm)) ||
      lead[0] === 6 || // Group 6 = Registers to club
      lead[0] === 7   // Group 7 = Attends club
    );

    if (isMemberByCSV) {
      leadMatchedMap.add(key);
      if (emailNorm) leadMatchedMap.add(emailNorm);
      matchedMembersCount++;
      const tu = lead.matchedTuition || 1200;
      matchedMRR += tu;
    }

    if (lead.isContacted || lead[0] === 1 || lead[0] === 4 || lead[0] === 6 || lead[0] === 7) {
      contactedCount++;
    } else {
      uncontactedCount++;
    }

    if (lead[0] === 0 || lead[0] === 11) {
      holidayCampaignLeads++;
    } else {
      normalMarketingLeads++;
    }

    if (lead[0] === 4) {
      totalTrialsCount++;
    }

    const tCount = lead.touchCount || 0;
    if (tCount === 0) zeroTouch++;
    else if (tCount <= 2) oneToTwoTouch++;
    else if (tCount <= 4) threeToFourTouch++;
    else fivePlusTouch++;

    emailsSentTotal += lead.emailsSent || (lead.contactMode === "Email" ? 1 : 0);
    whatsAppSentTotal += lead.whatsAppSent || (lead.contactMode === "WhatsApp" ? 1 : 0);
    phoneCallsMadeTotal += lead.phoneCallsMade || (lead.contactMode === "Phone Call" ? 1 : 0);

    const updatedLead = { ...lead };
    updatedLead.isMatchedMember = isMemberByCSV;
    return updatedLead;
  });

  const updatedMembers = membersArr.map(member => {
    const emailNorm = normalizeText(member.parentEmail || "");
    const key = `${normalizeText(member.parentName)}_${normalizeText(member.studentName)}`;
    const isMatched = memberEmailMap.has(emailNorm) || leadMatchedMap.has(key);

    return {
      ...member,
      isMatchedWithLead: isMatched
    };
  });

  const totalLeads = updatedLeads.length || 1;
  const contactedPercentage = Math.round((contactedCount / totalLeads) * 1000) / 10;
  const leadConversionRate = Math.round((matchedMembersCount / totalLeads) * 1000) / 10;
  const contactedConversionRate = contactedCount > 0 ? Math.round((matchedMembersCount / contactedCount) * 1000) / 10 : 0;

  return {
    updatedLeads,
    updatedMembers,
    summary: {
      totalLeads: updatedLeads.length,
      contactedLeads: contactedCount,
      uncontactedLeads: uncontactedCount,
      contactedPercentage,
      emailsSentTotal,
      whatsAppSentTotal,
      phoneCallsMadeTotal,
      touchDistribution: {
        zero: zeroTouch,
        oneToTwo: oneToTwoTouch,
        threeToFour: threeToFourTouch,
        fivePlus: fivePlusTouch
      },
      matchedMembersCount,
      matchedMRR,
      leadConversionRate,
      contactedConversionRate,
      holidayCampaignLeads,
      normalMarketingLeads,
      totalTrialsCount
    }
  };
};
