import createConfig from '@chris.araneo/eslint-config';

const jsons = [
  '.vscode/*.json',
  'apps/**/public/**/*.json',
  'apps/**/assets/**/*.json',
  'apps/**/src/**/*.json',
  'apps/**/tsconfig.json',
  'apps/**/tsconfig.lib.json',
  '.prettierrc.json',
  'angular.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.spec.json',
  'stryker.config.json',
  'nx.json',
];

const sources = ['^apps\/.*\/[^\/]+(?<!\.spec)\.ts$'];

const tests = ['apps/**/*.spec.ts']

const templates = ['apps/**/*.html'];

const ignored = [
  'node_modules/',
  'apps/**/.angular/',
  'apps/**/node_modules/',
  'apps/**/package.json',
  'apps/**/package-lock.json',
  '.stryker-tmp/',
  'dist/',
  'reports/',
  'package.json',
  'package-lock.json',
];

export default createConfig(jsons, sources, tests, templates, ignored);
