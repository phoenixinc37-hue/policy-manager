"use client";
import { useState, useEffect } from "react";

export type DefinitionMode = "manual" | "ai";

export type DefinitionItem = {
  key: string;
  label: string;
  definition: string;
};

export type SiteLocationItem = {
  id: string;
  name: string;
};

export type AccessLevelItem = {
  id: string;
  name: string;
  description: string;
  accessSummary: string;
  approvalSummary: string;
};

export type PersonnelItem = {
  id: string;
  fullName: string;
  email: string;
  accessLevelId: string;
  siteLocationId: string;
};

const defaultDefinitions: DefinitionItem[] = [
  {
    key: "leadership",
    label: "Leadership",
    definition: "Leadership is the group responsible for approving documents, setting direction, and monitoring whether policies are actually being implemented.",
  },
  {
    key: "team",
    label: "Team",
    definition: "Team means the people who receive, read, acknowledge, and carry out the policies, SOGs, and memos inside the business.",
  },
  {
    key: "circulate",
    label: "Circulate",
    definition: "Circulate means a document has been sent out to the assigned people and remains active until everyone required has acknowledged it.",
  },
  {
    key: "policy",
    label: "Policy",
    definition: "A policy is a formal business rule or decision that sets the standard for how the company operates in a specific area.",
  },
  {
    key: "sog",
    label: "SOG",
    definition: "SOG means Standard Operating Guideline. It explains how work is done in practice so the team can follow a consistent process.",
  },
  {
    key: "memo",
    label: "Memo",
    definition: "A memo is a shorter operational communication used to share direction, updates, reminders, or temporary instructions across the business.",
  },
];

const STORAGE_KEY = "v10-site-config";

const defaultConfig = {
  businessName: "",
  employerGroup: "Leadership",
  employerGroupCustom: "",
  employeeGroup: "Team",
  employeeGroupCustom: "",
  policyMessage: "Policies only work when people understand them, follow them, and can find them when they need them.",
  policyMessageCustom: "",
  includeCoreDefinitions: "Yes",
  definitionMode: "manual" as DefinitionMode,
  definitions: defaultDefinitions,
  actionBubbleColor: "#1f5d24",
  employeeActionButtonColor: "#66a97a",
  generalActionButtonColor: "#374151",
  aiAssistantSetupChoice: "Maybe later",
  aiProviderChoice: "",
  aiConnectionStatus: "Not connected",
  aiProviderName: "",
  aiN8nWebhookUrl: "",
  aiSetupNotes: "",
  siteLocations: [
    { id: "site-tg", name: "TG" },
    { id: "site-ross", name: "ROSS" },
    { id: "site-rv", name: "RV" },
    { id: "site-all", name: "ALL" },
  ] as SiteLocationItem[],
  accessLevels: [
    {
      id: "l1",
      name: "L1",
      description: "Top authority level",
      accessSummary: "Access to everything",
      approvalSummary: "Approves policies and SOGs",
    },
    {
      id: "l2",
      name: "L2",
      description: "Management level",
      accessSummary: "Broad access except top approval panels",
      approvalSummary: "Can write SOGs, cannot approve SOGs, can approve memos",
    },
    {
      id: "l3",
      name: "L3",
      description: "Site or department lead level",
      accessSummary: "Can view team status for assigned site/location",
      approvalSummary: "Can write SOGs, cannot approve SOGs, can approve memos",
    },
  ] as AccessLevelItem[],
  personnel: [] as PersonnelItem[],
};

export function useSiteConfig() {
  const [config, setConfig] = useState(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const safeConfig = {
          ...parsed,
          definitions: Array.isArray(parsed?.definitions) ? parsed.definitions : defaultDefinitions,
          siteLocations: Array.isArray(parsed?.siteLocations) ? parsed.siteLocations : [],
          accessLevels: Array.isArray(parsed?.accessLevels) && parsed.accessLevels.length
            ? parsed.accessLevels
            : defaultConfig.accessLevels,
          personnel: Array.isArray(parsed?.personnel) ? parsed.personnel : [],
        };
        setConfig((prev) => ({ ...prev, ...safeConfig }));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const updateConfig = (updates: Partial<typeof defaultConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return { config, updateConfig, isLoaded, defaultDefinitions };
}

export function loadConfigSnapshot() {
  if (typeof window === "undefined") return defaultConfig;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultConfig;
  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultConfig,
      ...parsed,
      definitions: Array.isArray(parsed?.definitions) ? parsed.definitions : defaultDefinitions,
      siteLocations: Array.isArray(parsed?.siteLocations) ? parsed.siteLocations : [],
      accessLevels: Array.isArray(parsed?.accessLevels) && parsed.accessLevels.length ? parsed.accessLevels : defaultConfig.accessLevels,
      personnel: Array.isArray(parsed?.personnel) ? parsed.personnel : [],
    };
  } catch {
    return defaultConfig;
  }
}
