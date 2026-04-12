const fs = require('fs');

const basePath = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';
const original = fs.readFileSync('/tmp/original-mock-data.ts', 'utf8');
let current = fs.readFileSync(basePath + 'lib/mock-data.ts', 'utf8');

// Extract the original data
const matchClinics = original.match(/export const clinics: Clinic\[\] = \[([\s\S]*?)\];/)[0];
const matchUsers = original.match(/export const users: User\[\] = \[([\s\S]*?)\];/)[0];
const matchCategories = original.match(/export const categories = \[([\s\S]*?)\];/)[0];
const matchPolicies = original.match(/export const policies: PolicyItem\[\] = \[([\s\S]*?)\];/)[0];
const matchAcknowledgments = original.match(/export const acknowledgments: Acknowledgment\[\] = \[([\s\S]*?)\];/)[0];

const vetPresetStr = `
const vetClinics: Clinic[] = ${matchClinics.replace('export const clinics: Clinic[] = ', '')}
const vetUsers: User[] = ${matchUsers.replace('export const users: User[] = ', '')}
const vetCategories = ${matchCategories.replace('export const categories = ', '')}
const vetPolicies: PolicyItem[] = ${matchPolicies.replace('export const policies: PolicyItem[] = ', '')}
const vetAcknowledgments: Acknowledgment[] = ${matchAcknowledgments.replace('export const acknowledgments: Acknowledgment[] = ', '')}
`;

current = current.replace('export type VerticalPresetId = "accounting" | "law";', 'export type VerticalPresetId = "veterinary" | "accounting" | "law";');

current = current.replace('export interface VerticalPreset {', `export interface VerticalPreset {
  roleLabels: Record<string, string>;
  locationLabel: string;
  locationLabelPlural: string;`);

current = current.replace('export const verticalPresets: Record<VerticalPresetId, VerticalPreset> = {', `
${vetPresetStr}

export const verticalPresets: Record<VerticalPresetId, VerticalPreset> = {
  veterinary: {
    id: "veterinary",
    label: "Veterinary Clinic",
    shortLabel: "Vet",
    industry: "Veterinary",
    organization: { id: "org-1", name: "Rosslyn Veterinary Group" },
    clinics: vetClinics,
    users: vetUsers,
    categories: vetCategories,
    policies: vetPolicies,
    acknowledgments: vetAcknowledgments,
    landingLabel: "Veterinary clinic preset",
    landingDescription: "Shows patient care, controlled drugs, and facility workflows with seeded clinic-specific content.",
    moduleHighlights: ["Pharmacy", "Clinical", "Front Desk", "Safety"],
    locationLabel: "Clinic",
    locationLabelPlural: "Clinics",
    roleLabels: {
      owner: "Owner",
      admin: "Admin",
      practice_manager: "Practice Manager",
      manager: "Manager",
      staff: "Staff",
      read_only: "Read Only",
    },
  },`);

current = current.replace('  accounting: {', `  accounting: {
    locationLabel: "Office",
    locationLabelPlural: "Offices",
    roleLabels: {
      owner: "Managing Partner",
      admin: "Admin",
      practice_manager: "Operations Manager",
      manager: "Manager",
      staff: "Senior Accountant / Staff",
      read_only: "Read Only",
    },`);

current = current.replace('  law: {', `  law: {
    locationLabel: "Branch",
    locationLabelPlural: "Branches",
    roleLabels: {
      owner: "Managing Partner",
      admin: "Admin",
      practice_manager: "Practice Manager",
      manager: "Partner",
      staff: "Associate / Clerk",
      read_only: "Read Only",
    },`);

fs.writeFileSync(basePath + 'lib/mock-data.ts', current);
