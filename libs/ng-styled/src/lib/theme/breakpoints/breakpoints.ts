import deepmerge from "ts-deepmerge";
import merge from '../../utils/merge';
import { Breakpoints } from './types';

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
export const values: { [key: string]: number } = {
  s: 0,
  m: 700,
  l: 1100,
  x: 1500,
};

const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['s', 'm', 'l', 'x'],
  up: (key: string) => `@media (min-width:${values[key]}px)`,
};

export function handleBreakpoints(
  props: any,
  propValue: number,
  styleFromPropValue: any
) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] =
        styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc: any, breakpoint) => {
      // key is breakpoint
      if (
        Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !==
        -1
      ) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);

  return output;
}

function breakpoints(styleFunction: any) {
  const newStyleFunction = (props: any) => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;

    const extended = themeBreakpoints.keys.reduce((acc: any, key: string) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction({ theme, ...props[key] });
      }
      return acc;
    }, null);

    return merge(base, extended);
  };

  return newStyleFunction;
}

export function createEmptyBreakpointObject(
  breakpointsInput: Partial<Breakpoints> = {}
) {
  const breakpointsInOrder = breakpointsInput?.keys?.reduce(
    (acc: any, key: string) => {
      const up = breakpointsInput?.up;

      if (up) {
        const breakpointStyleKey = up(key);

        if (breakpointStyleKey) {
          acc[breakpointStyleKey] = {};
        }
      }
      return acc;
    },
    {}
  );
  return breakpointsInOrder || {};
}

export function removeUnusedBreakpoints(breakpointKeys: string[], style: any) {
  return breakpointKeys.reduce((acc: any, key: string) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused =
      !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style);
}

export function mergeBreakpointsInOrder(
  breakpointsInput: Partial<Breakpoints>,
  ...styles: any
) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {}
  );
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}

// compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}
export function computeBreakpointsBase(
  breakpointValues: any,
  themeBreakpoints: Breakpoints
) {
  // fixed value
  if (typeof breakpointValues !== 'object') {
    return {};
  }
  const base: any = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}

export default breakpoints;
