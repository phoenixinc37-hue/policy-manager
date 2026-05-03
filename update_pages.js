const fs = require('fs');
const path = require('path');

function updatePage(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('useSiteConfig')) {
    content = '"use client";\n\nimport { useSiteConfig } from "../site-config";\n' + content;
    // Fix imports if it's app/page.tsx
    if (filePath.endsWith('app/page.tsx')) {
        content = content.replace('import { useSiteConfig } from "../site-config";', 'import { useSiteConfig } from "./site-config";');
    }
  }

  // Inject the hook
  const funcMatch = content.match(/export default function \w+\(\) \{/);
  if (funcMatch && !content.includes('const { config, isLoaded } = useSiteConfig();')) {
    content = content.replace(
      funcMatch[0],
      `${funcMatch[0]}\n  const { config, isLoaded } = useSiteConfig();\n  if (!isLoaded) return null;\n`
    );
  }

  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }

  fs.writeFileSync(filePath, content);
}

// 1. app/page.tsx
updatePage(path.join(__dirname, 'app/page.tsx'), [
  ['Accounting Firm Demo', '{config.companyName}'],
  ['ACCOUNTING FIRM DEMO', '{config.companyName.toUpperCase()}'],
  ['Leadership View', '{config.leadershipLabel} View'],
  ['Team View', '{config.teamLabel} View'],
  ['Open Leadership Demo', 'Open {config.leadershipLabel} Demo'],
  ['Open Team Demo', 'Open {config.teamLabel} Demo'],
  ['Keep policies, SOGs, and memos visible', 'Keep {config.policyLabel.toLowerCase()}s, {config.sogLabel}s, and {config.memoLabel.toLowerCase()}s visible'],
  ['Create and assign policies, SOGs, and memos.', 'Create and assign {config.policyLabel.toLowerCase()}s, {config.sogLabel}s, and {config.memoLabel.toLowerCase()}s.'],
  ['Track what is still circulating', 'Track what is still {config.circulateLabel.toLowerCase()}'],
  ['Access all firm policies', 'Access all firm {config.policyLabel.toLowerCase()}s'],
  ['Leadership Dashboard', '{config.leadershipLabel} Dashboard'],
  ['What leadership sees', 'What {config.leadershipLabel.toLowerCase()} sees'],
  ['Policy - Client File', '{config.policyLabel} - Client File'],
  ['SOG - Month End', '{config.sogLabel} - Month End'],
  ['Circulating means deployed', '{config.circulateLabel} means deployed'],
  ['Team Dashboard', '{config.teamLabel} Dashboard'],
  ['Individual team members', 'Individual {config.teamLabel.toLowerCase()} members']
]);

// 2. app/manager/page.tsx
updatePage(path.join(__dirname, 'app/manager/page.tsx'), [
  ['Accounting Firm Demo', '{config.companyName}'],
  ['Leadership View', '{config.leadershipLabel} View'],
  ['Team View', '{config.teamLabel} View'],
  ['Create new policy, SOG, or memo', 'Create new {config.policyLabel.toLowerCase()}, {config.sogLabel.toLowerCase()}, or {config.memoLabel.toLowerCase()}'],
  ['Circulating documents', '{config.circulateLabel} documents'],
  ['View circulation', 'View {config.circulateLabel.toLowerCase()}'],
  ['View circulating', 'View {config.circulateLabel.toLowerCase()}']
]);

// 3. app/teamview/page.tsx
updatePage(path.join(__dirname, 'app/teamview/page.tsx'), [
  ['Accounting Firm Demo', '{config.companyName}'],
  ['Leadership View', '{config.leadershipLabel} View'],
  ['Team View', '{config.teamLabel} View'],
  ['My policies', 'My {config.policyLabel.toLowerCase()}s'],
  ['Pending policies', 'Pending {config.policyLabel.toLowerCase()}s'],
  ['Circulating', '{config.circulateLabel}']
]);

console.log("Pages updated!");
