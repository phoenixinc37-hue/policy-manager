import { getProfile } from "../actions";
import { SetupClient } from "./SetupClient";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const profile = await getProfile() as any;

  const config = {
    businessName: profile.businessName || "",
    employerGroup: profile.employerGroup || "Leadership",
    employerGroupCustom: profile.employerGroupCustom || "",
    employeeGroup: profile.employeeGroup || "Team",
    employeeGroupCustom: profile.employeeGroupCustom || "",
    policyMessage: profile.policyMessage || "Policies only work when people understand them, follow them, and can find them when they need them.",
    policyMessageCustom: profile.policyMessageCustom || "",
    includeCoreDefinitions: profile.includeCoreDefinitions || "Yes",
    actionBubbleColor: profile.actionBubbleColor || "#1f5d24",
    employeeActionButtonColor: profile.employeeActionButtonColor || "#66a97a",
    generalActionButtonColor: profile.generalActionButtonColor || "#1f5d24",
  };

  return <SetupClient initialConfig={config} />;
}
