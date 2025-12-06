import { cloneDeep as lodashCloneDeep } from 'lodash';

export function cloneDeep<T>(value: T): T {
  return lodashCloneDeep<T>(value);
}
