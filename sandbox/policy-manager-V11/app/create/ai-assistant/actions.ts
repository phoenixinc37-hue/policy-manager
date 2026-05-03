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

function cleanSentence(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function humanizeList(value: string, fallback: string) {
  const items = value
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) return fallback;
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function expandLine(line: string) {
  const cleaned = cleanSentence(line);
  if (!cleaned) return "";
  const lower = cleaned.toLowerCase();

  if (lower.includes("review") || lower.includes("approve")) {
    return `${cleaned} Record the review outcome and confirm the next owner before the document moves forward.`;
  }

  if (lower.includes("train") || lower.includes("communicat") || lower.includes("share")) {
    return `${cleaned} Make sure the final instructions are communicated clearly to the affected team members.`;
  }

  if (lower.includes("document") || lower.includes("record") || lower.includes("file")) {
    return `${cleaned} Keep the supporting notes and required records with the document history.`;
  }

  return `${cleaned} Complete the step fully before moving to the next part of the process.`;
}

function buildFallbackDraft(input: AiDraftInput, title: string) {
  const topic = titleCase(title.replace(/[-_]+/g, " ")) || `${input.documentType} Draft`;
  const audience = input.distributionList.trim() || input.circulateTo.trim() || "the assigned team";
  const purpose = input.purpose.trim()
    ? `${cleanSentence(input.purpose)} This draft turns that direction into a usable operating standard for ${audience}.`
    : `This ${input.documentType.toLowerCase()} sets a clear operating standard for ${audience} so the work around ${topic} is handled consistently.`;

  const scope = input.scope.trim()
    ? `${cleanSentence(input.scope)} It applies anywhere this work, decision, or communication step touches ${topic}.`
    : `This ${input.documentType.toLowerCase()} applies to ${audience} and to any leadership or support role involved in ${topic}.`;

  const policyBits = [input.policyStatement.trim(), input.purpose.trim(), input.scope.trim()].filter(Boolean);
  const policyStatement = policyBits.length
    ? `${cleanSentence(policyBits[0])} Team members are expected to follow the approved standard, complete the required steps, and raise exceptions early.`
    : `${topic} must be handled using the approved standard, with clear documentation, timely communication, and early escalation when something falls outside normal process.`;

  const rawSteps = normalizeLines(input.procedureSteps, []);
  const procedureSteps = rawSteps.length
    ? rawSteps.map(expandLine)
    : [
        `Confirm the purpose, owner, and required timeline for ${topic} before starting the work.`,
        `Complete the work using the approved process and document the key actions, decisions, and supporting details.`,
        `Escalate gaps, exceptions, or approval needs early so ${topic} does not stall or move forward incomplete.`,
      ];

  const exceptionsNotes = input.exceptionsNotes.trim()
    ? `${cleanSentence(input.exceptionsNotes)} Any exception should be documented with the reason, the decision-maker, and the follow-up required.`
    : `Exceptions should be documented clearly, reviewed by the appropriate leader, and tracked until they are resolved.`;

  const definitions = input.definitions.trim()
    ? cleanSentence(input.definitions)
    : `${topic} refers to the work, process, or document named in this draft. Leadership means the approving or supervising group responsible for final direction.`;

  const attachmentLines = normalizeLines(input.attachments, []);
  const attachments = attachmentLines.length
    ? attachmentLines.map((line) => cleanSentence(line))
    : [
        `${topic} source notes or intake details.`,
        `Supporting checklist or related reference material.`,
      ];

  return {
    purpose,
    scope,
    policyStatement,
    procedureSteps,
    exceptionsNotes,
    definitions,
    attachments,
  };
}

function parseMarkdownDraft(markdown: string) {
  const sections: Record<string, string> = {};
  const lines = markdown.split(/\r?\n/);
  let current = "";
  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      current = heading[1].trim().toLowerCase();
      sections[current] = "";
      continue;
    }
    if (current) sections[current] += line + "\n";
  }
  const clean = (key: string) => (sections[key] || "").trim();
  return {
    purpose: clean("purpose"),
    scope: clean("scope"),
    policyStatement: clean("policy statement"),
    procedureSteps: clean("procedure")
      .split(/\n+/)
      .map((l) => l.replace(/^[-*]\s*/, "").replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean),
    exceptionsNotes: clean("exceptions / notes") || clean("exceptions"),
    definitions: clean("definitions"),
    attachments: clean("attachments")
      .split(/\n+/)
      .map((l) => l.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean),
  };
}

