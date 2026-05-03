export type ApprovalDecision = "pending" | "approved" | "rejected";

export type ApprovalReviewer = {
  id: string;
  fullName: string;
  email: string;
  accessLevelId: string;
  siteLocationId: string;
  decision: ApprovalDecision;
};

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
  reviewers?: ApprovalReviewer[];
  circulationTargets?: string[];
  approvalCompletedAt?: string;
  circulatedAt?: string;
  acknowledgments?: Record<string, string>; // personId -> timestamp
  completedAt?: string; // final archive timestamp
};

export const CURRENT_DRAFT_KEY = "policy-manager-ai-draft";
export const SAVED_DRAFTS_KEY = "policy-manager-ai-saved-drafts";
export const APPROVAL_DRAFTS_KEY = "policy-manager-ai-approval-drafts";

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

export function loadApprovalDrafts(): SavedDraftRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(APPROVAL_DRAFTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApprovalDrafts(drafts: SavedDraftRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APPROVAL_DRAFTS_KEY, JSON.stringify(drafts));
}

export function moveDraftToApproval(id: string, reviewers?: ApprovalReviewer[]) {
  const saved = getSavedDraft(id);
  if (!saved) return;
  const approval = loadApprovalDrafts();
  const record = reviewers ? { ...saved, reviewers } : saved;
  if (!approval.find((d) => d.id === id)) {
    saveApprovalDrafts([record, ...approval]);
  } else {
    saveApprovalDrafts(approval.map((item) => (item.id === id ? record : item)));
  }
  deleteSavedDraft(id);
}

export const CIRCULATING_DRAFTS_KEY = "policy-manager-ai-circulating-drafts";

export function loadCirculatingDrafts(): SavedDraftRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CIRCULATING_DRAFTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCirculatingDrafts(drafts: SavedDraftRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CIRCULATING_DRAFTS_KEY, JSON.stringify(drafts));
}

export function moveDraftToCirculating(id: string) {
  if (typeof window === "undefined") return;
  
  // Force clean read of approval queue
  const rawApproval = window.localStorage.getItem(APPROVAL_DRAFTS_KEY);
  let approval: SavedDraftRecord[] = [];
  if (rawApproval) {
    try { approval = JSON.parse(rawApproval); } catch (e) {}
  }
  
  const draft = approval.find((d) => d.id === id);
  if (!draft) return;

  // Force clean read of circulating queue
  const rawCirculating = window.localStorage.getItem(CIRCULATING_DRAFTS_KEY);
  let circulating: SavedDraftRecord[] = [];
  if (rawCirculating) {
    try { circulating = JSON.parse(rawCirculating); } catch (e) {}
  }

  // Insert or update circulating draft
  const draftWithTime = { ...draft, circulatedAt: new Date().toISOString() };
  if (!circulating.find((d) => d.id === id)) {
    window.localStorage.setItem(CIRCULATING_DRAFTS_KEY, JSON.stringify([draftWithTime, ...circulating]));
  } else {
    window.localStorage.setItem(CIRCULATING_DRAFTS_KEY, JSON.stringify(circulating.map((item) => (item.id === id ? draftWithTime : item))));
  }

  // Remove from approval queue
  window.localStorage.setItem(APPROVAL_DRAFTS_KEY, JSON.stringify(approval.filter((d) => d.id !== id)));
}
export function updateCirculatingDraft(updated: SavedDraftRecord) {
  if (typeof window === "undefined") return;
  const circulating = loadCirculatingDrafts();
  const next = circulating.map((item) => (item.id === updated.id ? updated : item));
  saveCirculatingDrafts(next);
}

export const LIBRARY_DRAFTS_KEY = "policy-manager-ai-library-drafts";

export function loadLibraryDrafts(): SavedDraftRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(LIBRARY_DRAFTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLibraryDrafts(drafts: SavedDraftRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIBRARY_DRAFTS_KEY, JSON.stringify(drafts));
}

export function moveDraftToLibrary(id: string) {
  if (typeof window === "undefined") return;
  
  const rawCirculating = window.localStorage.getItem(CIRCULATING_DRAFTS_KEY);
  let circulating: SavedDraftRecord[] = [];
  if (rawCirculating) {
    try { circulating = JSON.parse(rawCirculating); } catch (e) {}
  }
  
  const draft = circulating.find((d) => d.id === id);
  if (!draft) return;

  // Force clean read of library queue
  const rawLibrary = window.localStorage.getItem(LIBRARY_DRAFTS_KEY);
  let library: SavedDraftRecord[] = [];
  if (rawLibrary) {
    try { library = JSON.parse(rawLibrary); } catch (e) {}
  }
  
  const draftWithTime = { ...draft, completedAt: new Date().toISOString() };
  
  if (!library.find((d) => d.id === id)) {
    window.localStorage.setItem(LIBRARY_DRAFTS_KEY, JSON.stringify([draftWithTime, ...library]));
  } else {
    window.localStorage.setItem(LIBRARY_DRAFTS_KEY, JSON.stringify(library.map((item) => (item.id === id ? draftWithTime : item))));
  }

  window.localStorage.setItem(CIRCULATING_DRAFTS_KEY, JSON.stringify(circulating.filter((d) => d.id !== id)));
}
export function getApprovalDraft(id: string) {
  return loadApprovalDrafts().find((draft) => draft.id === id) || null;
}

export function updateApprovalDraft(updated: SavedDraftRecord) {
  const approval = loadApprovalDrafts();
  saveApprovalDrafts(approval.map((item) => (item.id === updated.id ? updated : item)));
}
