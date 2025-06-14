import nx from '@nx/eslint-plugin';
import createConfig from '@chris.araneo/eslint-config';

const jsons = [
  '.vscode/*.json',
  'apps/**/public/**/*.json',
  'apps/**/src/**/*.json',
  'libs/**/*.json',
  '.prettierrc.json',
  '**/angular.json',
  '**/tsconfig.app.json',
  '**/tsconfig.json',
  '**/tsconfig.spec.json',
  '**/tsconfig.editor.json',
];

const angularElementPrefix = 'yata';

const sources = [
  '^apps\\/.*(?<!\\.spec)\\.{ts,mjs,js}$',
  '^libs\\/.*(?<!\\.spec)\\.{ts,mjs,js}$',
];

const tests = ['^apps\\/.*\\.spec\\.ts$', '^libs\\/.*\\.spec\\.ts$'];

const templates = ['apps/**/*.html', 'libs/**/*.html'];

const ignored = [
  '.angular/',
  '.stryker-tmp/',
  '**/dist',
  'node_modules/',
  'reports/',
  'package.json',
  'package-lock.json',
  '.nx/',
];

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...createConfig({
    jsons,
    sources,
    tests,
    templates,
    angularElementPrefix,
    ignored,
  }),
];
