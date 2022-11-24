import { Breakpoints } from './types';

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const BREAKPOINTS_KEYS = ['s', 'm', 'l', 'x'];

// Keep in mind that @media is inclusive by the CSS specification.
export function createBreakpoints(breakpointsInput: Breakpoints): Breakpoints {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint s: [s, m[.
    values = {
      s: 0,
      m: 700,
      l: 1100,
      x: 1500,
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpointsInput;

  function up(key: string | number) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: string | number) {
    const endIndex = BREAKPOINTS_KEYS.indexOf(<string>key) + 1;
    const upperbound = values[BREAKPOINTS_KEYS[endIndex]];

    if (endIndex === BREAKPOINTS_KEYS.length) {
      // x down applies to all sizes
      return up('s');
    }

    const value =
      typeof upperbound === 'number' && endIndex > 0 ? upperbound : <number>key;

    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: string | number, end: string | number) {
    const endIndex = BREAKPOINTS_KEYS.indexOf(<string>end);

    if (endIndex === BREAKPOINTS_KEYS.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${
        typeof values[start] === 'number' ? values[start] : <number>start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 &&
        typeof values[BREAKPOINTS_KEYS[endIndex + 1]] === 'number'
          ? values[BREAKPOINTS_KEYS[endIndex + 1]]
          : <number>end) -
        step / 100
      }${unit})`
    );
  }

  function only(key: string | number) {
    return between(key, key);
  }

  function width(key: string) {
    return values[key];
  }

  const defaultBreakpoints = {
    keys: BREAKPOINTS_KEYS,
    values,
    up,
    down,
    between,
    only,
    width,
  };

  return {
    ...defaultBreakpoints,
    ...other,
  };
}

export default createBreakpoints;
