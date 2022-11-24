import { Classes } from 'jss';

function mergeClasses(baseClasses: Classes, additionalClasses: Classes) {
  const combinedClasses = { ...baseClasses };

  // eslint-disable-next-line guard-for-in
  for (const name in additionalClasses) {
    combinedClasses[name] =
      name in combinedClasses
        ? `${combinedClasses[name]} ${additionalClasses[name]}`
        : additionalClasses[name];
  }

  return combinedClasses;
}

export default mergeClasses;
