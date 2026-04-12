import type { Acknowledgment, ImportSourceMeta, PolicyItem, User } from "@/types";
import { DEFAULT_VERTICAL_PRESET, type VerticalPresetId } from "./mock-data";

export const STORAGE_KEY = "policy-manager/v2/state";
export type WorkspaceMode = "demo" | "blank";

export interface PersistedAppState {
  presetId: VerticalPresetId;
  currentUserId: string;
  policies: PolicyItem[];
  acknowledgments: Acknowledgment[];
  workspaceMode: WorkspaceMode;
}

interface SeedState {
  presetId: VerticalPresetId;
  currentUser: User;
  policies: PolicyItem[];
  acknowledgments: Acknowledgment[];
}

function isPolicyStatus(value: unknown): value is PolicyItem["status"] {
  return value === "draft" || value === "published" || value === "archived";
}

function isCommunicationType(value: unknown): value is PolicyItem["type"] {
  return value === "policy" || value === "sog" || value === "info";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function sanitizeImportSourceMeta(value: unknown): ImportSourceMeta | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Record<string, unknown>;
  if (candidate.mode !== "authored" && candidate.mode !== "imported") return undefined;

  const parsed: ImportSourceMeta = { mode: candidate.mode };
  if (typeof candidate.fileName === "string") parsed.fileName = candidate.fileName;
  if (typeof candidate.fileType === "string") parsed.fileType = candidate.fileType;
  if (candidate.parseStatus === "parsed" || candidate.parseStatus === "staged") parsed.parseStatus = candidate.parseStatus;
  if (typeof candidate.sourceLabel === "string") parsed.sourceLabel = candidate.sourceLabel;
  if (typeof candidate.importedAt === "string") parsed.importedAt = candidate.importedAt;
  if (typeof candidate.notes === "string") parsed.notes = candidate.notes;
  if (typeof candidate.originalExcerpt === "string") parsed.originalExcerpt = candidate.originalExcerpt;
  return parsed;
}

function sanitizePolicyItem(item: unknown): PolicyItem | null {
  if (!item || typeof item !== "object") return null;
  const candidate = item as Record<string, unknown>;

  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    !isCommunicationType(candidate.type) ||
    typeof candidate.category !== "string" ||
    !isStringArray(candidate.clinics) ||
    !isPolicyStatus(candidate.status) ||
    typeof candidate.effectiveDate !== "string" ||
    typeof candidate.version !== "number" ||
    typeof candidate.body !== "string" ||
    typeof candidate.createdBy !== "string" ||
    typeof candidate.createdAt !== "string" ||
    typeof candidate.updatedAt !== "string"
  ) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    type: candidate.type,
    category: candidate.category,
    clinics: candidate.clinics,
    status: candidate.status,
    effectiveDate: candidate.effectiveDate,
    reviewDate: typeof candidate.reviewDate === "string" ? candidate.reviewDate : undefined,
    expiryDate: typeof candidate.expiryDate === "string" ? candidate.expiryDate : undefined,
    version: candidate.version,
    body: candidate.body,
    createdBy: candidate.createdBy,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
    source: sanitizeImportSourceMeta(candidate.source),
  };
}

function sanitizeAcknowledgment(item: unknown): Acknowledgment | null {
  if (!item || typeof item !== "object") return null;
  const candidate = item as Record<string, unknown>;

  if (
    typeof candidate.id !== "string" ||
    typeof candidate.policyId !== "string" ||
    typeof candidate.userId !== "string" ||
    typeof candidate.dueDate !== "string" ||
    !(typeof candidate.acknowledgedAt === "string" || candidate.acknowledgedAt === null)
  ) {
    return null;
  }

  return {
    id: candidate.id,
    policyId: candidate.policyId,
    userId: candidate.userId,
    dueDate: candidate.dueDate,
    acknowledgedAt: candidate.acknowledgedAt,
  };
}

export function loadPersistedState(seed: SeedState): PersistedAppState {
  const fallback: PersistedAppState = {
    presetId: seed.presetId,
    currentUserId: seed.currentUser.id,
    policies: seed.policies,
    acknowledgments: seed.acknowledgments,
    workspaceMode: "demo",
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
    const policies = Array.isArray(parsed.policies)
      ? parsed.policies.map(sanitizePolicyItem).filter((item): item is PolicyItem => !!item)
      : seed.policies;
    const acknowledgments = Array.isArray(parsed.acknowledgments)
      ? parsed.acknowledgments.map(sanitizeAcknowledgment).filter((item): item is Acknowledgment => !!item)
      : seed.acknowledgments;

    return {
      presetId: parsed.presetId === "law" ? "law" : parsed.presetId === "accounting" ? "accounting" : DEFAULT_VERTICAL_PRESET,
      currentUserId: typeof parsed.currentUserId === "string" ? parsed.currentUserId : seed.currentUser.id,
      policies,
      acknowledgments,
      workspaceMode: parsed.workspaceMode === "blank" ? "blank" : "demo",
    };
  } catch {
    return fallback;
  }
}

export function persistState(state: PersistedAppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPersistedState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
