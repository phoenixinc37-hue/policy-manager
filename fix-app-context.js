const fs = require('fs');

const basePath = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';
let current = fs.readFileSync(basePath + 'lib/app-context.tsx', 'utf8');

current = current.replace('  moduleHighlights: string[];', `  moduleHighlights: string[];
  locationLabel: string;
  locationLabelPlural: string;
  roleLabels: Record<string, string>;`);

current = current.replace('      moduleHighlights: preset.moduleHighlights,', `      moduleHighlights: preset.moduleHighlights,
      locationLabel: preset.locationLabel,
      locationLabelPlural: preset.locationLabelPlural,
      roleLabels: preset.roleLabels,`);

fs.writeFileSync(basePath + 'lib/app-context.tsx', current);
