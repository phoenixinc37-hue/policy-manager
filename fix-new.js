const fs = require('fs');
const b = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';
let c = fs.readFileSync(b + 'app/(app)/policy/new/page.tsx', 'utf8');

c = c.replace('const generated = generateStructuredPolicyDraft({ ...generatorInput, type: form.type, selectedClinicIds: form.clinicIds });', 'const generated = generateStructuredPolicyDraft({ ...generatorInput, type: form.type, selectedClinicIds: form.clinicIds, locationLabel, locationLabelPlural });');

fs.writeFileSync(b + 'app/(app)/policy/new/page.tsx', c);
