import type { Acknowledgment, Clinic, Organization, PolicyItem, User } from "@/types";

export type VerticalPresetId = "veterinary" | "accounting" | "law";

export interface VerticalPreset {
  roleLabels: Record<string, string>;
  locationLabel: string;
  locationLabelPlural: string;
  id: VerticalPresetId;
  label: string;
  shortLabel: string;
  industry: string;
  organization: Organization;
  clinics: Clinic[];
  users: User[];
  categories: string[];
  policies: PolicyItem[];
  acknowledgments: Acknowledgment[];
  landingLabel: string;
  landingDescription: string;
  moduleHighlights: string[];
}

const accountingClinics: Clinic[] = [
  { id: "acct-downtown", name: "Downtown Advisory Office", orgId: "org-accounting" },
  { id: "acct-west", name: "West End Tax & Payroll Hub", orgId: "org-accounting" },
  { id: "acct-north", name: "North Corporate Services", orgId: "org-accounting" },
];

const accountingUsers: User[] = [
  { id: "acct-owner", name: "Scott Wilde", email: "scott@business.inc", role: "practice_manager", clinics: accountingClinics.map((c) => c.id), initials: "SW" },
  { id: "acct-olivia", name: "Olivia Grant, CPA", email: "olivia@business.inc", role: "manager", clinics: ["acct-downtown"], initials: "OG" },
  { id: "acct-noah", name: "Noah Patel, CPA", email: "noah@business.inc", role: "manager", clinics: ["acct-west"], initials: "NP" },
  { id: "acct-emma", name: "Emma Chen, Controller", email: "emma@business.inc", role: "manager", clinics: ["acct-north"], initials: "EC" },
  { id: "acct-julia", name: "Julia Park, Senior Bookkeeper", email: "julia@business.inc", role: "staff", clinics: ["acct-downtown"], initials: "JP" },
  { id: "acct-ethan", name: "Ethan Ross, Payroll Specialist", email: "ethan@business.inc", role: "staff", clinics: ["acct-west"], initials: "ER" },
  { id: "acct-priya", name: "Priya Singh, Staff Accountant", email: "priya@business.inc", role: "staff", clinics: ["acct-north"], initials: "PS" },
  { id: "acct-liam", name: "Liam Brooks, Client Success", email: "liam@business.inc", role: "staff", clinics: ["acct-downtown"], initials: "LB" },
];

const accountingCategories = [
  "Tax & Compliance",
  "Client Intake",
  "Payroll",
  "Month-End Close",
  "Data Security",
  "Advisory",
  "Billing",
  "Document Retention",
  "Operations",
  "HR & Conduct",
];

