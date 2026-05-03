const fs = require('fs');
let content = fs.readFileSync('sandbox/policy-manager-V13/app/setup/page.tsx', 'utf8');

const regex = /              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>\n                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Employee action button color<\/div>\n                <button type="button" onClick={\(\) => setOpenPanel\(null\)} style={saveSmallButton}>Save<\/button>\n              <\/div>\n              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>\n                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Action bubble color<\/div>\n                <button type="button" onClick={\(\) => setOpenPanel\(null\)} style={saveSmallButton}>Save<\/button>\n              <\/div>\n/g;

const matchCount = (content.match(regex) || []).length;
console.log(`Found ${matchCount} matches to remove.`);

content = content.replace(regex, '');
fs.writeFileSync('sandbox/policy-manager-V13/app/setup/page.tsx', content, 'utf8');
console.log('Fixed file.');
