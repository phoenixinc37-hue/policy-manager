const fs = require('fs');
const basePath = '/Users/scottwilde/.openclaw/workspace/summits/summit-7/policy-manager/app/';
let current = fs.readFileSync(basePath + 'components/layout/Sidebar.tsx', 'utf8');

current = current.replace('import { ROLE_LABELS } from "@/types";\n', '');
current = current.replace('    setWorkspaceMode,\n  } = useApp();', `    setWorkspaceMode,\n    roleLabels,\n  } = useApp();`);

current = current.replaceAll('ROLE_LABELS[user.role]', 'roleLabels[user.role]');
current = current.replaceAll('ROLE_LABELS[currentUser.role]', 'roleLabels[currentUser.role]');

fs.writeFileSync(basePath + 'components/layout/Sidebar.tsx', current);
