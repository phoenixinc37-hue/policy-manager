"use server";

export type AiDraftInput = {
  documentType: string;
  title: string;
  version: string;
  author: string;
  reviewTimeline: string;
  circulateTo: string;
  distributionList: string;
  purpose: string;
  scope: string;
  policyStatement: string;
  procedureSteps: string;
  exceptionsNotes: string;
  definitions: string;
  attachments: string;
};

function normalizeLines(value: string, fallback: string[]) {
  const lines = value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length ? lines : fallback;
}

export async function generateAiDraft(input: AiDraftInput) {
  const title = input.title.trim() || `${input.documentType} Draft`;
  const purpose = input.purpose.trim() || `This ${input.documentType.toLowerCase()} sets a clear operating standard for staff so the work is handled consistently and with less confusion.`;
  const scope = input.scope.trim() || `This ${input.documentType.toLowerCase()} applies to the team members responsible for the work described in this draft.`;
  const policyStatement = input.policyStatement.trim() || `Team members are expected to follow the approved standard exactly, use the required documentation steps, and escalate exceptions early.`;
  const exceptionsNotes = input.exceptionsNotes.trim() || `Exceptions should be documented clearly and reviewed by leadership before the file moves forward.`;
  const definitions = input.definitions.trim() || `Key terms should be interpreted in their normal operating context unless a narrower definition is later approved.`;
  const procedureSteps = normalizeLines(input.procedureSteps, [
    "Start the work using the approved process and the required checklist.",
    "Complete the required documentation before moving to the next step.",
    "Escalate anything incomplete, unclear, or outside standard process.",
  ]);
  const attachments = normalizeLines(input.attachments, [
    "Supporting checklist",
    "Internal reference notes",
    "Attached source material",
  ]);

  const draftBody = {
    title,
    documentType: input.documentType,
    version: input.version || "1.0",
    author: input.author || "Scott Wilde",
    reviewTimeline: input.reviewTimeline,
    circulateTo: input.circulateTo,
    distributionList: input.distributionList || "Not specified",
    purpose,
    scope,
    policyStatement,
    procedureSteps,
    exceptionsNotes,
    definitions,
    attachments,
  };

  return draftBody;
}
