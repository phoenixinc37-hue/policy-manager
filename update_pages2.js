const fs = require('fs');
const path = require('path');

function injectHook(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('const { config, isLoaded } = useSiteConfig();')) {
    // find 'export default function X('
    const funcMatch = content.match(/export default function [\w]+\([^)]*\) \{/);
    if (funcMatch) {
      content = content.replace(
        funcMatch[0],
        `${funcMatch[0]}\n  const { config, isLoaded } = useSiteConfig();\n  if (!isLoaded) return null;\n`
      );
      fs.writeFileSync(filePath, content);
      console.log(`Injected into ${filePath}`);
    } else {
      console.log(`Could not find export default function in ${filePath}`);
    }
  }
}

injectHook(path.join(__dirname, 'app/teamview/page.tsx'));
injectHook(path.join(__dirname, 'app/manager/page.tsx'));
