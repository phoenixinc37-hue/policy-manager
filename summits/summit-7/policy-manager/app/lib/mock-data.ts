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
  name: "Rosslyn Veterinary Group",
};

// ── Clinics ─────────────────────────────────────────────────────
export const clinics: Clinic[] = [
  { id: "clinic-rv", name: "Rosslyn Veterinary Clinic", orgId: "org-1" },
  { id: "clinic-tg", name: "Tudor Glen Veterinary Hospital", orgId: "org-1" },
  { id: "clinic-rp", name: "Rosslyn Park Animal Hospital", orgId: "org-1" },
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

// ── Acknowledgments ─────────────────────────────────────────────
export const acknowledgments: Acknowledgment[] = [
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
