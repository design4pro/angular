import createSpacing from './create-spacing';
import { Spacing } from './types';

describe('createSpacing', () => {
  it('should be configurable', () => {
    let spacing: Spacing;
    spacing = createSpacing();
    expect(spacing(1)).toEqual('8px');
    spacing = createSpacing(10);
    expect(spacing(1)).toEqual('10px');
    spacing = createSpacing([0, 8, 16]);
    expect(spacing(2)).toEqual('16px');
    spacing = createSpacing(['0rem', '8rem', '16rem']);
    expect(spacing(2)).toEqual('16rem');
    spacing = createSpacing((factor: number) => factor ** 2);
    expect(spacing(2)).toEqual('4px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing(2)).toEqual('0.5rem');
  });

  it('should support recursion', () => {
    const spacing = createSpacing();
    createSpacing(spacing);
  });

  it('should support a default value when no arguments are provided', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing()).toEqual('8px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing()).toEqual('0.25rem');
  });

  it('should support multiple arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 2)).toEqual('8px 16px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing(1, 2)).toEqual('0.25rem 0.5rem');
  });

  it('should support string arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 'auto')).toEqual('8px auto');
    spacing = createSpacing((factor: number | string) =>
      typeof factor === 'string' ? factor : `${0.25 * factor}rem`
    );
    expect(spacing(1, 'auto', 2, 3)).toEqual('0.25rem auto 0.5rem 0.75rem');
  });
});
