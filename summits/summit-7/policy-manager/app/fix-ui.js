const fs = require('fs');

const b = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';

function replaceInFile(path, replacer) {
  let content = fs.readFileSync(b + path, 'utf8');
  content = replacer(content);
  fs.writeFileSync(b + path, content);
}

replaceInFile('app/(app)/library/page.tsx', c => {
  c = c.replace('office visibility', '${locationLabel.toLowerCase()} visibility');
  c = c.replace('} = useApp();', '  locationLabel,\n  } = useApp();');
  return c;
});

replaceInFile('app/(app)/dashboard/page.tsx', c => {
  c = c.replace('office bottlenecks', '${locationLabel.toLowerCase()} bottlenecks');
  c = c.replace('} = useApp();', '  locationLabel,\n  } = useApp();');
  return c;
});

replaceInFile('app/(app)/manager/page.tsx', c => {
  c = c.replace('office pressure points', '${locationLabel.toLowerCase()} pressure points');
  c = c.replace('office lead', '${locationLabel.toLowerCase()} lead');
  c = c.replace('office filter', '${locationLabel.toLowerCase()} filter');
  c = c.replace('Office rollout heatmap', '{locationLabel} rollout heatmap');
  c = c.replace('which office is smooth', 'which ${locationLabel.toLowerCase()} is smooth');
  c = c.replace('which office is sticky', 'which ${locationLabel.toLowerCase()} is sticky');
  c = c.replace('} = useApp();', '  locationLabel,\n  } = useApp();');
  // Need to change "Unknown office" in metrics, wait that's in metrics.ts
  return c;
});

replaceInFile('app/(app)/acknowledgments/page.tsx', c => {
  c = c.replace('by office', 'by ${locationLabel.toLowerCase()}');
  c = c.replace('} = useApp();', '  locationLabel,\n  } = useApp();');
  return c;
});

replaceInFile('app/(app)/policy/new/page.tsx', c => {
  c = c.replace('"All offices selected"', '\`All ${locationLabelPlural.toLowerCase()} selected\`');
  c = c.replace('"No offices selected · publish will default to all offices"', '\`No ${locationLabelPlural.toLowerCase()} selected · publish will default to all ${locationLabelPlural.toLowerCase()}\`');
  c = c.replace('office(s) targeted', '${locationLabelPlural.toLowerCase()} targeted');
  c = c.replace('Office targeting', '{locationLabel} targeting');
  c = c.replace('    savePolicy,\n  } = useApp();', '    savePolicy,\n    locationLabel,\n    locationLabelPlural,\n  } = useApp();');
  return c;
});

replaceInFile('app/(app)/policy/[id]/edit/EditPolicyClient.tsx', c => {
  c = c.replace('Office targeting', '{locationLabel} targeting');
  c = c.replace('    savePolicy,\n  } = useApp();', '    savePolicy,\n    locationLabel,\n  } = useApp();');
  return c;
});

replaceInFile('components/policy/PolicyEditorForm.tsx', c => {
  // If it exists
  if(c.includes('office(s)')) {
    c = c.replace('office(s) targeted', '${locationLabelPlural.toLowerCase()} targeted');
    c = c.replace('Office targeting', '{locationLabel} targeting');
    c = c.replace('    savePolicy,\n  } = useApp();', '    savePolicy,\n    locationLabel,\n    locationLabelPlural,\n  } = useApp();');
  }
  return c;
});

replaceInFile('lib/metrics.ts', c => {
  c = c.replace('Unknown office', 'Unknown ${locationLabel.toLowerCase()}');
  // Add locationLabel to getSnapshot parameters
  c = c.replace('clinics: Clinic[],', 'clinics: Clinic[], locationLabel: string,');
  return c;
});

replaceInFile('lib/policy-generator.ts', c => {
  c = c.replace('function selectedOfficeLabel(selectedClinicIds: string[]) {', 'function selectedOfficeLabel(selectedClinicIds: string[], locationLabel: string, locationLabelPlural: string) {');
  c = c.replace('"All offices"', '\`All ${locationLabelPlural.toLowerCase()}\`');
  c = c.replace('"Selected office"', '\`Selected ${locationLabel.toLowerCase()}\`');
  c = c.replace('selected offices', 'selected ${locationLabelPlural.toLowerCase()}');
  c = c.replace('export interface PolicyGenerationInput {\n', 'export interface PolicyGenerationInput {\n  locationLabel: string;\n  locationLabelPlural: string;\n');
  c = c.replace('const officeLabel = selectedOfficeLabel(input.selectedClinicIds);', 'const officeLabel = selectedOfficeLabel(input.selectedClinicIds, input.locationLabel, input.locationLabelPlural);');
  return c;
});
