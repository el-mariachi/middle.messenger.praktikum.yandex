import merge, { Indexed } from './merge';

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('Path must be a string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  return merge(object as Indexed, result);
}

export default set;