const accountingPolicies: PolicyItem[] = [
  {
    id: "acct-pol-1",
    title: "Client Document Intake & Missing-Item Escalation",
    type: "policy",
    category: "Client Intake",
    clinics: accountingClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-04-03",
    reviewDate: "2026-10-03",
    version: 2,
    body: `## Purpose
Create one intake standard so bookkeeping, tax, and advisory teams know exactly when a client file is complete enough to begin work.

## Scope
Applies to client success, bookkeepers, staff accountants, payroll specialists, and office managers.

## Intake Standard
1. Log every incoming document set the same day it is received.
2. Mark the file as Complete, Partial, or Critical Missing.
3. If payroll source data, government notices, or bank records are missing, the file may not move to ready-for-work status.

## Escalation
- Send the missing-items request to the client within 2 business hours.
- If critical items remain missing after 24 hours, escalate to the office manager.
- If a filing deadline is within 5 business days, manager outreach is same-day.

## Accountability
Managers review all Critical Missing files in the daily production check-in.`,
    createdBy: "acct-owner",
    createdAt: "2026-03-20",
    updatedAt: "2026-04-08",
  },
  {
    id: "acct-pol-2",
    title: "Payroll Change Approval & Four-Eyes Review",
    type: "policy",
    category: "Payroll",
    clinics: ["acct-west", "acct-north"],
    status: "published",
    effectiveDate: "2026-04-01",
    reviewDate: "2026-10-01",
    version: 1,
    body: `## Purpose
Reduce payroll risk by requiring clear approval, audit trail, and secondary review for pay-impacting changes.

## Policy
1. Any new salary, wage, bonus, or deduction change must have written client approval.
2. The preparer enters the change and attaches the approval note.
3. A second team member reviews the change before payroll is finalized.
4. Same-day verbal approvals must be summarized in writing before processing.

## Exceptions
Emergency off-cycle payments require manager approval and same-day documentation cleanup.

## Compliance
Missing approval or missing reviewer signoff is treated as a payroll incident.`,
    createdBy: "acct-noah",
    createdAt: "2026-03-28",
    updatedAt: "2026-04-05",
  },
  {
    id: "acct-pol-3",
    title: "Month-End Close Ownership & Cutoff Checklist",
    type: "sog",
    category: "Month-End Close",
    clinics: accountingClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-03-25",
    reviewDate: "2026-09-25",
    version: 2,
    body: `## Purpose
Make month-end close predictable across offices and stop files from stalling between bookkeeping and review.

## Workflow
1. Bookkeeper posts all recurring entries and clears the bank-feed exception queue.
2. Staff accountant completes reconciliation checklist.
3. Manager reviews unusual variances and signs off the close packet.
4. Client-ready package goes out within the agreed service window.

## Cutoff Rules
- Revenue and payroll cutoff assumptions must be documented in the file.
- Any unresolved balance over the office threshold requires manager review before release.

## Notes
Use the standard close checklist for every recurring client, even if the month was quiet.`,
    createdBy: "acct-emma",
    createdAt: "2026-03-18",
    updatedAt: "2026-04-06",
  },
  {
    id: "acct-pol-4",
    title: "CRA / Tax Notice Triage Standard",
    type: "sog",
    category: "Tax & Compliance",
    clinics: accountingClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-04-02",
    reviewDate: "2026-10-02",
    version: 1,
    body: `## Purpose
Ensure government notices are triaged fast enough that the firm never loses time on avoidable penalties or missed responses.

## Workflow
1. Log every notice the same business day.
2. Tag severity as Informational, Action Required, or Urgent Deadline.
3. Assign an owner before close of business.
4. For urgent deadlines, confirm client contact and response plan the same day.

## Service Standard
Urgent Deadline notices must be reviewed by a manager within 2 hours of receipt.`,
    createdBy: "acct-owner",
    createdAt: "2026-04-02",
    updatedAt: "2026-04-07",
  },
  {
    id: "acct-pol-5",
    title: "Secure Portal Upload & Client Identity Verification",
    type: "policy",
    category: "Data Security",
    clinics: accountingClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-03-15",
    reviewDate: "2026-09-15",
    version: 2,
    body: `## Purpose
Protect client financial data during document exchange and call-back requests.

## Core Standard
- Sensitive records move through the secure portal only.
- Email attachments with SINs, payroll files, or tax slips are not the default channel.
- Caller identity must be verified before discussing balances, filings, or payroll.

## Verification Steps
1. Confirm business name and primary contact.
2. Confirm one approved file detail already on record.
3. If uncertain, end the call and call back using the CRM contact number.

## Compliance
Potential privacy breaches must be escalated to the office manager immediately.`,
    createdBy: "acct-olivia",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-01",
  },
  {
    id: "acct-pol-6",
    title: "T4 / T5 Deadline Week Coverage Plan",
    type: "info",
    category: "Operations",
    clinics: ["acct-west", "acct-north"],
    status: "draft",
    effectiveDate: "2026-04-15",
    expiryDate: "2026-04-30",
    version: 1,
    body: `## Update
Business Inc. will run extended processing coverage during deadline week to protect filing turnaround and callback speed.

## What staff need to know
- West End payroll team starts 30 minutes earlier.
- North Corporate Services keeps one floating reviewer unbooked each afternoon.
- Managers review queue pressure at 11:00 AM and 3:30 PM.

## Status
Draft for manager approval before publish.`,
    createdBy: "acct-noah",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-10",
  },
];

const accountingAcknowledgments: Acknowledgment[] = [
  { id: "acct-ack-1", policyId: "acct-pol-1", userId: "acct-julia", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "acct-ack-2", policyId: "acct-pol-4", userId: "acct-julia", acknowledgedAt: "2026-04-05", dueDate: "2026-04-06" },
  { id: "acct-ack-3", policyId: "acct-pol-5", userId: "acct-julia", acknowledgedAt: null, dueDate: "2026-04-11" },
  { id: "acct-ack-4", policyId: "acct-pol-2", userId: "acct-ethan", acknowledgedAt: null, dueDate: "2026-04-09" },
  { id: "acct-ack-5", policyId: "acct-pol-4", userId: "acct-ethan", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "acct-ack-6", policyId: "acct-pol-3", userId: "acct-priya", acknowledgedAt: "2026-04-03", dueDate: "2026-04-04" },
  { id: "acct-ack-7", policyId: "acct-pol-5", userId: "acct-priya", acknowledgedAt: "2026-04-02", dueDate: "2026-04-03" },
  { id: "acct-ack-8", policyId: "acct-pol-1", userId: "acct-liam", acknowledgedAt: null, dueDate: "2026-04-10" },
];

const lawClinics: Clinic[] = [
  { id: "law-downtown", name: "Downtown Family Law Group", orgId: "org-law" },
  { id: "law-corporate", name: "Corporate & Commercial Practice", orgId: "org-law" },
  { id: "law-litigation", name: "Litigation Support Office", orgId: "org-law" },
];

const lawUsers: User[] = [
  { id: "law-owner", name: "Scott Wilde", email: "scott@business.inc", role: "practice_manager", clinics: lawClinics.map((c) => c.id), initials: "SW" },
  { id: "law-rachel", name: "Rachel Kim, Partner", email: "rachel@business.inc", role: "manager", clinics: ["law-downtown"], initials: "RK" },
  { id: "law-daniel", name: "Daniel Price, Partner", email: "daniel@business.inc", role: "manager", clinics: ["law-corporate"], initials: "DP" },
  { id: "law-maya", name: "Maya Lopez, Practice Manager", email: "maya@business.inc", role: "manager", clinics: ["law-litigation"], initials: "ML" },
  { id: "law-sophie", name: "Sophie Tran, Law Clerk", email: "sophie@business.inc", role: "staff", clinics: ["law-downtown"], initials: "ST" },
  { id: "law-jacob", name: "Jacob Wells, Legal Assistant", email: "jacob@business.inc", role: "staff", clinics: ["law-corporate"], initials: "JW" },
  { id: "law-aisha", name: "Aisha Noor, Litigation Clerk", email: "aisha@business.inc", role: "staff", clinics: ["law-litigation"], initials: "AN" },
  { id: "law-emily", name: "Emily Hart, Intake Coordinator", email: "emily@business.inc", role: "staff", clinics: ["law-downtown"], initials: "EH" },
];

