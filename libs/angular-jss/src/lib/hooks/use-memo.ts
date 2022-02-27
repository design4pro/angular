import memoizeOne from 'memoize-one';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMemo<T = any>(create: () => T, ...args: any): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memoized: any = memoizeOne(create);

  return memoized(args);
}

export default useMemo;