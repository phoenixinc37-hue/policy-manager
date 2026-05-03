export type SavedDraftRecord = {
  id: string;
  title: string;
  documentType: string;
  version: string;
  author: string;
  reviewTimeline: string;
  circulateTo: string;
  distributionList: string;
  purpose: string;
  scope: string;
  policyStatement: string;
  procedureSteps: string[];
  exceptionsNotes: string;
  definitions: string;
  attachments: string[];
  savedAt: string;
};

export const CURRENT_DRAFT_KEY = "policy-manager-ai-draft";
export const SAVED_DRAFTS_KEY = "policy-manager-ai-saved-drafts";
export const PENDING_DRAFTS_KEY = "policy-manager-ai-pending-drafts";

export function loadSavedDrafts(): SavedDraftRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SAVED_DRAFTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDraftCollection(drafts: SavedDraftRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(drafts));
}

export function upsertSavedDraft(draft: Omit<SavedDraftRecord, "id" | "savedAt">, id?: string) {
  const drafts = loadSavedDrafts();
  const draftId = id || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`);
  const record: SavedDraftRecord = {
    ...draft,
    id: draftId,
    savedAt: new Date().toISOString(),
  };
  const next = [record, ...drafts.filter((item) => item.id !== draftId)];
  saveDraftCollection(next);
  return record;
}

export function getSavedDraft(id: string) {
  return loadSavedDrafts().find((draft) => draft.id === id) || null;
}

export function deleteSavedDraft(id: string) {
  const next = loadSavedDrafts().filter((draft) => draft.id !== id);
  saveDraftCollection(next);
}

export function loadPendingDrafts(): SavedDraftRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(PENDING_DRAFTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePendingDrafts(drafts: SavedDraftRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_DRAFTS_KEY, JSON.stringify(drafts));
}

export function moveDraftToPending(id: string) {
  const saved = getSavedDraft(id);
  if (!saved) return;
  const pending = loadPendingDrafts();
  // Avoid duplicates
  if (!pending.find((d) => d.id === id)) {
    savePendingDrafts([saved, ...pending]);
  }
  deleteSavedDraft(id);
}
