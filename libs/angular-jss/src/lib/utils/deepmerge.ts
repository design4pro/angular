/* eslint-disable @typescript-eslint/no-explicit-any */
function isObject<T>(o: T) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function isPlainObject<T>(o: T) {
  if (isObject(o) === false) return false;

  // If has modified constructor
  const ctor = (<any>o).constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

export default function deepmerge<T = unknown, S = unknown>(
  target: T,
  source: S,
  options = { clone: true }
): T {
  const output: any = options.clone ? { ...target } : target;

  if (isPlainObject<T>(target) && isPlainObject<S>(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject<T>((<any>source)[key]) && key in target) {
        output[key] = deepmerge(
          (<any>target)[key],
          (<any>source)[key],
          options
        );
      } else {
        output[key] = (<any>source)[key];
      }
    });
  }

  return output;
}
