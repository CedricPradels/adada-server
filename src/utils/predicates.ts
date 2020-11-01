import { DateTime } from 'luxon';

export type ReturnType<original extends Function> = original extends (
  ...a: any[]
) => infer returnType
  ? returnType
  : never;

export const isUndefined = (x: unknown): x is undefined =>
  typeof x === 'undefined';

export const isString = (x: unknown): x is string => typeof x === 'string';

export const isArray = (x: unknown): x is Array<any> => Array.isArray(x);

export const isNumber = (x: unknown): x is number => typeof x === 'number';

export const isNull = (x: unknown): x is null => x === null;

export const isISODate = (x: string) =>
  DateTime.fromFormat(x, 'yyyy-MM-dd').isValid;
