"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Acknowledgment, PolicyItem, User, CommunicationType, PolicyStatus } from "@/types";
import {
  users,
  policies as seededPolicies,
  acknowledgments as seededAcknowledgments,
  clinics,
} from "./mock-data";

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
}

interface AppState {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  policies: PolicyItem[];
  acknowledgments: Acknowledgment[];
  isManager: boolean;
  acknowledgePolicy: (policyId: string) => void;
  savePolicy: (input: PolicyDraftInput, existingId?: string) => string;
  getPolicyById: (policyId: string) => PolicyItem | undefined;
}

const AppContext = createContext<AppState | null>(null);

const today = "2026-04-09";

function createAcknowledgmentsForPolicy(policyId: string, clinicIds: string[]) {
  const staff = users.filter(
    (user) =>
      user.role === "staff" && user.clinics.some((clinicId) => clinicIds.includes(clinicId))
  );

  return staff.map((staffUser, index) => ({
    id: `ack-${policyId}-${staffUser.id}-${index}`,
    policyId,
    userId: staffUser.id,
    acknowledgedAt: null,
    dueDate: policyId.startsWith("pol-new") ? "2026-04-16" : "2026-04-15",
  }));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users.find((u) => u.id === "user-scott")!);
  const [policyItems, setPolicyItems] = useState<PolicyItem[]>(seededPolicies);
  const [acks, setAcks] = useState<Acknowledgment[]>(seededAcknowledgments);

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
          clinics: input.clinicIds.length > 0 ? input.clinicIds : clinics.map((clinic) => clinic.id),
          status: input.status,
          effectiveDate: input.effectiveDate || today,
          reviewDate: input.reviewDate || undefined,
          expiryDate: input.expiryDate || undefined,
          version: nextVersion,
          body: input.body,
          createdBy,
          createdAt,
          updatedAt: today,
        };

        if (existing) {
          return prev.map((item) => (item.id === nextId ? nextPolicy : item));
        }

        return [nextPolicy, ...prev];
      });

      if (!existingId && input.status === "published") {
        setAcks((prev) => [...createAcknowledgmentsForPolicy(nextId, input.clinicIds), ...prev]);
      }

      return nextId;
    },
    [currentUser.id]
  );

  const value = useMemo<AppState>(() => {
    const isManager = ["owner", "admin", "practice_manager", "manager"].includes(currentUser.role);

    return {
      currentUser,
      setCurrentUser,
      policies: policyItems,
      acknowledgments: acks,
      isManager,
      acknowledgePolicy,
      savePolicy,
      getPolicyById: (policyId: string) => policyItems.find((policy) => policy.id === policyId),
    };
  }, [acknowledgePolicy, acks, currentUser, policyItems, savePolicy]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
