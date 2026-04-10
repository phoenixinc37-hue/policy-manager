import { clinics } from "./mock-data";
import type { CommunicationType } from "@/types";

export interface PolicyGenerationInput {
  overview: string;
  riskOrProblem: string;
  keySteps: string;
  audienceNotes: string;
  type: CommunicationType;
  selectedClinicIds: string[];
}

export interface GeneratedPolicyDraft {
  title: string;
  category: string;
  body: string;
  summary: string[];
}

const categoryRules: Array<{ category: string; keywords: string[] }> = [
  { category: "Safety", keywords: ["safety", "injury", "bite", "scratch", "needle", "incident", "hazard"] },
  { category: "Pharmacy", keywords: ["drug", "medication", "controlled", "pharmacy", "prescription"] },
  { category: "Clinical", keywords: ["patient", "triage", "surgery", "anesthesia", "clinical", "care"] },
  { category: "Front Desk", keywords: ["phone", "reception", "front desk", "check-in", "client communication"] },
  { category: "Operations", keywords: ["workflow", "opening", "closing", "hours", "process", "rollout"] },
  { category: "HR & Conduct", keywords: ["conduct", "attendance", "behavior", "professionalism", "hr"] },
  { category: "Inventory", keywords: ["inventory", "stock", "ordering", "receiving"] },
  { category: "Facilities", keywords: ["building", "parking", "facility", "cleaning", "maintenance"] },
  { category: "Lab & Diagnostics", keywords: ["lab", "diagnostic", "result", "sample"] },
  { category: "Client Services", keywords: ["onboarding", "welcome", "service", "experience"] },
];

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferTitle(overview: string, type: CommunicationType) {
  const cleaned = overview
    .replace(/[\n\r]+/g, " ")
    .replace(/[^a-zA-Z0-9\s&/-]/g, "")
    .trim();

  const short = cleaned.split(/\s+/).slice(0, 8).join(" ");
  const base = short ? toTitleCase(short) : "New Policy Draft";

  if (type === "policy") return base.includes("Policy") ? base : `${base} Policy`;
  if (type === "sog") return base.includes("Procedure") || base.includes("Workflow") ? base : `${base} Workflow`;
  return base.includes("Update") ? base : `${base} Update`;
}

function inferCategory(source: string) {
  const normalized = source.toLowerCase();
  for (const rule of categoryRules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.category;
    }
  }
  return "Operations";
}

function normalizeBulletLines(text: string, fallbackLines: string[]) {
  const parts = text
    .split(/\n|,|;/)
    .map((part) => part.trim())
    .filter(Boolean);

  const lines = (parts.length ? parts : fallbackLines).slice(0, 6);
  return lines.map((line, index) => `${index + 1}. ${line}`);
}

function selectedClinicLabel(selectedClinicIds: string[]) {
  if (selectedClinicIds.length === 0 || selectedClinicIds.length === clinics.length) {
    return "All Rosslyn Veterinary Group clinics";
  }

  return selectedClinicIds
    .map((id) => clinics.find((clinic) => clinic.id === id)?.name ?? id)
    .join(", ");
}

export function generateStructuredPolicyDraft(input: PolicyGenerationInput): GeneratedPolicyDraft {
  const combined = [input.overview, input.riskOrProblem, input.keySteps, input.audienceNotes].join(" ");
  const title = inferTitle(input.overview, input.type);
  const category = inferCategory(combined);
  const clinicLabel = selectedClinicLabel(input.selectedClinicIds);

  const procedureLines = normalizeBulletLines(input.keySteps, [
    "Confirm the situation and identify who is responsible",
    "Complete the required action in the agreed order",
    "Escalate exceptions or delays to the manager on duty",
    "Document completion in the appropriate system or log",
  ]);

  const audienceLines = (input.audienceNotes || clinicLabel)
    .split(/\n|,|;/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5);

  const body = input.type === "info"
    ? `## Summary\n${input.overview.trim() || "Summarize the operational update or communication need."}\n\n## Why this matters now\n${input.riskOrProblem.trim() || "Clarify the issue, timing, or business reason behind this communication."}\n\n## Who needs to know\n- Applies to: ${clinicLabel}\n${audienceLines.map((line) => `- ${line}`).join("\n") || "- Add role-based audience notes if needed"}\n\n## What is changing\n${procedureLines.join("\n")}\n\n## Manager communication plan\n- Post the update in the clinic communication channel and daily huddle notes\n- Confirm that supervisors can answer frontline questions\n- Set an expiry or review date if this notice is temporary\n\n## Acknowledgment expectation\n- Require acknowledgment if this communication changes behavior, hours, safety, or client-facing workflow\n- Managers should monitor non-responders within 3 business days\n\n## Questions / exceptions\n- Direct questions to the clinic manager or practice manager\n- Capture edge cases discovered during rollout and convert them into a future SOG or policy if needed`
    : `## Purpose\n${input.overview.trim() || "State the operational or compliance outcome this document is meant to create."}\n\n## Why this standard exists\n${input.riskOrProblem.trim() || "Describe the risk, inconsistency, or business problem this document is solving."}\n\n## Scope\n- Applies to: ${clinicLabel}\n- Document type: ${input.type === "policy" ? "Administrative policy" : "Standard operating guideline"}\n${audienceLines.map((line) => `- ${line}`).join("\n") || "- Add the specific roles, teams, or shifts covered by this standard"}\n\n## Standard\n${input.type === "policy" ? "This expectation is mandatory and should be followed consistently unless an approved exception is documented." : "Staff should follow this workflow in the order below unless patient safety or manager direction requires escalation."}\n\n## Step-by-step workflow\n${procedureLines.join("\n")}\n\n## Ownership\n- Clinic manager owns communication and rollout readiness\n- Designated leads coach staff and answer operational questions\n- Staff confirm understanding through acknowledgment when assigned\n\n## Exceptions and escalation\n- Any exception must be documented with the reason and approving manager\n- Safety, compliance, or client-impact concerns should be escalated the same day\n\n## Rollout and acknowledgment\n- Publish only after title, audience, and workflow are manager-ready\n- Assign acknowledgments to affected team members at publish time\n- Review acknowledgment completion and follow up on overdue staff\n\n## Review cadence\n- Revisit the document after initial rollout feedback\n- Update sooner if regulations, staffing model, or workflow changes`; 

  return {
    title,
    category,
    body,
    summary: [
      `Suggested category: ${category}`,
      `Audience: ${clinicLabel}`,
      input.riskOrProblem.trim() ? "Draft includes a clear why-now section for manager review" : "Add a sharper why-now statement before final publish",
      "Generated structure is standardized for publish + acknowledgment workflow",
    ],
  };
}
