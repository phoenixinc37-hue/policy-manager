import type {
  Organization,
  Clinic,
  User,
  PolicyItem,
  Acknowledgment,
} from "@/types";

// ── Organization ────────────────────────────────────────────────
export const org: Organization = {
  id: "org-1",
  name: "Vet Inc. — CSI Pilot",
};

// ── Clinics ─────────────────────────────────────────────────────
export const clinics: Clinic[] = [
  { id: "clinic-rv", name: "ROSS — Rosslyn Veterinary Clinic", orgId: "org-1" },
  { id: "clinic-tg", name: "TG — Tudor Glen Veterinary Hospital", orgId: "org-1" },
  { id: "clinic-riv", name: "RV — River Valley Veterinary Hospital", orgId: "org-1" },
];

export const ALL_CLINICS = "All Clinics";

function clinicLabel(ids: string[]): string {
  if (ids.length === clinics.length) return ALL_CLINICS;
  return ids
    .map((id) => clinics.find((c) => c.id === id)?.name ?? id)
    .join(", ");
}

// ── Users ───────────────────────────────────────────────────────
export const users: User[] = [
  {
    id: "user-scott",
    name: "Scott Wilde",
    email: "scott@vet.inc",
    role: "practice_manager",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    initials: "SW",
  },
  {
    id: "user-emma",
    name: "Emma Larson",
    email: "emma@rosslynvet.ca",
    role: "manager",
    clinics: ["clinic-rv"],
    initials: "EL",
  },
  {
    id: "user-tyler",
    name: "Tyler Kinsella",
    email: "tyler@tudorglenvet.ca",
    role: "manager",
    clinics: ["clinic-tg"],
    initials: "TK",
  },
  {
    id: "user-sarah",
    name: "Sarah Villeneuve",
    email: "sarah@riversidevet.ca",
    role: "manager",
    clinics: ["clinic-riv"],
    initials: "SV",
  },
  {
    id: "user-jess",
    name: "Jess McLeod, RVT",
    email: "jess@rosslynvet.ca",
    role: "staff",
    clinics: ["clinic-rv"],
    initials: "JM",
  },
  {
    id: "user-alex",
    name: "Alex Renaud, CSR",
    email: "alex@tudorglenvet.ca",
    role: "staff",
    clinics: ["clinic-tg"],
    initials: "AR",
  },
  {
    id: "user-carmen",
    name: "Carmen Dsouza, RVT",
    email: "carmen@riversidevet.ca",
    role: "staff",
    clinics: ["clinic-riv"],
    initials: "CD",
  },
  {
    id: "user-noah",
    name: "Noah Chen, VA",
    email: "noah@rosslynvet.ca",
    role: "staff",
    clinics: ["clinic-rv"],
    initials: "NC",
  },
];

