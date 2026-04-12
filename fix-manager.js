const fs = require('fs');

const b = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';

let c = fs.readFileSync(b + 'app/(app)/manager/page.tsx', 'utf8');
c = c.replace('const snapshot = getManagerSnapshot(policies, acknowledgments, clinics, users);', 'const snapshot = getManagerSnapshot(policies, acknowledgments, clinics, locationLabel, users);');
fs.writeFileSync(b + 'app/(app)/manager/page.tsx', c);
