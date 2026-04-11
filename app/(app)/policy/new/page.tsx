"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FilePlus2, MessageSquare, Sparkles, Upload, Wand2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { clinics, categories } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { generateStructuredPolicyDraft } from "@/lib/policy-generator";
import type { CommunicationType, PolicyStatus, ImportSourceMeta } from "@/types";

const starterTemplates: Record<CommunicationType, string> = {
  policy: `## Purpose\nExplain the non-negotiable standard.\n\n## Scope\nList who this applies to.\n\n## Policy\n1. Clear rule one\n2. Clear rule two\n\n## Compliance\n- Who owns follow-up\n- What happens if missed`,
  sog: `## Purpose\nDescribe the operational outcome.\n\n## Workflow\n1. First step\n2. Second step\n3. Escalation if needed\n\n## Notes\n- Exceptions\n- Documentation requirements`,
  info: `## Update\nSummarize the communication.\n\n## What staff need to know\n- Key point\n- Timeline\n- Contact person`,
};

type AuthorMode = "guided" | "blank" | "import";

function inferTypeFromFileName(fileName: string): CommunicationType {
  const lower = fileName.toLowerCase();
  if (lower.includes("sog") || lower.includes("guideline") || lower.includes("workflow") || lower.includes("sop")) return "sog";
  if (lower.includes("memo") || lower.includes("notice") || lower.includes("update") || lower.includes("hours")) return "info";
  return "policy";
}

