import eslint from '@eslint/js';
import jsonc from 'eslint-plugin-jsonc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      unicorn.configs.all,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'yata',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'yata',
          style: 'kebab-case',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      'unicorn/no-null': 'off'
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ['**/*.json'],
    extends: [...jsonc.configs['flat/recommended-with-jsonc']],
    rules: {
      'jsonc/no-comments': 'error',
      'jsonc/sort-keys': 'error',
    },
  },
  {
    ignores: [
      '.nx/workspace-data',
      'node_modules',
      '.git/',
      'reports/',
      '.stryker-tmp/',
      'package.json',
      'package-lock.json',
      'apps/**/package.json',
      'apps/**/package-lock.json',
      'apps/**/node_modules/',
      'apps/**/.angular/',
    ],
  },
);
