// eslint-disable-next-line @typescript-eslint/no-explicit-any
function weakMemoize(fn: any, resolver?: any) {
  const cache = new WeakMap();
  // instead of returning the function right away, store it in a variable...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memoized = function (...args: any) {
    // eslint-disable-next-line prefer-spread
    const key = resolver ? resolver.apply(null, args) : args[0];

    if (cache.has(key)) {
      return cache.get(key);
    } else {
      // eslint-disable-next-line prefer-spread
      const result = fn.apply(null, args);

      cache.set(key, result);

      return result;
    }
  };
  // add a method to it to get the cache
  memoized.getCache = () => cache;
  // now return the function
  return memoized;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMemo<T = any>(create: () => T, ...args: any): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memoized: any = weakMemoize(create);

  return memoized(args);
}

export default useMemo;