const lawCategories = [
  "Conflicts & Intake",
  "Client Trust",
  "File Management",
  "Court Deadlines",
  "Confidentiality",
  "Billing",
  "Retainers",
  "Operations",
  "HR & Conduct",
  "Practice Standards",
];

const lawPolicies: PolicyItem[] = [
  {
    id: "law-pol-1",
    title: "New Matter Intake & Conflict Check Gate",
    type: "policy",
    category: "Conflicts & Intake",
    clinics: lawClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-04-03",
    reviewDate: "2026-10-03",
    version: 2,
    body: `## Purpose
Prevent avoidable conflicts and incomplete client openings by making intake and conflict clearance one controlled gate.

## Scope
Applies to intake coordinators, assistants, clerks, and lawyers opening or reactivating a matter.

## Policy
1. No matter may be opened before a conflict check is run.
2. Intake notes must capture all known parties, related companies, and opposing counsel if known.
3. If the conflict result is unclear, the file remains on hold until lawyer review.

## Escalation
Potential conflict matches are reviewed by the responsible lawyer the same day.`,
    createdBy: "law-owner",
    createdAt: "2026-03-21",
    updatedAt: "2026-04-08",
  },
  {
    id: "law-pol-2",
    title: "Trust Retainer Receipt & Deposit Verification",
    type: "policy",
    category: "Client Trust",
    clinics: ["law-downtown", "law-corporate"],
    status: "published",
    effectiveDate: "2026-03-28",
    reviewDate: "2026-09-28",
    version: 1,
    body: `## Purpose
Protect trust handling by standardizing who records retainer receipts, who verifies deposits, and when the file may proceed.

## Policy
1. Retainer funds are logged the same day received.
2. Deposit confirmation must match the receipt record before trust status is marked ready.
3. No substantive work begins on a trust-required file until the retainer status is clear or lawyer direction is documented.

## Compliance
Any mismatch between receipt, ledger entry, and deposit confirmation is escalated to the practice manager immediately.`,
    createdBy: "law-daniel",
    createdAt: "2026-03-28",
    updatedAt: "2026-04-04",
  },
  {
    id: "law-pol-3",
    title: "Court Deadline Diary & Two-Step Verification",
    type: "sog",
    category: "Court Deadlines",
    clinics: lawClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-03-30",
    reviewDate: "2026-09-30",
    version: 2,
    body: `## Purpose
Reduce missed dates by requiring every litigation and family-law deadline to be diarized and verified twice.

## Workflow
1. Enter the deadline into the matter file and central calendar.
2. A second team member confirms the date source and lead time.
3. Responsible lawyer reviews high-risk deadlines within one business day.
4. Weekly deadline meeting resolves gaps, ownership, and upcoming pinch points.

## Notes
Same-day service deadlines and limitation dates are priority review items.`,
    createdBy: "law-maya",
    createdAt: "2026-03-22",
    updatedAt: "2026-04-05",
  },
  {
    id: "law-pol-4",
    title: "Client Confidentiality, Redaction & External Sharing",
    type: "policy",
    category: "Confidentiality",
    clinics: lawClinics.map((c) => c.id),
    status: "published",
    effectiveDate: "2026-03-18",
    reviewDate: "2026-09-18",
    version: 2,
    body: `## Purpose
Keep privileged and sensitive information controlled during email, portal delivery, and document production.

## Core Standard
- Share only the minimum necessary material.
- Redact personal identifiers before external distribution unless disclosure is required.
- Use the secure client portal for sensitive production whenever possible.

## Verification
If you are unsure whether a document is safe to share, stop and escalate to the lawyer responsible for the matter.`,
    createdBy: "law-rachel",
    createdAt: "2026-03-18",
    updatedAt: "2026-04-02",
  },
  {
    id: "law-pol-5",
    title: "File Closing, Return of Originals & Retention Checklist",
    type: "sog",
    category: "File Management",
    clinics: ["law-corporate", "law-litigation"],
    status: "published",
    effectiveDate: "2026-04-01",
    reviewDate: "2026-10-01",
    version: 1,
    body: `## Purpose
Close matters cleanly so the firm can prove what was returned, what was retained, and what the client was told.

## Workflow
1. Confirm final billing status.
2. Confirm return or storage of originals.
3. Save final closing memo and retention date.
4. Mark the matter closed only after checklist completion.

## Notes
Files with appeal windows or ongoing undertakings require lawyer signoff before closure.`,
    createdBy: "law-daniel",
    createdAt: "2026-04-01",
    updatedAt: "2026-04-06",
  },
  {
    id: "law-pol-6",
    title: "Urgent Motion Week Staffing & Coverage Plan",
    type: "info",
    category: "Operations",
    clinics: ["law-litigation"],
    status: "draft",
    effectiveDate: "2026-04-16",
    expiryDate: "2026-04-23",
    version: 1,
    body: `## Update
Business Inc. will run an adjusted support rotation during urgent motion week to keep filing, service, and client updates moving.

## What staff need to know
- One litigation clerk remains unbooked each afternoon for court-facing work.
- Practice manager reviews next-day court list at 4:00 PM.
- Client updates go out before end of day on active urgent files.

## Status
Draft for final partner approval.`,
    createdBy: "law-maya",
    createdAt: "2026-04-10",
    updatedAt: "2026-04-10",
  },
];

