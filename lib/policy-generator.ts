import type { CommunicationType } from "@/types";

export interface PolicyGenerationInput {
  locationLabel: string;
  locationLabelPlural: string;
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
  { category: "Operations", keywords: ["workflow", "process", "hours", "rollout", "handoff"] },
  { category: "Data Security", keywords: ["security", "privacy", "confidential", "portal", "redaction"] },
  { category: "Client Intake", keywords: ["intake", "onboarding", "client", "matter", "document"] },
  { category: "Payroll", keywords: ["payroll", "compensation", "salary"] },
  { category: "Court Deadlines", keywords: ["court", "deadline", "calendar", "diary"] },
  { category: "Tax & Compliance", keywords: ["tax", "cra", "notice", "filing", "compliance"] },
  { category: "Conflicts & Intake", keywords: ["conflict", "opposing", "matter opening"] },
  { category: "Client Trust", keywords: ["trust", "retainer", "deposit"] },
];

function toTitleCase(value: string) {
  return value.toLowerCase().split(/\s+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function inferTitle(overview: string, type: CommunicationType) {
  const cleaned = overview.replace(/[\n\r]+/g, " ").replace(/[^a-zA-Z0-9\s&/-]/g, "").trim();
  const short = cleaned.split(/\s+/).slice(0, 8).join(" ");
  const base = short ? toTitleCase(short) : "New Policy Draft";
  if (type === "policy") return base.includes("Policy") ? base : `${base} Policy`;
  if (type === "sog") return base.includes("Procedure") || base.includes("Workflow") ? base : `${base} Workflow`;
  return base.includes("Update") ? base : `${base} Update`;
}

function inferCategory(source: string) {
  const normalized = source.toLowerCase();
  for (const rule of categoryRules) if (rule.keywords.some((keyword) => normalized.includes(keyword))) return rule.category;
  return "Operations";
}

function normalizeBulletLines(text: string, fallbackLines: string[]) {
  const parts = text.split(/\n|,|;/).map((part) => part.trim()).filter(Boolean);
  const lines = (parts.length ? parts : fallbackLines).slice(0, 6);
  return lines.map((line, index) => `${index + 1}. ${line}`);
}

function selectedOfficeLabel(selectedClinicIds: string[], locationLabel: string, locationLabelPlural: string) {
  if (selectedClinicIds.length === 0) return `All ${locationLabelPlural.toLowerCase()}`;
  if (selectedClinicIds.length === 1) return `Selected ${locationLabel.toLowerCase()}`;
  return `${selectedClinicIds.length} selected ${locationLabelPlural.toLowerCase()}`;
}

export function generateStructuredPolicyDraft(input: PolicyGenerationInput): GeneratedPolicyDraft {
  const combined = [input.overview, input.riskOrProblem, input.keySteps, input.audienceNotes].join(" ");
  const title = inferTitle(input.overview, input.type);
  const category = inferCategory(combined);
  const officeLabel = selectedOfficeLabel(input.selectedClinicIds, input.locationLabel, input.locationLabelPlural);
  const procedureLines = normalizeBulletLines(input.keySteps, [
    "Confirm the issue and identify the owner",
    "Complete the required action in the agreed order",
    "Escalate exceptions or delays to the responsible manager",
    "Document completion in the appropriate system or file",
  ]);
  const audienceLines = (input.audienceNotes || officeLabel).split(/\n|,|;/).map((part) => part.trim()).filter(Boolean).slice(0, 5);

  const body = input.type === "info"
    ? `## Summary\n${input.overview.trim() || "Summarize the operational update or communication need."}\n\n## Why this matters now\n${input.riskOrProblem.trim() || "Clarify the issue, timing, or business reason behind this communication."}\n\n## Who needs to know\n- Applies to: ${officeLabel}\n${audienceLines.map((line) => `- ${line}`).join("\n") || "- Add role-based audience notes if needed"}\n\n## What is changing\n${procedureLines.join("\n")}\n\n## Manager communication plan\n- Post the update in the team communication channel\n- Confirm supervisors can answer frontline questions\n- Set an expiry or review date if this notice is temporary`
    : `## Purpose\n${input.overview.trim() || "State the operational or compliance outcome this document is meant to create."}\n\n## Why this standard exists\n${input.riskOrProblem.trim() || "Describe the risk, inconsistency, or business problem this document is solving."}\n\n## Scope\n- Applies to: ${officeLabel}\n- Document type: ${input.type === "policy" ? "Administrative policy" : "Standard operating guideline"}\n${audienceLines.map((line) => `- ${line}`).join("\n") || "- Add the specific roles or teams covered by this standard"}\n\n## Standard\n${input.type === "policy" ? "This expectation is mandatory and should be followed consistently unless an approved exception is documented." : "Staff should follow this workflow in the order below unless manager direction requires escalation."}\n\n## Step-by-step workflow\n${procedureLines.join("\n")}\n\n## Ownership\n- Managers own communication and rollout readiness\n- Team leads coach staff and answer operational questions\n- Staff confirm understanding through acknowledgment when assigned\n\n## Exceptions and escalation\n- Any exception must be documented with the reason and approving manager\n- Compliance, deadline, or client-impact concerns should be escalated the same day\n\n## Rollout and acknowledgment\n- Publish only after title, audience, and workflow are manager-ready\n- Assign acknowledgments to affected team members at publish time\n- Review acknowledgment completion and follow up on overdue staff`;

  return {
    title,
    category,
    body,
    summary: [
      `Suggested category: ${category}`,
      `Audience: ${officeLabel}`,
      input.riskOrProblem.trim() ? "Draft includes a clear why-now section for manager review" : "Add a sharper why-now statement before final publish",
      "Generated structure is standardized for publish + acknowledgment workflow",
    ],
  };
}
