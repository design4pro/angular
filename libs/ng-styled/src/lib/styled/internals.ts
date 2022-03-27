import { BehaviorSubject, Subject } from 'rxjs';
import useTheme from '../hooks/use-theme';
import { Styles } from '../jss/types';
import { Theme } from '../theme';
import { ThemeContext } from '../theme/theme-context';
import createUseStyles from './create-use-styles';
import {
  ComponentDef,
  ComponentType,
  DirectiveDef,
  DirectiveType,
} from './ivy';
import { StyledProps } from './styled.types';

/**
 * Applied to definitions and informs that class is decorated
 */
const DECORATOR_APPLIED: unique symbol = Symbol('__styledDecoratorApplied');

export const STYLED_PROPS = '__styled__props__';

export function missingDecorator<T>(
  providerOrDef: ComponentDef<T> | DirectiveDef<T>
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !(providerOrDef as any)[DECORATOR_APPLIED];
}

export function markAsDecorated<T>(
  type: DirectiveType<T> | ComponentType<T>
): void {
  // Store this property on the prototype if it's an injectable class, component or directive.
  // We will be able to handle class extension this way.
  type.prototype[DECORATOR_APPLIED] = true;
}

export function generateStyles(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: any,
  styleFn: StyledProps,
  doCheck: BehaviorSubject<StyledProps>,
  onDestroy: Subject<void>
) {
  const theme = useTheme();
  const css = createUseStyles(doCheck, onDestroy);

  /**
   * Function to inject global styles
   *
   * @param   {Styles<Theme>}  styles        - Styles to inject
   *
   * @return  {Theme}                      - Injected styles
   */
  const injectGlobal = (styles: Styles<Theme>): Theme => {
    let newStyles: Styles<Theme> = {};

    if (!(<never>styles)['@global']) {
      newStyles = {
        '@global': styles,
      };
    } else {
      newStyles = styles;
    }

    return css(newStyles as Styles<ThemeContext>)({
      ...this[STYLED_PROPS],
      theme,
    });
  };

  const useStyles = styleFn({
    css,
    injectGlobal,
  });

  if (useStyles) {
    this.classes = useStyles({ ...this[STYLED_PROPS], theme });
  }
}
