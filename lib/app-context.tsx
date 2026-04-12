"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Acknowledgment,
  Clinic,
  PolicyItem,
  User,
  CommunicationType,
  PolicyStatus,
  ImportSourceMeta,
} from "@/types";
import {
  DEFAULT_VERTICAL_PRESET,
  clinicDisplayFromPreset,
  getVerticalPreset,
  type VerticalPresetId,
} from "./mock-data";
import { DEMO_TODAY } from "./date-utils";
import { clearPersistedState, loadPersistedState, persistState, type WorkspaceMode } from "./persistence";

interface PolicyDraftInput {
  title: string;
  type: CommunicationType;
  category: string;
  clinicIds: string[];
  status: PolicyStatus;
  effectiveDate: string;
  reviewDate?: string;
  expiryDate?: string;
  body: string;
  source?: ImportSourceMeta;
}

interface AppState {
  presetId: VerticalPresetId;
  setPresetId: (presetId: VerticalPresetId) => void;
  organizationName: string;
  presetLabel: string;
  presetIndustry: string;
  moduleHighlights: string[];
  locationLabel: string;
  locationLabelPlural: string;
  roleLabels: Record<string, string>;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  clinics: Clinic[];
  categories: string[];
  clinicDisplay: (ids: string[]) => string;
  getUserById: (userId: string) => User | undefined;
  policies: PolicyItem[];
  acknowledgments: Acknowledgment[];
  isManager: boolean;
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  acknowledgePolicy: (policyId: string) => void;
  savePolicy: (input: PolicyDraftInput, existingId?: string) => string;
  getPolicyById: (policyId: string) => PolicyItem | undefined;
  resetDemoState: () => void;
}

const AppContext = createContext<AppState | null>(null);
const today = DEMO_TODAY;

