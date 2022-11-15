type StringIndexed = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is StringIndexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function nestedArrayStringify(outerKey: string, value: any[]): string {
  return value
    .map((item, index) => {
      const nestedKey = `${outerKey}[${index}]`;
      if (isArray(item)) {
        return nestedArrayStringify(nestedKey, item);
      } else if (isPlainObject(value)) {
        return nestedObjectStringify(nestedKey, item);
      } else {
        return `${nestedKey}=${encodeURIComponent(String(item))}`;
      }
    })
    .join('&');
}

function nestedObjectStringify(outerKey: string, item: StringIndexed): string {
  return Object.entries(item)
    .map(([key, value]) => {
      const nestedKey = `${outerKey}[${key}]`;
      if (isArray(value)) {
        return nestedArrayStringify(nestedKey, value);
      } else if (isPlainObject(value)) {
        return nestedObjectStringify(nestedKey, value);
      } else {
        return `${nestedKey}=${encodeURIComponent(String(value))}`;
      }
    })
    .join('&');
}

function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }
  return Object.entries(data)
    .map(([key, value]) => {
      if (isPlainObject(value)) {
        return nestedObjectStringify(key, value);
      } else if (isArray(value)) {
        return nestedArrayStringify(key, value);
      } else {
        return `${key}=${encodeURIComponent(String(value))}`;
      }
    })
    .join('&');
}

export default queryStringify;
