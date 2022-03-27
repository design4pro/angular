import { createUnarySpacing } from '../spacing';
import { Spacing, SpacingOptions } from './types';

export function createSpacing(spacingInput: SpacingOptions = 8): Spacing {
  // Already transformed.
  if ((spacingInput as any).transformed) {
    return spacingInput as Spacing;
  }

  const transform = createUnarySpacing({
    spacing: spacingInput as Spacing,
  });

  const spacing = (...argsInput: ReadonlyArray<number | string>): string => {
    if (!(argsInput.length <= 4)) {
      console.error(
        `Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`
      );
    }

    const args = argsInput.length === 0 ? [1] : argsInput;

    return args
      .map((argument) => {
        const output = transform(argument);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };

  spacing.transformed = true;

  return spacing;
}

export default createSpacing;
