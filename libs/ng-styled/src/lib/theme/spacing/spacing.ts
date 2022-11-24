import memoize from '../../utils/memoize';
import merge from '../../utils/merge';
import { getPath } from '../../utils/style';
import { handleBreakpoints } from '../breakpoints';
import { Theme } from '../types';
import { Spacing } from './types';

const properties: { [key: string]: string } = {
  m: 'margin',
  p: 'padding',
};

const directions: { [key: string]: string[] | string } = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const aliases: { [key: string]: string } = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize((prop: string) => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction)
    ? direction.map((dir) => property + dir)
    : [property + direction];
});

const marginKeys = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
];

const paddingKeys = [
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
];

const spacingKeys = [...marginKeys, ...paddingKeys];

export function createUnaryUnit(
  theme: Partial<Theme>,
  themeKey: string,
  defaultValue: number
) {
  const themeSpacing = getPath(theme, themeKey) || defaultValue;

  if (typeof themeSpacing === 'number') {
    return (abs: number) => {
      if (typeof abs === 'string') {
        return abs;
      }

      return themeSpacing * abs;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return (abs: number) => {
      if (typeof abs === 'string') {
        return abs;
      }

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  return () => undefined;
}

export function createUnarySpacing(theme: Partial<Theme>) {
  return createUnaryUnit(theme, 'spacing', 8);
}

export function getValue(
  transformer: (data: any) => number,
  propValue: number
) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}

export function getStyleFromPropValue(
  cssProperties: string[],
  transformer: any
) {
  return (propValue: number) =>
    cssProperties.reduce((acc: any, cssProperty) => {
      acc[cssProperty] = getValue(transformer, propValue);
      return acc;
    }, {});
}

function resolveCssProperty(
  props: any,
  keys: string[],
  prop: string,
  transformer: any
) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

function style(props: any, keys: string[]): Spacing {
  const transformer = createUnarySpacing(props.theme);

  return Object.keys(props)
    .map((prop) => resolveCssProperty(props, keys, prop, transformer))
    .reduce(merge, {});
}

export function margin(props: any): Spacing {
  return style(props, marginKeys);
}

export function padding(props: any): Spacing {
  return style(props, paddingKeys);
}

function spacing(props: any): Spacing {
  return style(props, spacingKeys);
}

export default spacing;
