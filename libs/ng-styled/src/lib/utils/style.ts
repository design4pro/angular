import { handleBreakpoints } from '../theme/breakpoints';
import capitalize from './capitalize';

export function getPath(obj: any, path: string) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path
    .split('.')
    .reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

function getValue(
  themeMapping: any,
  transform: any,
  propValueFinal: any,
  userValue = propValueFinal
) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value);
  }

  return value;
}

function style(options: any) {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  const fn = (props: any) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal: string) => {
      let value = getValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(
          themeMapping,
          transform,
          `${prop}${
            propValueFinal === 'default' ? '' : capitalize(propValueFinal)
          }`,
          propValueFinal
        );
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  return fn;
}

export default style;
