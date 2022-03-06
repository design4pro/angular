import { Theme } from '../angular-jss.types';
import { HookOptions, Styles } from '../jss/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyledProps = (context: StyledContext) => any;

export interface StyledContext {
  css: (
    styles: Styles<Theme>,
    options?: HookOptions
  ) => (data: StyledProps) => unknown;
  injectGlobal: (styles: Styles<Theme>) => void;
}
