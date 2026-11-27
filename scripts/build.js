const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const packageInfo = require(path.join(root, 'package.json'));

fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(path.join(root, 'src', 'index.js'), path.join(output, 'index.js'));
fs.writeFileSync(
  path.join(output, 'manifest.json'),
  JSON.stringify(
    {
      name: packageInfo.name,
      version: packageInfo.version,
      commit: process.env.GITHUB_SHA || 'local'
    },
    null,
    2
  ) + '\n'
);

console.log(`Build concluído em ${output}`);
