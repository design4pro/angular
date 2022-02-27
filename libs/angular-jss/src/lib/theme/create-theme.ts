import { Theme, ThemeBreakpoints } from '../angular-jss.types';
import deepmerge from '../utils/deepmerge';
import createBreakpoints from './create-breakpoints';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTheme(options: Theme = {}, ...args: any): Theme {
  const { breakpoints: input = {}, ...other } = options;

  const _breakpoints = createBreakpoints(input as ThemeBreakpoints);

  let theme = deepmerge(
    {
      breakpoints: _breakpoints,
      direction: 'ltr',
      overrides: {}, // Inject custom styles
      props: {}, // Provide default props
    },
    other
  );

  theme = args.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: Theme, argument: any) => deepmerge(acc, argument),
    theme
  );

  return theme;
}

export default createTheme;