function createAcknowledgmentsForPolicy(policyId: string, clinicIds: string[], clinics: Clinic[], users: User[]) {
  const resolvedClinicIds = clinicIds.length > 0 ? clinicIds : clinics.map((clinic) => clinic.id);
  const staff = users.filter(
    (user) => user.role === "staff" && user.clinics.some((clinicId) => resolvedClinicIds.includes(clinicId))
  );

  return staff.map((staffUser, index) => ({
    id: `ack-${policyId}-${staffUser.id}-${index}`,
    policyId,
    userId: staffUser.id,
    acknowledgedAt: null,
    dueDate: policyId.startsWith("pol-new") ? "2026-04-17" : "2026-04-16",
  }));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [presetId, setPresetIdState] = useState<VerticalPresetId>(DEFAULT_VERTICAL_PRESET);
  const preset = useMemo(() => getVerticalPreset(presetId), [presetId]);
  const defaultUser = preset.users[0];

  const [currentUser, setCurrentUserState] = useState<User>(defaultUser);
  const [policyItems, setPolicyItems] = useState<PolicyItem[]>(preset.policies);
  const [acks, setAcks] = useState<Acknowledgment[]>(preset.acknowledgments);
  const [workspaceMode, setWorkspaceModeState] = useState<WorkspaceMode>("demo");

  useEffect(() => {
    const persisted = loadPersistedState({
      presetId: DEFAULT_VERTICAL_PRESET,
      currentUser: getVerticalPreset(DEFAULT_VERTICAL_PRESET).users[0],
      policies: getVerticalPreset(DEFAULT_VERTICAL_PRESET).policies,
      acknowledgments: getVerticalPreset(DEFAULT_VERTICAL_PRESET).acknowledgments,
    });

    const nextPreset = getVerticalPreset(persisted.presetId);
    const persistedUser = nextPreset.users.find((user) => user.id === persisted.currentUserId) ?? nextPreset.users[0];

    setPresetIdState(nextPreset.id);
    setCurrentUserState(persistedUser);
    setPolicyItems(persisted.workspaceMode === "blank" ? [] : persisted.policies);
    setAcks(persisted.workspaceMode === "blank" ? [] : persisted.acknowledgments);
    setWorkspaceModeState(persisted.workspaceMode);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    persistState({
      presetId,
      currentUserId: currentUser.id,
      policies: policyItems,
      acknowledgments: acks,
      workspaceMode,
    });
  }, [acks, currentUser.id, hasHydrated, policyItems, presetId, workspaceMode]);

  const setCurrentUser = useCallback((user: User) => {
    setCurrentUserState(user);
  }, []);

  const setPresetId = useCallback((nextPresetId: VerticalPresetId) => {
    const nextPreset = getVerticalPreset(nextPresetId);
    setPresetIdState(nextPreset.id);
    setCurrentUserState(nextPreset.users[0]);
    setPolicyItems(nextPreset.policies);
    setAcks(nextPreset.acknowledgments);
    setWorkspaceModeState("demo");
  }, []);

  const setWorkspaceMode = useCallback((mode: WorkspaceMode) => {
    setWorkspaceModeState(mode);

    if (mode === "blank") {
      setCurrentUserState(preset.users[0]);
      setPolicyItems([]);
      setAcks([]);
      return;
    }

    setCurrentUserState(preset.users[0]);
    setPolicyItems(preset.policies);
    setAcks(preset.acknowledgments);
  }, [preset]);

  const acknowledgePolicy = useCallback(
    (policyId: string) => {
      setAcks((prev) =>
        prev.map((ack) =>
          ack.policyId === policyId && ack.userId === currentUser.id && !ack.acknowledgedAt
            ? { ...ack, acknowledgedAt: today }
            : ack
        )
      );
    },
    [currentUser.id]
  );

  const savePolicy = useCallback(
    (input: PolicyDraftInput, existingId?: string) => {
      const nextId = existingId ?? `pol-new-${Date.now()}`;
      const resolvedClinicIds = input.clinicIds.length > 0 ? input.clinicIds : preset.clinics.map((clinic) => clinic.id);
      const normalizedStatus = input.status;

      setPolicyItems((prev) => {
        const existing = prev.find((item) => item.id === nextId);
        const nextVersion = existing ? existing.version + 1 : 1;
        const createdAt = existing?.createdAt ?? today;
        const createdBy = existing?.createdBy ?? currentUser.id;

        const nextPolicy: PolicyItem = {
          id: nextId,
          title: input.title,
          type: input.type,
          category: input.category,
          clinics: resolvedClinicIds,
          status: normalizedStatus,
          effectiveDate: input.effectiveDate || today,
          reviewDate: input.reviewDate || undefined,
          expiryDate: input.expiryDate || undefined,
          version: nextVersion,
          body: input.body,
          createdBy,
          createdAt,
          updatedAt: today,
          source: input.source ?? existing?.source ?? { mode: "authored" },
        };

        if (existing) return prev.map((item) => (item.id === nextId ? nextPolicy : item));
        return [nextPolicy, ...prev];
      });

      setAcks((prev) => {
        const existingPolicyAcks = prev.filter((ack) => ack.policyId === nextId);
        if (normalizedStatus !== "published") return prev.filter((ack) => ack.policyId !== nextId);

        const createdAcks = createAcknowledgmentsForPolicy(nextId, resolvedClinicIds, preset.clinics, preset.users);
        if (!existingId) return [...createdAcks, ...prev];

        const acknowledgmentMap = new Map(existingPolicyAcks.map((ack) => [`${ack.policyId}:${ack.userId}`, ack]));
        const nextPolicyAcks = createdAcks.map((ack) => acknowledgmentMap.get(`${ack.policyId}:${ack.userId}`) ?? ack);
        const untouched = prev.filter((ack) => ack.policyId !== nextId);
        return [...nextPolicyAcks, ...untouched];
      });

      return nextId;
    },
    [currentUser.id, preset]
  );

  const resetDemoState = useCallback(() => {
    clearPersistedState();
    const freshPreset = getVerticalPreset(presetId);
    setCurrentUserState(freshPreset.users[0]);
    setPolicyItems(freshPreset.policies);
    setAcks(freshPreset.acknowledgments);
    setWorkspaceModeState("demo");
    setHasHydrated(true);
  }, [presetId]);

  const value = useMemo<AppState>(() => {
    const isManager = ["owner", "admin", "practice_manager", "manager"].includes(currentUser.role);

    return {
      presetId,
      setPresetId,
      organizationName: preset.organization.name,
      presetLabel: preset.label,
      presetIndustry: preset.industry,
      moduleHighlights: preset.moduleHighlights,
      locationLabel: preset.locationLabel,
      locationLabelPlural: preset.locationLabelPlural,
      roleLabels: preset.roleLabels,
      currentUser,
      setCurrentUser,
      users: preset.users,
      clinics: preset.clinics,
      categories: preset.categories,
      clinicDisplay: (ids: string[]) => clinicDisplayFromPreset(ids, preset.clinics),
      getUserById: (userId: string) => preset.users.find((user) => user.id === userId),
      policies: policyItems,
      acknowledgments: acks,
      isManager,
      workspaceMode,
      setWorkspaceMode,
      acknowledgePolicy,
      savePolicy,
      getPolicyById: (policyId: string) => policyItems.find((policy) => policy.id === policyId),
      resetDemoState,
    };
  }, [acknowledgePolicy, acks, currentUser, policyItems, preset, presetId, resetDemoState, savePolicy, setCurrentUser, setPresetId, setWorkspaceMode, workspaceMode]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
