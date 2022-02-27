import { Theme } from '../angular-jss.types';

export function isPlainObject(item: Theme) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export default function deepmerge(
  target: Theme,
  source: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    direction?: string | undefined;
    overrides?: object | undefined;
    props?: object | undefined;
  },
  options = { clone: true }
): Theme {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        output[key] = deepmerge((<any>target)[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}
