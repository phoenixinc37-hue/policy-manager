"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, Acknowledgment } from "@/types";
import { users, acknowledgments as initialAcks } from "./mock-data";

interface AppState {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  acknowledgments: Acknowledgment[];
  acknowledgePolicy: (policyId: string) => void;
  isManager: boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(
    users.find((u) => u.id === "user-scott")!
  );
  const [acks, setAcks] = useState<Acknowledgment[]>(initialAcks);

  const acknowledgePolicy = useCallback(
    (policyId: string) => {
      setAcks((prev) =>
        prev.map((a) =>
          a.policyId === policyId && a.userId === currentUser.id && !a.acknowledgedAt
            ? { ...a, acknowledgedAt: new Date().toISOString().slice(0, 10) }
            : a
        )
      );
    },
    [currentUser.id]
  );

  const isManager = ["owner", "admin", "practice_manager", "manager"].includes(
    currentUser.role
  );

  return (
    <AppContext.Provider
      value={{ currentUser, setCurrentUser, acknowledgments: acks, acknowledgePolicy, isManager }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
