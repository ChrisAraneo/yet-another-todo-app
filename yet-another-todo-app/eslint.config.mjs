import tslint from 'typescript-eslint';
import config from '@chris.araneo/eslint-config';

export default tslint.config({
  extends: [config],
  ignores: [
    'apps/**/package.json',
    'apps/yet-another-todo-app-mock/assets/store.json',
  ],
});
