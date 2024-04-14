/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const filename = 'theme-config.json';
const source = path.normalize(`${__dirname}/${filename}`);
const destination = path.normalize(`${__dirname}/../dist/${filename}`);

try {
  fs.copyFileSync(source, destination);
  console.log(`${filename} was copied to ${destination}`);
} catch (e) {
  console.error(e);
}
