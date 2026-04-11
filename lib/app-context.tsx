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
  PolicyItem,
  User,
  CommunicationType,
  PolicyStatus,
  ImportSourceMeta,
} from "@/types";
import {
  users,
  policies as seededPolicies,
  acknowledgments as seededAcknowledgments,
  clinics,
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
  currentUser: User;
  setCurrentUser: (user: User) => void;
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

const defaultUser = users.find((u) => u.id === "user-scott")!;
const today = DEMO_TODAY;

function createAcknowledgmentsForPolicy(policyId: string, clinicIds: string[]) {
  const resolvedClinicIds = clinicIds.length > 0 ? clinicIds : clinics.map((clinic) => clinic.id);
  const staff = users.filter(
    (user) =>
      user.role === "staff" && user.clinics.some((clinicId) => resolvedClinicIds.includes(clinicId))
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
  const [currentUser, setCurrentUserState] = useState<User>(defaultUser);
  const [policyItems, setPolicyItems] = useState<PolicyItem[]>(seededPolicies);
  const [acks, setAcks] = useState<Acknowledgment[]>(seededAcknowledgments);
  const [workspaceMode, setWorkspaceModeState] = useState<WorkspaceMode>("demo");

  useEffect(() => {
    const persisted = loadPersistedState({
      currentUser: defaultUser,
      policies: seededPolicies,
      acknowledgments: seededAcknowledgments,
    });

    const persistedUser = users.find((user) => user.id === persisted.currentUserId) ?? defaultUser;

    setCurrentUserState(persistedUser);
    setPolicyItems(persisted.policies);
    setAcks(persisted.acknowledgments);
    setWorkspaceModeState(persisted.workspaceMode);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    persistState({
      currentUserId: currentUser.id,
      policies: policyItems,
      acknowledgments: acks,
      workspaceMode,
    });
  }, [acks, currentUser.id, hasHydrated, policyItems, workspaceMode]);

  const setCurrentUser = useCallback((user: User) => {
    setCurrentUserState(user);
  }, []);

  const setWorkspaceMode = useCallback((mode: WorkspaceMode) => {
    setWorkspaceModeState(mode);

    if (mode === "blank") {
      setCurrentUserState(defaultUser);
      setPolicyItems([]);
      setAcks([]);
      return;
    }

    setCurrentUserState(defaultUser);
    setPolicyItems(seededPolicies);
    setAcks(seededAcknowledgments);
  }, []);

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
      const resolvedClinicIds = input.clinicIds.length > 0 ? input.clinicIds : clinics.map((clinic) => clinic.id);
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

        if (existing) {
          return prev.map((item) => (item.id === nextId ? nextPolicy : item));
        }

        return [nextPolicy, ...prev];
      });

      setAcks((prev) => {
        const existingPolicyAcks = prev.filter((ack) => ack.policyId === nextId);

        if (normalizedStatus !== "published") {
          return prev.filter((ack) => ack.policyId !== nextId);
        }

        const createdAcks = createAcknowledgmentsForPolicy(nextId, resolvedClinicIds);

        if (!existingId) {
          return [...createdAcks, ...prev];
        }

        const acknowledgmentMap = new Map(existingPolicyAcks.map((ack) => [`${ack.policyId}:${ack.userId}`, ack]));
        const nextPolicyAcks = createdAcks.map((ack) => acknowledgmentMap.get(`${ack.policyId}:${ack.userId}`) ?? ack);
        const untouched = prev.filter((ack) => ack.policyId !== nextId);
        return [...nextPolicyAcks, ...untouched];
      });

      return nextId;
    },
    [currentUser.id]
  );

  const resetDemoState = useCallback(() => {
    clearPersistedState();
    setCurrentUserState(defaultUser);
    setPolicyItems(seededPolicies);
    setAcks(seededAcknowledgments);
    setWorkspaceModeState("demo");
    setHasHydrated(true);
  }, []);

  const value = useMemo<AppState>(() => {
    const isManager = ["owner", "admin", "practice_manager", "manager"].includes(currentUser.role);

    return {
      currentUser,
      setCurrentUser,
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
  }, [acknowledgePolicy, acks, currentUser, policyItems, resetDemoState, savePolicy, setCurrentUser, setWorkspaceMode, workspaceMode]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