function enrichGeneratedDraft(input: AiDraftInput, title: string, generated: any) {
  const fallback = buildFallbackDraft(input, title);

  const purpose = generated?.purpose?.trim();
  const scope = generated?.scope?.trim();
  const policyStatement = generated?.policyStatement?.trim();
  const exceptionsNotes = generated?.exceptionsNotes?.trim();
  const definitions = generated?.definitions?.trim();

  const procedureSteps = Array.isArray(generated?.procedureSteps)
    ? generated.procedureSteps.map((step: any) => String(step).trim()).filter(Boolean)
    : normalizeLines(String(generated?.procedureSteps || ""), []);

  const attachments = Array.isArray(generated?.attachments)
    ? generated.attachments.map((item: any) => String(item).trim()).filter(Boolean)
    : normalizeLines(String(generated?.attachments || ""), []);

  return {
    purpose: purpose && purpose.length > 50 ? purpose : fallback.purpose,
    scope: scope && scope.length > 40 ? scope : fallback.scope,
    policyStatement: policyStatement && policyStatement.length > 60 ? policyStatement : fallback.policyStatement,
    procedureSteps: procedureSteps.length >= 3 ? procedureSteps.map(expandLine) : fallback.procedureSteps,
    exceptionsNotes: exceptionsNotes && exceptionsNotes.length > 30 ? exceptionsNotes : fallback.exceptionsNotes,
    definitions: definitions && definitions.length > 20 ? definitions : fallback.definitions,
    attachments: attachments.length ? attachments.map((item: string) => cleanSentence(item)) : fallback.attachments,
  };
}

function extractJsonObject(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not contain valid JSON.");
  }

  return JSON.parse(text.slice(start, end + 1));
}

export async function generateAiDraft(input: AiDraftInput, aiProvider?: string, webhookUrl?: string) {
  const title = input.title.trim() || `${input.documentType} Draft`;
  const version = input.version.trim() || "1.0";
  const author = input.author.trim() || "Scott Wilde";
  const reviewTimeline = input.reviewTimeline.trim() || "30 days";
  const circulateTo = input.circulateTo.trim() || "All";
  const distributionList = input.distributionList.trim() || "Not specified";

  const userContext = {
    documentType: input.documentType,
    title,
    version,
    author,
    reviewTimeline,
    circulateTo,
    distributionList,
    purpose: input.purpose.trim(),
    scope: input.scope.trim(),
    policyStatement: input.policyStatement.trim(),
    procedureSteps: normalizeLines(input.procedureSteps, []),
    exceptionsNotes: input.exceptionsNotes.trim(),
    definitions: input.definitions.trim(),
    attachments: normalizeLines(input.attachments, []),
  };

  const prompt = `You are drafting a ${input.documentType} for Policy Manager.

Write in a clear operator/staff tone. Be specific, practical, and usable. Do not sound legalistic, fluffy, or generic. Use the user's input as the source of truth and expand it into a stronger working draft.

Do not simply restate the user's words.
Improve the material into a fuller first draft with clearer direction, stronger wording, and more complete procedure language.
Each section should read like a real workplace document, not rough notes.
Procedure steps should be action-oriented and detailed enough that a staff member could follow them.

Return ONLY valid JSON with this exact shape:
{
  "purpose": "string",
  "scope": "string",
  "policyStatement": "string",
  "procedureSteps": ["string", "string"],
  "exceptionsNotes": "string",
  "definitions": "string",
  "attachments": ["string", "string"]
}

If the user gives sparse input, still produce a useful first draft that stays tightly aligned to the requested topic and does not drift generic.

User input:
${JSON.stringify(userContext, null, 2)}`;

  let generated: any;

  try {
    if (aiProvider === "n8n Automation (Recommended)" && webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            context: userContext,
          }),
        });

        if (!response.ok) {
          throw new Error(`n8n webhook failed: ${response.status}`);
        }

        const data = await response.json();
        if (typeof data === "string") {
          generated = parseMarkdownDraft(data);
        } else if (data?.output?.[0]?.content?.[0]?.text) {
          generated = parseMarkdownDraft(data.output[0].content[0].text);
        } else if (data?.content?.[0]?.text) {
          generated = parseMarkdownDraft(data.content[0].text);
        } else {
          const text = JSON.stringify(data);
          try {
            generated = extractJsonObject(text);
          } catch {
            generated = parseMarkdownDraft(text);
          }
        }
      } catch (err) {
        console.error("n8n generation failed:", err);
        throw err;
      }
    } else {
      // Fallback to Gemini if no n8n webhook or Gemini is explicitly chosen
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini request failed: ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((part: any) => part?.text || "").join("\n")?.trim();

      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      generated = extractJsonObject(text);
    }
  } catch {
    generated = buildFallbackDraft(input, title);
  }

  const finalDraft = enrichGeneratedDraft(input, title, generated);

  return {
    title,
    documentType: input.documentType,
    version,
    author,
    reviewTimeline,
    circulateTo,
    distributionList,
    purpose: finalDraft.purpose,
    scope: finalDraft.scope,
    policyStatement: finalDraft.policyStatement,
    procedureSteps: finalDraft.procedureSteps,
    exceptionsNotes: finalDraft.exceptionsNotes,
    definitions: finalDraft.definitions,
    attachments: finalDraft.attachments,
  };
}
