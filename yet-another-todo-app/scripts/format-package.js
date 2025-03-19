/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const { normalize } = require('node:path');
const { exec } = require('node:child_process');
const { sortPatternsFile } = require('./sort-patterns-file');
const { print } = require('./print');
const packageJson = require('../package.json');

const APPS_PATH = normalize(`${__filename}/../../apps/`);

const JSON_FILES = ['tsconfig.lib.json', 'tsconfig.json', 'package.json'];

const SOURCE_FILES = ['*.{ts,js,mjs,cjs}', 'src/**/*.ts'];

async function formatPackage(package) {
  const prettierVersion = packageJson.devDependencies.prettier;
  const sortPackageJsonVersion =
    packageJson.devDependencies['sort-package-json'];

  const directory = normalize(`${APPS_PATH}${package}`);

  const patterns =
    `${[...JSON_FILES, ...SOURCE_FILES].map((pattern) => `"${normalize(directory + '/' + pattern)}"`).join(' ')}`.trimEnd();

  const sortPackageJsonCommand = `npx sort-package-json@${sortPackageJsonVersion} "./apps/${package}/package.json"`;
  const prettierCommand = `npx prettier@${prettierVersion} --write ${patterns}`;
  const command = `${sortPackageJsonCommand} && ${prettierCommand}`;

  exec(command, (error, stdout, stderr) => print(error, stdout, stderr));

  sortPatternsFile(normalize(`${directory}/.prettierignore`));
  sortPatternsFile(normalize(`${directory}/.gitignore`));
}

async function main() {
  let apps = [];

  process.argv.forEach(function (value, index) {
    if (index >= 2) {
      apps.push(value);
    }
  });

  if (!apps.length) {
    return;
  }

  apps.forEach((app) => formatPackage(app));
}

main();

module.exports = {
  formatPackage: formatPackage,
};