// ── Categories ──────────────────────────────────────────────────
export const categories = [
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

// ── Policies ────────────────────────────────────────────────────
export const policies: PolicyItem[] = [
  {
    id: "pol-1",
    title: "Controlled Drug Storage, Logging & Weekly Count",
    type: "policy",
    category: "Pharmacy",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-04-03",
    reviewDate: "2026-10-03",
    version: 3,
    body: `## Purpose
Set a single standard for storage, access, dispensing, waste, and discrepancy handling for controlled drugs across CSI pilot clinics.

## Scope
Applies to veterinarians, RVTs, managers, and any team member with authorized access to the controlled drug safe, treatment cart, or logbook.

## Storage Standard
- All controlled drugs must be stored in a double-locked safe that is secured to a permanent structure.
- Safe access is limited to the approved key-holder list posted in each manager office.
- Keys or keypad codes may not be shared between team members, even during shift change.

## Withdrawal & Dispensing
1. Two authorized team members must be present for any withdrawal from the safe.
2. Record the withdrawal immediately in the controlled drug log.
3. Every log entry must include:
   - Date and time
   - Drug, strength, and amount removed
   - Patient name and chart number
   - Treating veterinarian
   - Remaining balance
   - Initials of both witnesses
4. Any partially used vial must be witnessed, wasted, and logged before the end of the shift.

## Count & Reconciliation
- Closing shift completes a running visual balance check for high-use items.
- Lead RVT completes a formal weekly count every Monday before 11:00 AM.
- Practice manager and attending veterinarian sign the month-end reconciliation.
- Any unexplained discrepancy requires same-day escalation to the practice manager and owner group.

## Escalation Threshold
- Missing volume, incomplete log entries, or mismatched balances are treated as a priority incident.
- Do not wait for the next weekly count if a discrepancy is noticed during patient care.

## Compliance
Failure to follow this policy may result in disciplinary action and mandatory reporting where required by law or professional regulation.`,
    createdBy: "user-scott",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-08",
  },
  {
    id: "pol-2",
    title: "Walk-In Triage & Emergency Intake Standard",
    type: "policy",
    category: "Clinical",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-25",
    reviewDate: "2026-09-25",
    version: 2,
    body: `## Purpose
Create a consistent first-five-minute response for urgent and emergency presentations so front desk, assistants, RVTs, and doctors act the same way at every clinic.

## Red — Immediate Transfer To Treatment
Patients with any of the following bypass standard check-in and move straight to treatment:
- Respiratory distress or open-mouth breathing
- Collapse or unresponsive state
- Active seizure
- Hit by car / major trauma
- Ongoing hemorrhage
- Suspected GDV
- Known toxin ingestion within 2 hours

## Orange — Seen Within 15 Minutes
- Fracture with deformity
- Severe vomiting/diarrhea with lethargy
- Penetrating wound
- Acute paralysis
- Ocular injury with pain or swelling

## Front Desk Script
1. Stand up, acknowledge the client, and direct the patient to treatment immediately.
2. Use the clinic call-out: "Triage Red to treatment" or "Triage Orange to treatment."
3. Delay payment, deposit discussion, and non-essential paperwork until the patient is stabilized.

## RVT / Assistant Responsibilities
- Obtain weight, temperature if safe, and brief presenting complaint.
- Start oxygen, catheter prep, or crash setup based on doctor instruction.
- Document the arrival time and first assessment time in the chart.

## Access Targets
- Red cases: clinician hands on patient within 5 minutes.
- Orange cases: clinician assessment within 15 minutes.
- Manager reviews any red-case miss at end of day huddle.`,
    createdBy: "user-scott",
    createdAt: "2026-03-25",
    updatedAt: "2026-04-02",
  },
  {
    id: "pol-3",
    title: "Surgery Turnover & End-of-Day Cleaning Standard",
    type: "policy",
    category: "Clinical",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-20",
    reviewDate: "2026-09-20",
    version: 2,
    body: `## Purpose
Protect patient safety and surgical efficiency by standardizing between-case cleaning, equipment reset, and closing-room responsibilities.

## Between-Case Turnover
1. Remove drapes, sharps, waste, and used instrument packs immediately after transfer.
2. Wipe the surgery table, monitoring surfaces, IV poles, and touched equipment using approved disinfectant.
3. Maintain manufacturer contact time before resetting the room.
4. Replace suction tubing, table tie-downs, and any single-use consumables as required.
5. Confirm the next pack, ET tubes, and monitoring leads are ready before the next patient enters.

## End-of-Day Close
- Mop the full surgical area.
- Disinfect light handles, shelves, machine surfaces, and door-touch points.
- Run and unload the final instrument washer load.
- Repackage packs for next day where applicable.
- Sign the closing checklist posted in surgery.

## Weekly Audit
Lead RVT checks cleaning log completion, anesthesia machine readiness, and sharps/sharps-container status every Friday.`,
    createdBy: "user-scott",
    createdAt: "2026-03-20",
    updatedAt: "2026-03-29",
  },
  {
    id: "pol-4",
    title: "Client Experience & Call Handling Standard",
    type: "sog",
    category: "Front Desk",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-04-01",
    reviewDate: "2026-10-01",
    version: 2,
    body: `## Purpose
Set a repeatable service standard for phones, reception flow, wait-time updates, and cost conversations so the client experience feels consistent across the group.

## Phones
- Answer within 3 rings whenever staffing allows.
- Use: "Thank you for calling [Clinic Name], this is [Your Name]. How can I help you today?"
- If placing a caller on hold, ask first and return within 60 seconds.

## Lobby Experience
- Greet every client within 30 seconds of entry, even if already helping someone else.
- If the wait exceeds 10 minutes, give an update with a realistic next step.
- If the pet is stressed or reactive, move the client to an exam room or quieter space when possible.

## Financial Conversations
- Written estimate required before procedures over $300.
- Use clear, non-minimizing language.
- If a client hesitates, offer to review priorities and doctor recommendations rather than repeating the total.

## Follow-Through
- Surgery discharge calls by next-day noon.
- Abnormal lab callbacks same business day whenever results are reviewed before 4:00 PM.
- Escalate unresolved service issues to the clinic manager before end of shift.`,
    createdBy: "user-emma",
    createdAt: "2026-04-01",
    updatedAt: "2026-04-07",
  },
  {
    id: "pol-5",
    title: "Doctor Schedule Template & Same-Day Access Rules",
    type: "sog",
    category: "Front Desk",
    clinics: ["clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-15",
    reviewDate: "2026-09-15",
    version: 2,
    body: `## Purpose
Balance doctor utilization, technician support, and same-day access without creating chronic delays.

## Standard Slots
- Wellness exams: 20 minutes
- Medical progress exams: 20 minutes
- New client or complex sick exams: 30 minutes
- Technician appointments: 10 to 15 minutes
- End-of-day catch-up buffer: minimum 1 slot per doctor

## Same-Day Capacity
- Reserve 2 urgent access slots per doctor per day.
- Fill urgent slots before adding overbooked appointments.
- Double-booking requires doctor approval and a note in the schedule.

## Surgery Protection
- Do not book elective drop-offs after 10:00 AM unless approved by the surgery doctor.
- Pre-op bloodwork confirmation must be complete before the surgery day.

## KPI To Watch
Target doctor delay under 20 minutes for the midday block. If a doctor is routinely over 30 minutes behind, the clinic manager should adjust template or support staffing within the week.`,
    createdBy: "user-tyler",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-04",
  },
  {
    id: "pol-6",
    title: "Lab Results, Critical Values & Client Follow-Up",
    type: "sog",
    category: "Lab & Diagnostics",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-10",
    reviewDate: "2026-09-10",
    version: 2,
    body: `## Purpose
Ensure lab results are reviewed, communicated, and documented quickly enough that the clinic is never guessing who owns follow-up.

## Turnaround Standard
- In-house bloodwork: same-day doctor review.
- Reference lab panels: reviewed within 1 business day of receipt.
- Histopathology: reviewed within 2 business days.

## Critical Values Requiring Same-Day Doctor Contact
- PCV less than 20%
- Potassium over 6.5 or under 3.0
- Glucose under 60 or over 400
- Positive cytology suspicious for malignancy
- Any result the attending doctor identifies as unstable or time-sensitive

## Workflow
1. Doctor reviews and interprets result.
2. Team member assigned to callback documents date, time, method, and outcome.
3. Abnormal results are not left on voicemail.
4. If the client cannot be reached after 2 attempts, escalate to doctor and flag chart for follow-up action.`,
    createdBy: "user-scott",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-31",
  },
  {
    id: "pol-7",
    title: "Spring Hours Expansion — River Valley & Tudor Glen",
    type: "info",
    category: "Operations",
    clinics: ["clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-28",
    expiryDate: "2026-05-15",
    version: 1,
    body: `## Update
Effective **Monday, April 14, 2026**, River Valley Veterinary Hospital and Tudor Glen Veterinary Hospital will run expanded spring hours to improve same-day access.

| Clinic | Current Weekday Hours | New Weekday Hours |
|-----|--------------|-----------|
| Tudor Glen Veterinary Hospital | 8:00 AM – 6:00 PM | 7:30 AM – 7:00 PM |
| River Valley Veterinary Hospital | 8:00 AM – 5:30 PM | 7:30 AM – 6:30 PM |

## What Staff Need To Know
- Opening team arrives 15 minutes before doors open.
- Closing team remains 15 minutes after final checkout for room reset and controlled close.
- Website, voicemail, and Google Business profiles must match by April 11.

## Owner Intent
This change is part of the CSI pilot to test whether longer weekday access improves same-day capture without adding weekend fatigue.`,
    createdBy: "user-sarah",
    createdAt: "2026-03-28",
    updatedAt: "2026-03-28",
  },
  {
    id: "pol-8",
    title: "Rosslyn Parking Lot Closure & Team Parking Plan",
    type: "info",
    category: "Facilities",
    clinics: ["clinic-rv"],
    status: "published",
    effectiveDate: "2026-03-26",
    expiryDate: "2026-04-12",
    version: 1,
    body: `## Update
The Rosslyn staff parking lot on the west side will be closed **April 5–7** for resurfacing and line painting.

## Temporary Parking Plan
- Team members use the 104 Street municipal lot.
- Parking receipts are reimbursable through petty cash.
- Front client lot remains reserved for clients and scheduled drop-offs.

## Timing
- Clear the lot by Friday at 6:00 PM.
- Reopening expected Monday by noon, weather dependent.

## Contact
Questions go to Emma Larson or the front desk lead.`,
    createdBy: "user-emma",
    createdAt: "2026-03-26",
    updatedAt: "2026-03-26",
  },
  {
    id: "pol-9",
    title: "Inventory Ordering, Receiving & Cold-Chain Check",
    type: "sog",
    category: "Inventory",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-02-15",
    reviewDate: "2026-08-15",
    version: 2,
    body: `## Purpose
Reduce stock-outs, short-dated losses, and receiving errors by setting one receiving routine across the CSI pilot clinics.

## Ordering Cadence
- ROSS: Tuesday and Friday by 10:00 AM
- Tudor Glen: Monday, Wednesday, Friday by 10:00 AM
- RV: Tuesday and Thursday by 10:00 AM
- Emergency orders require manager approval

## Receiving Standard
1. Match shipment to PO or order sheet.
2. Check vaccine and temperature-sensitive items first.
3. Note shortages, damage, or short dating on the packing slip same day.
4. Enter received quantities into the system before end of shift.
5. Rotate stock so earliest expiry stays in front.

## Cold-Chain Rule
If a refrigerated shipment arrives warm, do not shelve it until the manager or lead RVT confirms supplier instructions.`,
    createdBy: "user-scott",
    createdAt: "2026-02-15",
    updatedAt: "2026-04-01",
  },
  {
    id: "pol-10",
    title: "Professional Conduct, Confidentiality & Device Use",
    type: "policy",
    category: "HR & Conduct",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-01-15",
    reviewDate: "2027-01-15",
    version: 1,
    body: `## Purpose
Clarify basic professionalism expectations that apply across all Vet Inc. clinics regardless of role or shift.

## Core Standard
- Treat clients, patients, and coworkers respectfully.
- Raise concerns through the manager channel rather than in front of clients or in common areas.
- Protect patient, client, and business confidentiality at all times.

## Attendance
- Be work-ready at your scheduled start time.
- Report illness or absence as early as possible and no later than 2 hours before shift start unless emergent.

## Devices
- Personal phone use stays to break times unless required for work.
- Photos of patients or charts on personal devices are prohibited unless approved for clinical use and charted appropriately.

## Social & Confidentiality
Do not post patient information, internal incidents, financial information, or coworker matters to personal social channels.`,
    createdBy: "user-scott",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15",
  },
  {
    id: "pol-11",
    title: "New Client Welcome & First-Visit Checklist",
    type: "sog",
    category: "Client Services",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "published",
    effectiveDate: "2026-03-01",
    reviewDate: "2026-09-01",
    version: 2,
    body: `## Purpose
Give new clients a consistent first impression and reduce avoidable errors in registration, records transfer, and follow-up booking.

## Before Arrival
1. Send registration link at least 24 hours before the appointment when possible.
2. Request prior records before the appointment if transferring care.
3. Confirm the welcome note, emergency contact, and consent fields are complete.

## At Check-In
1. Confirm pet name, species, sex, and emergency contact.
2. Note behavioural flags early (fearful, fractious, reactive in lobby).
3. Provide payment policy and after-hours emergency guidance.

## Before Check-Out
- Book next visit or recheck before the client leaves.
- Ensure portal or email details are correct.
- Add any important handling or communication notes to the chart.`,
    createdBy: "user-emma",
    createdAt: "2026-03-01",
    updatedAt: "2026-04-06",
  },
  {
    id: "pol-12",
    title: "Bite, Scratch & Staff Exposure Response",
    type: "policy",
    category: "Safety",
    clinics: ["clinic-rv", "clinic-tg", "clinic-riv"],
    status: "draft",
    effectiveDate: "2026-04-15",
    reviewDate: "2026-10-15",
    version: 1,
    body: `## Purpose
Create a fast and legally clean response whenever a team member receives a bite, scratch, needlestick, or other exposure during patient handling.

## Immediate Response
1. Stop the task safely.
2. Wash or flush the affected area immediately.
3. Notify the on-duty manager.
4. Seek medical assessment when skin is broken, exposure is significant, or manager/doctor advises escalation.

## Documentation
- Complete an incident report before the end of shift.
- Add a patient handling alert where appropriate.
- Manager submits required workplace documentation within 24 hours.

## Review
Every incident should be reviewed for restraint method, staffing level, and equipment factors within 48 hours.

## Status
DRAFT — prepared for CSI pilot review and Vet Inc. rollout discussion.`,
    createdBy: "user-scott",
    createdAt: "2026-04-05",
    updatedAt: "2026-04-08",
  },
  {
    id: "pol-13",
    title: "Legacy Controlled Drugs Sign-Out Binder — ROSS Import Draft",
    type: "sog",
    category: "Pharmacy",
    clinics: ["clinic-rv"],
    status: "draft",
    effectiveDate: "2026-04-10",
    reviewDate: "2026-07-10",
    version: 1,
    body: `## Imported source
ROSS-controlled-drugs-binder.docx

## Intake status
This legacy clinic document has been staged into Policy Manager for beta review.

## What still needs cleanup
1. Confirm the final approved wording from the existing Rosslyn binder.
2. Split role-specific tasks between DVM, RVT, and manager where needed.
3. Publish only after formatting, dates, and clinic targeting are confirmed.

## Manager notes
Existing binder appears current enough to migrate, but the wording still reads like a paper SOP and needs cleanup before staff acknowledgment.`,
    createdBy: "user-emma",
    createdAt: "2026-04-10",
    updatedAt: "2026-04-10",
    source: {
      mode: "imported",
      fileName: "ROSS-controlled-drugs-binder.docx",
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      parseStatus: "staged",
      sourceLabel: "ROSS legacy binder · Pharmacy",
      importedAt: "2026-04-10",
      notes: "Needs wording cleanup before publish.",
      originalExcerpt: "ROSS-controlled-drugs-binder.docx uploaded for staged import",
    },
  },
];

// ── Acknowledgments ─────────────────────────────────────────────
export const acknowledgments: Acknowledgment[] = [
  { id: "ack-1", policyId: "pol-1", userId: "user-jess", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "ack-2", policyId: "pol-2", userId: "user-jess", acknowledgedAt: null, dueDate: "2026-04-12" },
  { id: "ack-3", policyId: "pol-4", userId: "user-jess", acknowledgedAt: "2026-04-05", dueDate: "2026-04-06" },
  { id: "ack-4", policyId: "pol-9", userId: "user-jess", acknowledgedAt: "2026-04-02", dueDate: "2026-04-04" },

  { id: "ack-5", policyId: "pol-1", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "ack-6", policyId: "pol-5", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-09" },
  { id: "ack-7", policyId: "pol-7", userId: "user-alex", acknowledgedAt: "2026-04-01", dueDate: "2026-04-03" },
  { id: "ack-8", policyId: "pol-4", userId: "user-alex", acknowledgedAt: null, dueDate: "2026-04-08" },

  { id: "ack-9", policyId: "pol-1", userId: "user-carmen", acknowledgedAt: null, dueDate: "2026-04-10" },
  { id: "ack-10", policyId: "pol-7", userId: "user-carmen", acknowledgedAt: "2026-04-02", dueDate: "2026-04-03" },
  { id: "ack-11", policyId: "pol-6", userId: "user-carmen", acknowledgedAt: "2026-03-31", dueDate: "2026-04-02" },
  { id: "ack-12", policyId: "pol-10", userId: "user-carmen", acknowledgedAt: "2026-02-02", dueDate: "2026-02-15" },

  { id: "ack-13", policyId: "pol-2", userId: "user-noah", acknowledgedAt: null, dueDate: "2026-04-11" },
  { id: "ack-14", policyId: "pol-8", userId: "user-noah", acknowledgedAt: "2026-04-04", dueDate: "2026-04-05" },
  { id: "ack-15", policyId: "pol-4", userId: "user-noah", acknowledgedAt: "2026-04-03", dueDate: "2026-04-05" },
];

// ── Helpers ─────────────────────────────────────────────────────
export function getPolicy(id: string): PolicyItem | undefined {
  return policies.find((p) => p.id === id);
}

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getClinic(id: string): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

export function clinicDisplay(ids: string[]): string {
  return clinicLabel(ids);
}

export function getUserAcknowledgments(userId: string) {
  return acknowledgments.filter((a) => a.userId === userId);
}

export function getPolicyAcknowledgments(policyId: string) {
  return acknowledgments.filter((a) => a.policyId === policyId);
}

export function getPublishedPolicies() {
  return policies.filter((p) => p.status === "published");
}
