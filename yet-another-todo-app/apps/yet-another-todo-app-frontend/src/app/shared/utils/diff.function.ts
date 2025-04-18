import { isObject } from 'lodash';
import microdiff from 'microdiff';

export function diff(a: unknown, b: unknown): Difference[] {
  const _a = isObject(a) ? a : {};
  const _b = isObject(b) ? b : {};

  return microdiff(_a, _b);
}

interface DifferenceCreate {
  type: 'CREATE';
  path: (string | number)[];
  value: any;
}

interface DifferenceRemove {
  type: 'REMOVE';
  path: (string | number)[];
  oldValue: any;
}

interface DifferenceChange {
  type: 'CHANGE';
  path: (string | number)[];
  value: any;
  oldValue: any;
}

type Difference = DifferenceCreate | DifferenceRemove | DifferenceChange;