function inferTitleFromText(fileName: string, text: string) {
  const firstHeading = text
    .split(/\n+/)
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .find((line) => line.length > 4);

  if (firstHeading) return firstHeading.slice(0, 110);

  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeImportedText(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const assistantPrompts = [
  "Create a controlled-drug discrepancy policy for all clinics with same-day escalation.",
  "Draft a same-day callback workflow for reception and assistants.",
  "Write a short info update about revised Saturday staffing expectations.",
];

export default function CreatePolicyPage() {
  const router = useRouter();
  const { savePolicy, workspaceMode, setWorkspaceMode } = useApp();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [mode, setMode] = useState<AuthorMode>("guided");
  const [importMessage, setImportMessage] = useState<string>("No file uploaded yet.");
  const [importState, setImportState] = useState<ImportSourceMeta>({ mode: "authored" });
  const [generatedSummary, setGeneratedSummary] = useState<string[]>([]);
  const [generatorInput, setGeneratorInput] = useState({
    overview: "",
    riskOrProblem: "",
    keySteps: "",
    audienceNotes: "",
  });
  const [form, setForm] = useState({
    title: "",
    type: "policy" as CommunicationType,
    category: categories[0],
    clinicIds: clinics.map((clinic) => clinic.id),
    status: "draft" as PolicyStatus,
    effectiveDate: "2026-04-10",
    reviewDate: "2026-10-10",
    expiryDate: "",
    body: starterTemplates.policy,
    sourceLabel: "",
    importNotes: "",
  });

  const clinicSummary = useMemo(() => {
    if (form.clinicIds.length === clinics.length) return "All clinics selected";
    if (form.clinicIds.length === 0) return "No clinics selected · publish will default to all clinics";
    return `${form.clinicIds.length} clinic(s) targeted`;
  }, [form.clinicIds]);

  const applyPrompt = (prompt: string) => {
    setMode("guided");
    setGeneratorInput((prev) => ({ ...prev, overview: prompt }));
  };

  const toggleClinic = (id: string) => {
    setForm((prev) => ({
      ...prev,
      clinicIds: prev.clinicIds.includes(id) ? prev.clinicIds.filter((clinicId) => clinicId !== id) : [...prev.clinicIds, id],
    }));
  };

  const applyGeneratedDraft = () => {
    const generated = generateStructuredPolicyDraft({
      ...generatorInput,
      type: form.type,
      selectedClinicIds: form.clinicIds,
    });

    setForm((prev) => ({
      ...prev,
      title: generated.title,
      category: generated.category,
      body: generated.body,
    }));
    setGeneratedSummary(generated.summary);
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileType = file.type || "unknown";
    const lower = fileName.toLowerCase();
    const textFriendly = /\.(txt|md|markdown|csv|html?)$/.test(lower) || fileType.startsWith("text/");

    setMode("import");
    setForm((prev) => ({
      ...prev,
      sourceLabel: prev.sourceLabel || "Legacy clinic document",
      type: inferTypeFromFileName(fileName),
    }));

    if (textFriendly) {
      const rawText = await file.text();
      const text = sanitizeImportedText(rawText);
      const inferredType = inferTypeFromFileName(fileName);
      const inferredTitle = inferTitleFromText(fileName, text);
      const excerpt = text.slice(0, 500);

      setForm((prev) => ({
        ...prev,
        title: prev.title || inferredTitle,
        type: inferredType,
        body:
          text ||
          `## Imported source\n${fileName}\n\n## Notes\nThe file uploaded successfully, but no readable text was extracted.`,
      }));
      setImportState({
        mode: "imported",
        fileName,
        fileType,
        parseStatus: "parsed",
        importedAt: "2026-04-10",
        sourceLabel: form.sourceLabel || "Legacy clinic document",
        originalExcerpt: excerpt,
      });
      setImportMessage(`Parsed readable text from ${fileName}. Title/body were prefilled for manager review.`);
      return;
    }

    const inferredType = inferTypeFromFileName(fileName);
    const inferredTitle = inferTitleFromText(fileName, fileName);
    setForm((prev) => ({
      ...prev,
      title: prev.title || inferredTitle,
      type: inferredType,
      body: `## Imported source\n${fileName}\n\n## Intake status\nThis file was uploaded into Policy Manager and staged for beta review.\n\n## Next step\n1. Open the original file offline\n2. Paste or summarize the approved content here\n3. Assign clinics and publish when ready\n\n## Notes\nBinary formats such as PDF or Word are captured in this beta as staged imports with metadata, not full text extraction.`,
    }));
    setImportState({
      mode: "imported",
      fileName,
      fileType,
      parseStatus: "staged",
      importedAt: "2026-04-10",
      sourceLabel: form.sourceLabel || "Legacy clinic document",
      originalExcerpt: `${fileName} uploaded for staged import`,
    });
    setImportMessage(`Uploaded ${fileName}. File is staged with metadata capture; full text extraction is not yet available for this format.`);
  };

  const handleSave = (status: PolicyStatus) => {
    const source: ImportSourceMeta =
      mode === "import"
        ? {
            ...importState,
            mode: "imported",
            sourceLabel: form.sourceLabel || importState.sourceLabel || "Legacy clinic document",
            notes: form.importNotes || importState.notes,
            importedAt: importState.importedAt || "2026-04-10",
          }
        : { mode: "authored" };

    const id = savePolicy({
      ...form,
      status,
      source,
    });
    setSavedId(id);
    window.setTimeout(() => router.push(`/policy/${id}`), 900);
  };

  if (savedId) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="card py-16 text-center">
          <h2>Saved successfully</h2>
          <p className="mt-2 text-sm text-slate-500">Your document is ready and you&apos;re being redirected to the detail view.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/library" className="hover:text-slate-600">Library</Link>
        <span>/</span>
        <span className="text-slate-600">New policy</span>
      </div>

      <PageHeader
        eyebrow="Authoring"
        title="Create policy with the assistant first"
        description="The page now opens like an AI drafting workspace instead of a form dump. Start in the chat-style brief, generate a draft, then fine-tune the document before saving."
      />

      <div className="mb-5 rounded-3xl border border-cyan-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 text-white shadow-[0_18px_60px_-32px_rgba(15,23,42,0.8)]">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Assistant-led create flow</p>
            <h2 className="mt-3 text-white">Tell the assistant what changed operationally. Let the draft appear first.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              This is the owner-visible story: managers begin with context, risk, workflow, and audience. The structured policy body is generated after the conversation-style brief — not before.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => setMode("guided")} className="btn-primary gap-2 bg-white text-slate-950 hover:bg-slate-100">
                <MessageSquare className="h-4 w-4" />
                Start with assistant
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("blank");
                  if (workspaceMode !== "blank") setWorkspaceMode("blank");
                }}
                className="btn-secondary gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <FilePlus2 className="h-4 w-4" />
                Switch to blank mode now
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Visible modes</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${workspaceMode === "blank" ? "bg-emerald-400/15 text-emerald-200" : "bg-cyan-400/15 text-cyan-200"}`}>
                {workspaceMode === "blank" ? "Blank workspace live" : "Demo workspace live"}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
                <p className="font-medium text-white">1. Assistant draft</p>
                <p className="mt-1 text-slate-300">Default opening state. Feels like a manager briefing an AI, not filling a blank compliance form.</p>
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                <p className="font-medium text-white">2. Blank mode</p>
                <p className="mt-1 text-slate-300">One click here or in the left sidebar. The library and dashboard immediately show a clean-start clinic with no seeded data.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">3. Import</p>
                <p className="mt-1 text-slate-300">Stage old clinic files for cleanup, review, and publish.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        {[
          { id: "guided", title: "AI assistant", text: "Open in chat-style guided drafting. This is the default owner-facing path.", icon: Sparkles },
          { id: "blank", title: "Blank authoring", text: "Write manually from scratch with a clean template and blank workspace support.", icon: Wand2 },
          { id: "import", title: "Import existing file", text: "Bring in a legacy clinic document and stage it for cleanup or publish.", icon: Upload },
        ].map(({ id, title, text, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id as AuthorMode)}
            className={`rounded-3xl border p-4 text-left transition ${mode === id ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-2xl p-2 ${mode === id ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-500"}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="font-medium text-slate-900">{title}</p>
            </div>
            <p className="mt-2 text-sm text-slate-500">{text}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <section className="space-y-5">
          {mode === "guided" ? (
            <div className="card space-y-4 border-cyan-100 bg-cyan-50/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">AI assistant conversation</p>
                  <h3 className="mt-2">Start with a manager brief, then generate the first draft</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The owner-visible change is here: the assistant leads. Fill in the short conversation below, then generate a structured policy body.
                  </p>
                </div>
                <button type="button" onClick={applyGeneratedDraft} className="btn-primary gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate draft
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Policy Assistant</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Tell me what changed operationally, why it matters, who it applies to, and the workflow staff should follow. I&apos;ll turn that into a rollout-ready draft.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {assistantPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => applyPrompt(prompt)}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-xs text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="ml-auto max-w-4xl rounded-3xl border border-cyan-200 bg-white p-4 shadow-sm">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Manager: what is this policy about?</label>
                    <textarea
                      value={generatorInput.overview}
                      onChange={(event) => setGeneratorInput((prev) => ({ ...prev, overview: event.target.value }))}
                      className="textarea min-h-[120px] font-sans"
                      placeholder="e.g., We need a single controlled-drug discrepancy escalation standard across Rosslyn, Tudor Glen, and River Valley."
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Assistant: why now / what risk are we solving?</label>
                    <textarea
                      value={generatorInput.riskOrProblem}
                      onChange={(event) => setGeneratorInput((prev) => ({ ...prev, riskOrProblem: event.target.value }))}
                      className="textarea min-h-[120px] font-sans"
                      placeholder="e.g., Logging is inconsistent, handoffs vary by clinic, and discrepancies are not always escalated same day."
                    />
                  </div>

                  <div className="ml-auto max-w-4xl rounded-3xl border border-cyan-200 bg-white p-4 shadow-sm">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Manager: key steps or workflow</label>
                    <textarea
                      value={generatorInput.keySteps}
                      onChange={(event) => setGeneratorInput((prev) => ({ ...prev, keySteps: event.target.value }))}
                      className="textarea min-h-[120px] font-sans"
                      placeholder="List 3-6 steps, separated by lines, commas, or semicolons."
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Assistant: audience / clinic notes</label>
                    <textarea
                      value={generatorInput.audienceNotes}
                      onChange={(event) => setGeneratorInput((prev) => ({ ...prev, audienceNotes: event.target.value }))}
                      className="textarea min-h-[120px] font-sans"
                      placeholder="e.g., Applies to DVMs, RVTs, assistants, and managers with controlled-drug access."
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-white p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900">What happens when you click generate</p>
                <ul className="mt-2 space-y-1">
                  <li>• Suggests a title and category</li>
                  <li>• Builds a structured body with purpose, scope, workflow, escalation, and rollout sections</li>
                  <li>• Uses selected clinic targeting so the draft reads rollout-ready, not generic</li>
                </ul>
              </div>
            </div>
          ) : null}

          {mode === "blank" ? (
            <div className="card space-y-4 border-emerald-200 bg-emerald-50/60">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="section-label text-emerald-700">Blank authoring</p>
                  <h3 className="mt-2">Blank mode is right here and easy to verify</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    This is the clean manual path. If you want the whole product to look blank for owner review, switch the workspace to Blank mode from here or from the left sidebar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWorkspaceMode("blank")}
                  className="btn-primary gap-2 bg-emerald-600 hover:bg-emerald-500"
                >
                  <Wand2 className="h-4 w-4" />
                  Make workspace blank
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">What Scott should see</p>
                  <p className="mt-2 leading-6">
                    Dashboard shows a <span className="font-semibold">Blank workspace is ready</span> card, Library shows an empty state, and this page remains available for manual authoring.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">Current workspace state</p>
                  <p className="mt-2 leading-6">
                    {workspaceMode === "blank"
                      ? "Blank workspace is active now. Seeded demo content has been cleared."
                      : "Demo workspace is active now. Click the green button above to flip the live app into blank mode."}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {mode === "import" ? (
            <div className="card space-y-4 border-cyan-100 bg-cyan-50/50">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Upload source file</label>
                <input type="file" accept=".txt,.md,.markdown,.html,.htm,.pdf,.doc,.docx" onChange={handleImportFile} className="input file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white" />
                <p className="mt-2 text-xs text-slate-500">Readable text formats are parsed into the editor. PDF/Word files are captured as staged imports with metadata so the clinic team still has an intake path during beta.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Source / clinic reference</label>
                  <input value={form.sourceLabel} onChange={(event) => setForm({ ...form, sourceLabel: event.target.value })} className="input" placeholder="e.g., Ross legacy binder · Pharmacy" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Intake notes</label>
                  <input value={form.importNotes} onChange={(event) => setForm({ ...form, importNotes: event.target.value })} className="input" placeholder="e.g., Needs legal wording review before publish" />
                </div>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-white p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900">Import status</p>
                <p className="mt-1">{importMessage}</p>
              </div>
            </div>
          ) : null}

          <div className="card space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="input" placeholder="e.g., Controlled Drug Count Escalation Workflow" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
                <select
                  value={form.type}
                  onChange={(event) => {
                    const nextType = event.target.value as CommunicationType;
                    setForm((prev) => ({
                      ...prev,
                      type: nextType,
                      body: mode === "blank" ? starterTemplates[nextType] : prev.body,
                    }));
                  }}
                  className="input"
                >
                  <option value="policy">Administrative policy</option>
                  <option value="sog">Standard operating guideline</option>
                  <option value="info">Communication info</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="input">
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">Clinic targeting</label>
              <button type="button" onClick={() => setForm({ ...form, clinicIds: clinics.map((clinic) => clinic.id) })} className="text-sm font-medium text-cyan-700">Select all</button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {clinics.map((clinic) => {
                const active = form.clinicIds.includes(clinic.id);
                return (
                  <button key={clinic.id} type="button" onClick={() => toggleClinic(clinic.id)} className={`rounded-3xl border p-4 text-left transition ${active ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                    <p className="font-medium text-slate-900">{clinic.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{active ? "Included in rollout" : "Not selected"}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Effective date</label>
              <input type="date" value={form.effectiveDate} onChange={(event) => setForm({ ...form, effectiveDate: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Review date</label>
              <input type="date" value={form.reviewDate} onChange={(event) => setForm({ ...form, reviewDate: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Expiry date</label>
              <input type="date" value={form.expiryDate} onChange={(event) => setForm({ ...form, expiryDate: event.target.value })} className="input" />
            </div>
          </div>

          <div className="card">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="block text-sm font-medium text-slate-700">Document body</label>
              {mode === "guided" ? <span className="text-xs font-medium text-cyan-700">Generate first, then edit here</span> : null}
            </div>
            <textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} className="textarea min-h-[420px]" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-10">
            <Link href="/library" className="btn-secondary">Cancel</Link>
            <div className="flex gap-3">
              <button onClick={() => handleSave("draft")} className="btn-secondary" disabled={!form.title.trim() || !form.body.trim()}>
                Save draft
              </button>
              <button onClick={() => handleSave("published")} className="btn-primary" disabled={!form.title.trim() || !form.body.trim()}>
                Publish document
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface-dark p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Preview checklist</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Audience</p>
                <p className="mt-1 text-slate-300">{clinicSummary}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Authoring path</p>
                <p className="mt-1 text-slate-300 capitalize">{mode === "guided" ? "AI assistant-first draft" : mode === "blank" ? "Blank authoring" : "Imported document"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Workspace context</p>
                <p className="mt-1 text-slate-300">{workspaceMode === "blank" ? "Blank workspace active — this clinic is seeing a clean start." : "Demo workspace active — seeded content remains visible."}</p>
              </div>
            </div>
          </div>

          <div className="card-muted border-2 border-emerald-200 bg-emerald-50/80">
            <p className="section-label text-emerald-700">Blank mode visibility</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Want the clean-start product story? Click <span className="font-semibold">Make workspace blank</span> on this page or use the left sidebar toggle. Then verify the change on <span className="font-semibold">Dashboard</span> and <span className="font-semibold">Library</span>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setWorkspaceMode("blank")} className="btn-primary bg-emerald-600 hover:bg-emerald-500">
                Turn on blank mode
              </button>
              <Link href="/dashboard" className="btn-secondary gap-2">
                Check dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {generatedSummary.length > 0 ? (
            <div className="card-muted">
              <p className="section-label">Generated draft summary</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {generatedSummary.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          ) : null}

          <div className="card-muted">
            <p className="section-label">Recommended owner click path</p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <p>1. Open <span className="font-semibold text-slate-900">Create policy</span> and land on the assistant-first brief.</p>
              <p>2. Paste a sample prompt, click <span className="font-semibold text-slate-900">Generate draft</span>, and show the body populate.</p>
              <p>3. Click <span className="font-semibold text-slate-900">Turn on blank mode</span> to make the clean-start path obvious.</p>
              <p>4. Open <span className="font-semibold text-slate-900">Dashboard</span> or <span className="font-semibold text-slate-900">Library</span> to verify the workspace is now blank.</p>
            </div>
          </div>

          {mode === "import" ? (
            <div className="card-muted">
              <p className="section-label">Beta import guidance</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Best beta flow: upload the old clinic file, capture where it came from, clean the text, then publish with proper clinic targeting. That tells a believable migration story even before full PDF/Word parsing exists.
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