const lawAcknowledgments: Acknowledgment[] = [
  { id: "law-ack-1", policyId: "law-pol-1", userId: "law-sophie", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "law-ack-2", policyId: "law-pol-4", userId: "law-sophie", acknowledgedAt: "2026-04-04", dueDate: "2026-04-05" },
  { id: "law-ack-3", policyId: "law-pol-2", userId: "law-jacob", acknowledgedAt: null, dueDate: "2026-04-09" },
  { id: "law-ack-4", policyId: "law-pol-5", userId: "law-jacob", acknowledgedAt: null, dueDate: "2026-04-11" },
  { id: "law-ack-5", policyId: "law-pol-3", userId: "law-aisha", acknowledgedAt: "2026-04-03", dueDate: "2026-04-04" },
  { id: "law-ack-6", policyId: "law-pol-4", userId: "law-aisha", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "law-ack-7", policyId: "law-pol-1", userId: "law-emily", acknowledgedAt: null, dueDate: "2026-04-10" },
];



const vetClinics: Clinic[] = [
  { id: "clinic-rv", name: "Rosslyn Veterinary Clinic", orgId: "org-1" },
  { id: "clinic-tg", name: "Tudor Glen Veterinary Hospital", orgId: "org-1" },
  { id: "clinic-rp", name: "Rosslyn Park Animal Hospital", orgId: "org-1" },
];
const vetUsers: User[] = [
  {
    id: "user-scott",
    name: "Scott W.",
    email: "scott@rosslynvet.ca",
    role: "practice_manager",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    initials: "SW",
  },
  {
    id: "user-emma",
    name: "Emma L.",
    email: "emma@rosslynvet.ca",
    role: "manager",
    clinics: ["clinic-rv"],
    initials: "EL",
  },
  {
    id: "user-tyler",
    name: "Tyler K.",
    email: "tyler@tudorglen.ca",
    role: "manager",
    clinics: ["clinic-tg"],
    initials: "TK",
  },
  {
    id: "user-jess",
    name: "Jess M.",
    email: "jess@rosslynvet.ca",
    role: "staff",
    clinics: ["clinic-rv", "clinic-rp"],
    initials: "JM",
  },
  {
    id: "user-alex",
    name: "Alex R.",
    email: "alex@tudorglen.ca",
    role: "staff",
    clinics: ["clinic-tg"],
    initials: "AR",
  },
  {
    id: "user-carmen",
    name: "Carmen D.",
    email: "carmen@rosslynvet.ca",
    role: "staff",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    initials: "CD",
  },
];
const vetCategories = [
  "Pharmacy",
  "Clinical",
  "Front Desk",
  "Operations",
  "HR & Conduct",
  "Facilities",
  "Client Services",
  "Lab & Diagnostics",
  "Inventory",
  "Safety",
];
const vetPolicies: PolicyItem[] = [
  {
    id: "pol-1",
    title: "Controlled Substance Handling Protocol",
    type: "policy",
    category: "Pharmacy",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-04-03",
    reviewDate: "2026-10-03",
    version: 2,
    body: `## Purpose
This policy governs the handling, storage, dispensing, and documentation of all controlled substances across Rosslyn Veterinary Group clinics, in compliance with Health Canada and Alberta provincial regulations.

## Scope
Applies to all veterinarians, registered veterinary technologists, and any staff member who accesses the controlled substance safe or log.

## Storage Requirements
- All Schedule I–IV drugs must be stored in a double-locked cabinet or safe.
- The safe must be bolted to a permanent structure in a restricted-access area.
- Only designated key-holders may access the safe. Current key-holders are listed in each clinic's key-holder register.

## Dispensing Procedure
1. Two authorized individuals must be present for any controlled substance withdrawal.
2. Record the following in the controlled substance log immediately upon withdrawal:
   - Date and time
   - Drug name, concentration, and quantity
   - Patient name and file number
   - Attending veterinarian
   - Both witnesses' initials
3. Any discrepancy between expected and actual inventory must be reported to the Practice Manager within 1 hour.

## Inventory Reconciliation
- Weekly physical count every Monday by the lead RVT.
- Monthly full reconciliation signed off by the attending veterinarian and Practice Manager.
- Discrepancies exceeding 5% trigger a mandatory incident review.

## Waste & Disposal
- Partial vials must be witnessed-wasted and logged.
- Expired controlled substances must be returned through the approved reverse-distribution program. Do not dispose of in general waste under any circumstances.

## Violations
Non-compliance is treated as a serious disciplinary matter. Intentional diversion will be reported to the appropriate regulatory body.`,
    createdBy: "user-scott",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-03",
  },
  {
    id: "pol-2",
    title: "Emergency Triage Procedure",
    type: "policy",
    category: "Clinical",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-03-25",
    reviewDate: "2026-09-25",
    version: 1,
    body: `## Purpose
Defines the triage process for emergency cases presenting at any Rosslyn Veterinary Group clinic, ensuring rapid assessment and appropriate escalation.

## Triage Categories
**Red — Immediate (seen within 5 minutes)**
- Unresponsive / collapse
- Active seizure
- Respiratory distress / open-mouth breathing
- Uncontrolled hemorrhage
- Known toxin ingestion within 2 hours
- GDV presentation (non-productive retching, distended abdomen)

**Orange — Urgent (seen within 15 minutes)**
- Fractures with visible deformity or open wounds
- Moderate dyspnea
- Acute onset paralysis
- Penetrating wounds
- Persistent vomiting with lethargy

**Yellow — Semi-urgent (seen within 30 minutes)**
- Stable lacerations requiring suturing
- Eye injuries without perforation
- Moderate dehydration

**Green — Non-urgent (standard queue)**
- Minor wounds, mild lameness, stable chronic conditions

## Front Desk Protocol
1. Any client who mentions collapse, breathing difficulty, seizure, bleeding, or toxin ingestion should be directed immediately to the treatment area — do not take payment or complete intake forms first.
2. Notify the on-duty veterinarian via intercom code "Triage Red" or "Triage Orange."
3. Begin triage assessment documentation once the patient is stabilized.

## Escalation
If no veterinarian is on-site (Tudor Glen after-hours), contact the on-call doctor immediately and begin basic stabilization per the posted emergency protocol card.`,
    createdBy: "user-scott",
    createdAt: "2026-03-25",
    updatedAt: "2026-03-25",
  },
  {
    id: "pol-3",
    title: "Surgical Suite Cleaning Standards",
    type: "policy",
    category: "Clinical",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-03-20",
    reviewDate: "2026-09-20",
    version: 1,
    body: `## Purpose
Maintain surgical suite sterility standards that meet or exceed AAHA accreditation requirements and protect patient safety.

## Between-Case Cleaning
1. Remove all used drapes, instruments, and waste.
2. Wipe down the surgery table, IV poles, and anesthesia equipment with clinic-approved disinfectant (Accel or Rescue).
3. Allow a minimum 10-minute contact time before the next case.
4. Mop the floor around the table area.
5. Restock supplies and confirm instrument pack readiness.

## End-of-Day Deep Clean
1. Full floor mopping with enzymatic cleaner.
2. Wipe all horizontal surfaces, shelving, and light handles.
3. Empty sharps container if more than ¾ full.
4. Run instrument washer cycle and repackage autoclave loads.
5. Log completion on the daily surgery cleaning checklist (posted in each suite).

## Weekly
- Ceiling vent covers wiped.
- Equipment calibration check (anesthesia machine, monitoring).
- Surgery log review by lead RVT.

## Responsibility
The surgical RVT on duty is accountable for between-case and end-of-day cleaning. The clinic manager audits the cleaning log weekly.`,
    createdBy: "user-scott",
    createdAt: "2026-03-20",
    updatedAt: "2026-03-20",
  },
  {
    id: "pol-4",
    title: "Client Communication Standards",
    type: "sog",
    category: "Front Desk",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-04-01",
    reviewDate: "2026-10-01",
    version: 1,
    body: `## Purpose
Guide consistent, professional, and empathetic communication with clients across all Rosslyn Veterinary Group clinics.

## Phone Calls
- Answer within 3 rings.
- Greet with: "Thank you for calling [Clinic Name], this is [Your Name]. How can I help you?"
- If placing a caller on hold, ask permission first and check back within 60 seconds.
- For after-hours calls that reach voicemail, ensure the recorded message directs emergency cases to the Guardian Veterinary Centre emergency line.

## In-Person Interactions
- Greet every client within 30 seconds of entering the clinic.
- Use the client's name and the pet's name whenever possible.
- If wait time exceeds 10 minutes, provide an update and offer water or a magazine.

## Estimates & Financial Conversations
- Always provide a written estimate before any procedure over $300.
- Walk through the estimate line by line.
- Never use the phrase "it's just" when discussing costs — acknowledge that veterinary care is an investment.

## Difficult Conversations
- If a client becomes upset, listen without interrupting, then summarize their concern.
- Use "I understand" rather than "I'm sorry" when the issue is not a clinic error.
- Escalate to the clinic manager if the conversation is not resolving.

## Follow-Up
- Post-surgical discharge calls within 24 hours.
- Lab result callbacks within the same business day whenever possible.
- Overdue recall reminders per the recall schedule in the practice management system.`,
    createdBy: "user-emma",
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "pol-5",
    title: "Appointment Scheduling Guidelines",
    type: "sog",
    category: "Front Desk",
    clinics: ["clinic-tg"],
    status: "published",
    effectiveDate: "2026-03-15",
    reviewDate: "2026-09-15",
    version: 1,
    body: `## Purpose
Ensure efficient scheduling at Tudor Glen Veterinary Hospital that balances patient access, veterinarian workload, and client satisfaction.

## Standard Appointment Slots
- Wellness exams: 20 minutes
- Sick patient exams: 30 minutes
- Recheck / suture removal: 15 minutes
- New client exam: 30 minutes
- Dental assessment: 20 minutes

## Surgery Booking
- Schedule surgeries for morning blocks (8:00–12:00).
- Maximum 4 surgical cases per day unless approved by the lead vet.
- Pre-surgical blood work must be booked or confirmed before the surgery date.

## Same-Day / Urgent Add-Ons
- Reserve 2 slots per veterinarian per day for same-day urgent appointments.
- If urgent slots are full, offer the next available or triage to emergency.

## Double-Booking
- Do not double-book without explicit veterinarian approval.
- Exception: technician-only appointments (nail trims, weight checks) may overlap with exam slots.

## Reminders
- Automated reminders go out 48 hours and 2 hours before appointments.
- If a client no-shows twice in 6 months, flag the account for manager review.`,
    createdBy: "user-tyler",
    createdAt: "2026-03-15",
    updatedAt: "2026-03-15",
  },
  {
    id: "pol-6",
    title: "Lab Result Follow-Up Process",
    type: "sog",
    category: "Lab & Diagnostics",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-03-10",
    reviewDate: "2026-09-10",
    version: 1,
    body: `## Purpose
Ensure timely, accurate communication of lab results to clients and appropriate follow-up action for abnormal findings.

## Standard Turnaround
- In-house bloodwork: results reviewed by veterinarian same day.
- External lab (IDEXX / Antech): results reviewed within 1 business day of receipt.
- Histopathology: reviewed within 2 business days of receipt.

## Communication Flow
1. Veterinarian reviews results and adds chart notes with interpretation.
2. If results are **normal**: reception calls client with the good news or sends a portal message. Use the standard "Normal Results" template.
3. If results are **abnormal**: veterinarian calls the client directly or schedules a phone consult. Do not leave abnormal results on voicemail — ask the client to call back.
4. If the client is unreachable after 2 attempts, send a letter and flag the chart for follow-up.

## Critical Values
The following always require same-day veterinarian-to-client contact:
- PCV < 20% or > 60%
- BUN > 80 or creatinine > 5.0
- Glucose < 60 or > 400
- Potassium > 6.5 or < 3.0
- Positive cytology for malignancy

## Documentation
All client communications regarding lab results must be logged in the patient chart with date, time, method (phone/portal/letter), and outcome.`,
    createdBy: "user-scott",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10",
  },
  {
    id: "pol-7",
    title: "Spring Hours Update — Effective April 14",
    type: "info",
    category: "Operations",
    clinics: ["clinic-tg"],
    status: "published",
    effectiveDate: "2026-03-28",
    expiryDate: "2026-05-01",
    version: 1,
    body: `## Spring Hours Change

Effective **Monday, April 14, 2026**, Tudor Glen Veterinary Hospital will shift to spring/summer hours:

| Day | Current Hours | New Hours |
|-----|--------------|-----------|
| Monday–Friday | 8:00 AM – 6:00 PM | 7:30 AM – 7:00 PM |
| Saturday | 9:00 AM – 3:00 PM | 8:00 AM – 4:00 PM |
| Sunday | Closed | Closed |

## What This Means for Staff
- Morning shift starts at 7:15 AM (15 min before opening).
- Evening shift ends at 7:15 PM (15 min after closing for cleanup).
- Updated shift schedules will be posted in the break room and on the scheduling app by April 10.

## Client Communication
- Website hours will be updated by April 11.
- Voicemail greeting will be re-recorded April 13.
- Social media post scheduled for April 12.

Contact Tyler K. with scheduling questions.`,
    createdBy: "user-tyler",
    createdAt: "2026-03-28",
    updatedAt: "2026-03-28",
  },
  {
    id: "pol-8",
    title: "Staff Parking Lot Closure — April 5–7",
    type: "info",
    category: "Facilities",
    clinics: ["clinic-rv"],
    status: "published",
    effectiveDate: "2026-03-26",
    expiryDate: "2026-04-08",
    version: 1,
    body: `## Parking Lot Closure Notice

The Rosslyn Veterinary Clinic staff parking lot (west side) will be closed **Saturday, April 5 through Monday, April 7** for resurfacing.

## Alternate Parking
- Use the municipal lot on 104 Street (2-minute walk). The clinic will reimburse parking fees — keep your receipts.
- Client parking (front lot) remains open and is not affected.

## Timeline
- Friday, April 4: lot must be cleared by 6:00 PM.
- Saturday–Sunday: resurfacing and line painting.
- Monday, April 7: lot reopens by noon (weather permitting).

## Questions
Contact the front desk or Emma L.`,
    createdBy: "user-emma",
    createdAt: "2026-03-26",
    updatedAt: "2026-03-26",
  },
  {
    id: "pol-9",
    title: "Inventory Ordering & Receiving Process",
    type: "sog",
    category: "Inventory",
    clinics: ["clinic-rv", "clinic-tg"],
    status: "published",
    effectiveDate: "2026-02-15",
    reviewDate: "2026-08-15",
    version: 1,
    body: `## Purpose
Standardize inventory ordering and receiving to reduce stock-outs, control costs, and maintain accurate records.

## Ordering Schedule
- **Rosslyn Vet Clinic:** Orders placed Tuesday and Friday by 10:00 AM.
- **Tudor Glen:** Orders placed Monday, Wednesday, and Friday by 10:00 AM.
- Emergency orders may be placed anytime with manager approval.

## Par Levels
- Each item has a posted par level on the shelf label.
- When stock reaches the reorder point (marked in yellow on the label), add the item to the order sheet.
- The lead RVT or designated inventory person reviews the sheet before submission.

## Receiving
1. Check the packing slip against the order.
2. Inspect for damage, temperature excursions (cold-chain items), and short-dated product.
3. Sign and date the packing slip.
4. Enter received quantities into the inventory system same day.
5. Rotate stock: new product goes behind existing product.

## Discrepancies
- Short shipments: note on the packing slip and notify the supplier within 24 hours.
- Damaged goods: photograph, set aside, and file a claim within 48 hours.

## Controlled Substances
Controlled substance orders follow the separate Controlled Substance Handling Protocol (pol-1). They must be received by an authorized key-holder.`,
    createdBy: "user-scott",
    createdAt: "2026-02-15",
    updatedAt: "2026-02-15",
  },
  {
    id: "pol-10",
    title: "Workplace Conduct & Professionalism Standards",
    type: "policy",
    category: "HR & Conduct",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-01-15",
    reviewDate: "2027-01-15",
    version: 1,
    body: `## Purpose
Establish clear expectations for professional conduct across all Rosslyn Veterinary Group clinics.

## Core Expectations
- Treat colleagues, clients, and patients with respect and professionalism at all times.
- Maintain a positive, team-oriented attitude in all interactions.
- Communicate concerns through appropriate channels — speak to your manager or the Practice Manager directly rather than airing grievances in common areas.

## Attendance & Punctuality
- Be ready to work (not just on-site) at your scheduled start time.
- Notify your manager as early as possible if you will be late or absent — minimum 2 hours before shift start for illness.
- Chronic lateness (3+ instances in 30 days) will trigger a performance conversation.

## Personal Device Use
- Personal phone use is limited to break times and the break room.
- Exception: using your phone for work-related communication (e.g., checking the schedule app) is acceptable at the discretion of the on-duty manager.

## Dress Code
- Clean scrubs or clinic-issued uniform.
- Closed-toe, non-slip shoes.
- Minimal jewelry that does not pose a safety risk.
- Name badge visible at all times.

## Confidentiality
- Client information, patient records, and internal business matters are confidential.
- Do not discuss cases, clients, or coworkers on personal social media.
- Violations of confidentiality may result in immediate termination.`,
    createdBy: "user-scott",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15",
  },
  {
    id: "pol-11",
    title: "New Client Onboarding Checklist",
    type: "sog",
    category: "Client Services",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "published",
    effectiveDate: "2026-03-01",
    reviewDate: "2026-09-01",
    version: 1,
    body: `## Purpose
Ensure every new client receives a consistent, welcoming experience and that their records are set up correctly from the first visit.

## Before the Appointment
1. Send the new-client registration form via email or portal link at least 24 hours before the visit.
2. Confirm the form is completed and imported into the practice management system before arrival.
3. If records are transferring from another clinic, request them at least 3 business days ahead.

## At Arrival
1. Greet the client by name: "Welcome to [Clinic Name], you must be [Client Name]!"
2. Confirm contact information, emergency contact, and pet details.
3. Provide a welcome packet (clinic brochure, after-hours emergency info, payment policy summary).
4. Give a brief tour if time allows: "The exam rooms are right through here, and here's where you'll check out."

## During the Visit
- The veterinarian introduces themselves and asks about the pet's history, lifestyle, and any concerns.
- Offer a complimentary wellness screen for new patients (per clinic discretion).

## After the Visit
1. Schedule follow-up or next wellness visit before the client leaves.
2. Send a "Welcome to [Clinic Name]" email within 24 hours with portal login instructions.
3. Add the client to the recall/reminder system.
4. Note any special circumstances in the chart (e.g., anxious pet, financial concerns, preferred vet).`,
    createdBy: "user-emma",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-01",
  },
  {
    id: "pol-12",
    title: "Workplace Safety — Bite & Scratch Protocol",
    type: "policy",
    category: "Safety",
    clinics: ["clinic-rv", "clinic-tg", "clinic-rp"],
    status: "draft",
    effectiveDate: "2026-04-15",
    reviewDate: "2026-10-15",
    version: 1,
    body: `## Purpose
Establish response procedure for animal bite and scratch injuries to staff, ensuring proper medical attention, documentation, and incident review.

## Immediate Response
1. Stop work and attend to the injury immediately.
2. Wash the wound thoroughly with soap and running water for at least 5 minutes.
3. Apply first aid (antiseptic, bandaging as needed).
4. Notify the on-duty manager.

## Medical Attention
- All bites that break the skin require medical assessment — either walk-in clinic or emergency, depending on severity.
- The clinic covers the cost of medical treatment via WCB.

## Documentation
1. Complete an Incident Report form (found in the staff break room binder and on the shared drive).
2. Photograph the injury if appropriate and the employee consents.
3. Manager submits the WCB report within 24 hours.
4. Add a behavioral note to the patient's chart (e.g., "caution: history of biting during nail trims").

## Review
- The manager reviews the incident within 48 hours to identify preventable factors.
- If restraint technique, equipment, or handling approach contributed, update the handling protocol for that patient.

## Status: DRAFT — pending final review before publishing org-wide.`,
    createdBy: "user-scott",
    createdAt: "2026-04-05",
    updatedAt: "2026-04-05",
  },
];
const vetAcknowledgments: Acknowledgment[] = [
  // Pending for Jess (staff)
  { id: "ack-1", policyId: "pol-1", userId: "user-jess", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "ack-2", policyId: "pol-2", userId: "user-jess", acknowledgedAt: null, dueDate: "2026-04-12" },
  // Completed for Jess
  { id: "ack-3", policyId: "pol-4", userId: "user-jess", acknowledgedAt: "2026-03-30", dueDate: "2026-04-05" },
  { id: "ack-4", policyId: "pol-5", userId: "user-jess", acknowledgedAt: "2026-03-18", dueDate: "2026-03-25" },
  { id: "ack-5", policyId: "pol-3", userId: "user-jess", acknowledgedAt: "2026-03-15", dueDate: "2026-03-22" },
  // Pending for Alex (staff)
  { id: "ack-6", policyId: "pol-1", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "ack-7", policyId: "pol-2", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-12" },
  { id: "ack-8", policyId: "pol-4", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-08" },
  // Completed for Alex
  { id: "ack-9", policyId: "pol-3", userId: "user-alex", acknowledgedAt: "2026-03-22", dueDate: "2026-03-28" },
  // Pending for Carmen (staff)
  { id: "ack-10", policyId: "pol-1", userId: "user-carmen", acknowledgedAt: null, dueDate: "2026-04-10" },
  // Completed for Carmen
  { id: "ack-11", policyId: "pol-2", userId: "user-carmen", acknowledgedAt: "2026-03-28", dueDate: "2026-04-05" },
  { id: "ack-12", policyId: "pol-4", userId: "user-carmen", acknowledgedAt: "2026-04-02", dueDate: "2026-04-05" },
  { id: "ack-13", policyId: "pol-3", userId: "user-carmen", acknowledgedAt: "2026-03-21", dueDate: "2026-03-28" },
  { id: "ack-14", policyId: "pol-10", userId: "user-carmen", acknowledgedAt: "2026-02-01", dueDate: "2026-02-15" },
];


export const verticalPresets: Record<VerticalPresetId, VerticalPreset> = {
  veterinary: {
    id: "veterinary",
    label: "Veterinary Clinic",
    shortLabel: "Vet",
    industry: "Veterinary",
    organization: { id: "org-1", name: "Rosslyn Veterinary Group" },
    clinics: vetClinics,
    users: vetUsers,
    categories: vetCategories,
    policies: vetPolicies,
    acknowledgments: vetAcknowledgments,
    landingLabel: "Veterinary clinic preset",
    landingDescription: "Shows patient care, controlled drugs, and facility workflows with seeded clinic-specific content.",
    moduleHighlights: ["Pharmacy", "Clinical", "Front Desk", "Safety"],
    locationLabel: "Clinic",
    locationLabelPlural: "Clinics",
    roleLabels: {
      owner: "Owner",
      admin: "Admin",
      practice_manager: "Practice Manager",
      manager: "Manager",
      staff: "Staff",
      read_only: "Read Only",
    },
  },
  accounting: {
    locationLabel: "Office",
    locationLabelPlural: "Offices",
    roleLabels: {
      owner: "Managing Partner",
      admin: "Admin",
      practice_manager: "Operations Manager",
      manager: "Manager",
      staff: "Senior Accountant / Staff",
      read_only: "Read Only",
    },
    id: "accounting",
    label: "Accounting Firm",
    shortLabel: "Accounting",
    industry: "Accounting",
    organization: { id: "org-accounting", name: "Business Inc. — Accounting Firm Demo" },
    clinics: accountingClinics,
    users: accountingUsers,
    categories: accountingCategories,
    policies: accountingPolicies,
    acknowledgments: accountingAcknowledgments,
    landingLabel: "Accounting firm preset",
    landingDescription: "Shows tax, payroll, close, compliance, and client document workflows with seeded office-specific content.",
    moduleHighlights: ["Tax & Compliance", "Payroll Controls", "Month-End Close", "Secure Client Portal"],
  },
  law: {
    locationLabel: "Branch",
    locationLabelPlural: "Branches",
    roleLabels: {
      owner: "Managing Partner",
      admin: "Admin",
      practice_manager: "Practice Manager",
      manager: "Partner",
      staff: "Associate / Clerk",
      read_only: "Read Only",
    },
    id: "law",
    label: "Law Firm",
    shortLabel: "Law",
    industry: "Legal",
    organization: { id: "org-law", name: "Business Inc. — Law Firm Demo" },
    clinics: lawClinics,
    users: lawUsers,
    categories: lawCategories,
    policies: lawPolicies,
    acknowledgments: lawAcknowledgments,
    landingLabel: "Law firm preset",
    landingDescription: "Shows conflicts, trust, confidentiality, court deadlines, and file-closing workflows with partner/staff personas.",
    moduleHighlights: ["Conflict Checks", "Trust Handling", "Court Diary", "File Closing"],
  },
};

export const DEFAULT_VERTICAL_PRESET: VerticalPresetId = "accounting";
export const allPolicies = Object.values(verticalPresets).flatMap((preset) => preset.policies);

export function getVerticalPreset(id: VerticalPresetId | string | undefined): VerticalPreset {
  if (id && id in verticalPresets) return verticalPresets[id as VerticalPresetId];
  return verticalPresets[DEFAULT_VERTICAL_PRESET];
}

export function clinicDisplayFromPreset(ids: string[], clinics: Clinic[]): string {
  if (ids.length === clinics.length) return "All offices";
  return ids.map((id) => clinics.find((clinic) => clinic.id === id)?.name ?? id).join(", ");
}
