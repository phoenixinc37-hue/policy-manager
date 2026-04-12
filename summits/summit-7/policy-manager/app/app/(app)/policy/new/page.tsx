"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FilePlus2, MessageSquare, Sparkles, Upload, Wand2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
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

export default function CreatePolicyPage() {
  const router = useRouter();
  const { savePolicy, workspaceMode, setWorkspaceMode, clinics, categories, presetLabel, locationLabel, locationLabelPlural } = useApp();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [mode, setMode] = useState<AuthorMode>("guided");
  const [importMessage, setImportMessage] = useState<string>("No file uploaded yet.");
  const [importState, setImportState] = useState<ImportSourceMeta>({ mode: "authored" });
  const [generatedSummary, setGeneratedSummary] = useState<string[]>([]);
  const [generatorInput, setGeneratorInput] = useState({ overview: "", riskOrProblem: "", keySteps: "", audienceNotes: "" });
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

  const clinicSummary = useMemo(() => form.clinicIds.length === clinics.length ? `All ${locationLabelPlural.toLowerCase()} selected` : form.clinicIds.length === 0 ? `No ${locationLabelPlural.toLowerCase()} selected · publish will default to all ${locationLabelPlural.toLowerCase()}` : `${form.clinicIds.length} ${locationLabelPlural.toLowerCase()} targeted`, [form.clinicIds, clinics.length]);

  const assistantPrompts = presetLabel === "Law Firm"
    ? ["Create a conflict-check gate for all new matters.", "Draft a court deadline diary verification workflow.", "Write a confidentiality and redaction policy for external sharing."]
    : ["Create a payroll change approval policy with second review.", "Draft a CRA notice triage workflow.", "Write a secure client portal verification standard."];

  const toggleClinic = (id: string) => setForm((prev) => ({ ...prev, clinicIds: prev.clinicIds.includes(id) ? prev.clinicIds.filter((clinicId) => clinicId !== id) : [...prev.clinicIds, id] }));

  const applyGeneratedDraft = () => {
    const generated = generateStructuredPolicyDraft({ ...generatorInput, type: form.type, selectedClinicIds: form.clinicIds, locationLabel, locationLabelPlural });
    setForm((prev) => ({ ...prev, title: generated.title, category: generated.category, body: generated.body }));
    setGeneratedSummary(generated.summary);
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMode("import");
    const text = await file.text().catch(() => "");
    setForm((prev) => ({ ...prev, title: prev.title || file.name.replace(/\.[^.]+$/, ""), type: inferTypeFromFileName(file.name), body: text.trim() || `## Imported source\n${file.name}\n\n## Intake status\nUploaded for staged review.` }));
    setImportState({ mode: "imported", fileName: file.name, fileType: file.type || "unknown", parseStatus: text ? "parsed" : "staged", importedAt: "2026-04-10", sourceLabel: form.sourceLabel || `${presetLabel} legacy document` });
    setImportMessage(text ? `Parsed readable text from ${file.name}.` : `Uploaded ${file.name} for staged review.`);
  };

  const handleSave = (status: PolicyStatus) => {
    const source: ImportSourceMeta = mode === "import" ? { ...importState, mode: "imported", sourceLabel: form.sourceLabel || importState.sourceLabel || `${presetLabel} legacy document`, notes: form.importNotes || importState.notes, importedAt: importState.importedAt || "2026-04-10" } : { mode: "authored" };
    const id = savePolicy({ ...form, status, source });
    setSavedId(id);
    window.setTimeout(() => router.push(`/policy/${id}`), 900);
  };

  if (savedId) return <div className="mx-auto max-w-3xl"><div className="card py-16 text-center"><h2>Saved successfully</h2><p className="mt-2 text-sm text-slate-500">Your document is ready and you&apos;re being redirected to the detail view.</p></div></div>;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400"><Link href="/library" className="hover:text-slate-600">Library</Link><span>/</span><span className="text-slate-600">New policy</span></div>
      <PageHeader eyebrow={`${presetLabel} · Authoring`} title="Create policy with the assistant first" description="Start in the chat-style brief, generate a draft, then fine-tune the document before saving." />

      <div className="mb-5 rounded-3xl border border-cyan-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 text-white">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Assistant-led create flow</p><h2 className="mt-3 text-white">Tell the assistant what changed operationally. Let the draft appear first.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">This page stays owner-friendly across both presets. Start with context, risk, workflow, and audience — then generate the first structured draft.</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => setMode("guided")} className="btn-primary gap-2 bg-white text-slate-950 hover:bg-slate-100"><MessageSquare className="h-4 w-4" />Start with assistant</button><button type="button" onClick={() => { setMode("blank"); if (workspaceMode !== "blank") setWorkspaceMode("blank"); }} className="btn-secondary gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10"><FilePlus2 className="h-4 w-4" />Switch to blank mode now</button></div></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4"><div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400"><span>Visible modes</span><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${workspaceMode === "blank" ? "bg-emerald-400/15 text-emerald-200" : "bg-cyan-400/15 text-cyan-200"}`}>{workspaceMode === "blank" ? "Blank workspace live" : `${presetLabel} demo live`}</span></div><div className="space-y-3 text-sm"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4"><p className="font-medium text-white">1. Assistant draft</p><p className="mt-1 text-slate-300">Default opening state for either vertical.</p></div><div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4"><p className="font-medium text-white">2. Blank mode</p><p className="mt-1 text-slate-300">Use this to show the clean-start experience.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">3. Import</p><p className="mt-1 text-slate-300">Stage legacy files for cleanup, review, and publish.</p></div></div></div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">{[{ id: "guided", title: "AI assistant", text: "Open in chat-style guided drafting.", icon: Sparkles }, { id: "blank", title: "Blank authoring", text: "Write manually from scratch.", icon: Wand2 }, { id: "import", title: "Import existing file", text: "Bring in a legacy document.", icon: Upload }].map(({ id, title, text, icon: Icon }) => <button key={id} type="button" onClick={() => setMode(id as AuthorMode)} className={`rounded-3xl border p-4 text-left transition ${mode === id ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}><div className="flex items-center gap-3"><div className={`rounded-2xl p-2 ${mode === id ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-500"}`}><Icon className="h-4 w-4" /></div><p className="font-medium text-slate-900">{title}</p></div><p className="mt-2 text-sm text-slate-500">{text}</p></button>)}</div>

      <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <section className="space-y-5">
          {mode === "guided" ? <div className="card space-y-4 border-cyan-100 bg-cyan-50/40"><div className="flex items-start justify-between gap-4"><div><p className="section-label">AI assistant conversation</p><h3 className="mt-2">Start with a manager brief, then generate the first draft</h3></div><button type="button" onClick={applyGeneratedDraft} className="btn-primary gap-2"><Sparkles className="h-4 w-4" />Generate draft</button></div><div className="space-y-3"><textarea value={generatorInput.overview} onChange={(event) => setGeneratorInput((prev) => ({ ...prev, overview: event.target.value }))} className="textarea min-h-[110px]" placeholder="What is this policy about?" /><textarea value={generatorInput.riskOrProblem} onChange={(event) => setGeneratorInput((prev) => ({ ...prev, riskOrProblem: event.target.value }))} className="textarea min-h-[100px]" placeholder="Why now / what risk are we solving?" /><textarea value={generatorInput.keySteps} onChange={(event) => setGeneratorInput((prev) => ({ ...prev, keySteps: event.target.value }))} className="textarea min-h-[100px]" placeholder="Key steps or workflow" /><textarea value={generatorInput.audienceNotes} onChange={(event) => setGeneratorInput((prev) => ({ ...prev, audienceNotes: event.target.value }))} className="textarea min-h-[100px]" placeholder="Audience / role notes" /></div><div className="flex flex-wrap gap-2">{assistantPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => setGeneratorInput((prev) => ({ ...prev, overview: prompt }))} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-cyan-200 hover:bg-cyan-50">{prompt}</button>)}</div></div> : null}

          {mode === "blank" ? <div className="card space-y-4 border-emerald-200 bg-emerald-50/60"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="section-label text-emerald-700">Blank authoring</p><h3 className="mt-2">Blank mode is right here and easy to verify</h3></div><button type="button" onClick={() => setWorkspaceMode("blank")} className="btn-primary gap-2 bg-emerald-600 hover:bg-emerald-500"><Wand2 className="h-4 w-4" />Make workspace blank</button></div></div> : null}

          {mode === "import" ? <div className="card space-y-4 border-cyan-100 bg-cyan-50/50"><input type="file" accept=".txt,.md,.markdown,.html,.htm,.pdf,.doc,.docx" onChange={handleImportFile} className="input file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white" /><input value={form.sourceLabel} onChange={(event) => setForm({ ...form, sourceLabel: event.target.value })} className="input" placeholder={`e.g., ${presetLabel} legacy manual`} /><input value={form.importNotes} onChange={(event) => setForm({ ...form, importNotes: event.target.value })} className="input" placeholder="Intake notes" /><div className="rounded-2xl border border-cyan-100 bg-white p-4 text-sm text-slate-600">{importMessage}</div></div> : null}

          <div className="card space-y-4"><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="input" placeholder="Document title" /><div className="grid gap-4 md:grid-cols-2"><select value={form.type} onChange={(event) => { const nextType = event.target.value as CommunicationType; setForm((prev) => ({ ...prev, type: nextType, body: mode === "blank" ? starterTemplates[nextType] : prev.body })); }} className="input"><option value="policy">Administrative policy</option><option value="sog">Standard operating guideline</option><option value="info">Communication info</option></select><select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="input">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div></div>

          <div className="card"><div className="mb-3 flex items-center justify-between"><label className="block text-sm font-medium text-slate-700">{locationLabel} targeting</label><button type="button" onClick={() => setForm({ ...form, clinicIds: clinics.map((clinic) => clinic.id) })} className="text-sm font-medium text-cyan-700">Select all</button></div><div className="grid gap-3 md:grid-cols-3">{clinics.map((clinic) => { const active = form.clinicIds.includes(clinic.id); return <button key={clinic.id} type="button" onClick={() => toggleClinic(clinic.id)} className={`rounded-3xl border p-4 text-left transition ${active ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}><p className="font-medium text-slate-900">{clinic.name}</p><p className="mt-1 text-sm text-slate-500">{active ? "Included in rollout" : "Not selected"}</p></button>; })}</div></div>

          <div className="card grid gap-4 md:grid-cols-3"><input type="date" value={form.effectiveDate} onChange={(event) => setForm({ ...form, effectiveDate: event.target.value })} className="input" /><input type="date" value={form.reviewDate} onChange={(event) => setForm({ ...form, reviewDate: event.target.value })} className="input" /><input type="date" value={form.expiryDate} onChange={(event) => setForm({ ...form, expiryDate: event.target.value })} className="input" /></div>
          <div className="card"><textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} className="textarea min-h-[420px]" /></div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-10"><Link href="/library" className="btn-secondary">Cancel</Link><div className="flex gap-3"><button onClick={() => handleSave("draft")} className="btn-secondary" disabled={!form.title.trim() || !form.body.trim()}>Save draft</button><button onClick={() => handleSave("published")} className="btn-primary" disabled={!form.title.trim() || !form.body.trim()}>Publish document</button></div></div>
        </section>

        <aside className="space-y-4"><div className="surface-dark p-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Preview checklist</p><div className="mt-4 space-y-3 text-sm"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">Audience</p><p className="mt-1 text-slate-300">{clinicSummary}</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">Vertical</p><p className="mt-1 text-slate-300">{presetLabel}</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">Workspace context</p><p className="mt-1 text-slate-300">{workspaceMode === "blank" ? "Blank workspace active" : "Demo workspace active"}</p></div></div></div><div className="card-muted border-2 border-emerald-200 bg-emerald-50/80"><p className="section-label text-emerald-700">Blank mode visibility</p><p className="mt-3 text-sm leading-6 text-slate-700">Want the clean-start product story? Click <span className="font-semibold">Make workspace blank</span>, then verify the change on Dashboard and Library.</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setWorkspaceMode("blank")} className="btn-primary bg-emerald-600 hover:bg-emerald-500">Turn on blank mode</button><Link href="/dashboard" className="btn-secondary gap-2">Check dashboard <ArrowRight className="h-4 w-4" /></Link></div></div>{generatedSummary.length > 0 ? <div className="card-muted"><p className="section-label">Generated draft summary</p><div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{generatedSummary.map((item) => <p key={item}>• {item}</p>)}</div></div> : null}</aside>
      </div>
    </div>
  );
}
