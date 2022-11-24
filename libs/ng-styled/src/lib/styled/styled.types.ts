import { HookOptions, Styles } from '../jss/types';
import { Theme } from '../theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyledProps = (context: StyledContext) => any;

export interface StyledContext {
  css: (
    styles: Styles<Partial<Theme>>,
    options?: HookOptions
  ) => (data: StyledProps) => unknown;
  injectGlobal: (styles: Styles<Partial<Theme>>) => void;
}
