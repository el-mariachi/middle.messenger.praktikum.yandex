/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type PlainObject<T = any> = {
  [k in string]: T;
};

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
