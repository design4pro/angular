/* eslint-disable @typescript-eslint/no-explicit-any */
export default function memoize(fn: any) {
  const cache: any = {};

  return (arg: any) => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}
