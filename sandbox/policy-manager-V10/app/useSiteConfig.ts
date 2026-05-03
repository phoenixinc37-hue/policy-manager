"use client";
import { useState, useEffect } from "react";

export type DefinitionMode = "manual" | "ai";

export type DefinitionItem = {
  key: string;
  label: string;
  definition: string;
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
};

export function useSiteConfig() {
  const [config, setConfig] = useState(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("v10-site-config");
    if (saved) {
      try {
        setConfig((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const updateConfig = (updates: Partial<typeof defaultConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    localStorage.setItem("v10-site-config", JSON.stringify(next));
  };

  return { config, updateConfig, isLoaded, defaultDefinitions };
}
