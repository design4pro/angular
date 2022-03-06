import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useJss } from '../hooks/use-jss';
import { useMemo } from '../hooks/use-memo';
import { useTheme } from '../hooks/use-theme';
import { JssContext } from '../jss/context';
import { manageSheet, unmanageSheet } from '../jss/managers';
import { HookOptions, Styles } from '../jss/types';
import getSheetClasses from '../jss/utils/get-sheet-classes';
import getSheetIndex from '../jss/utils/get-sheet-index';
import {
  addDynamicRules,
  createStyleSheet,
  removeDynamicRules,
  updateDynamicRules,
} from '../jss/utils/sheets';
import { ThemeContext } from '../theme/theme-context';
import { StyledProps } from './styled.types';

const createUseStyles =
  (doCheck: BehaviorSubject<StyledProps>, onDestroy: Subject<void>) =>
  (styles: Styles<ThemeContext>, options: HookOptions = {}) => {
    const { index = getSheetIndex(), name, ...sheetOptions } = options;

    return (data: StyledProps): Record<string, string> => {
      const context: JssContext = useJss();
      const theme: ThemeContext = useTheme();
      let isFirstMount = true;

      const [sheet, dynamicRules] = useMemo(
        () => {
          const newSheet = createStyleSheet({
            context,
            theme,
            name,
            index,
            styles,
            sheetOptions,
          });

          const newDynamicRules = newSheet
            ? addDynamicRules(newSheet, data)
            : null;

          if (newSheet) {
            manageSheet<ThemeContext>({
              index,
              context,
              sheet: newSheet,
              theme,
            });
          }

          return [newSheet, newDynamicRules];
        },
        context,
        theme
      );

      // update
      doCheck.pipe(takeUntil(onDestroy)).subscribe((props) => {
        if (sheet && dynamicRules && !isFirstMount) {
          updateDynamicRules(props, sheet, dynamicRules);
        }
      });

      // on destroy
      const onDestroySubscribe = onDestroy.subscribe(() => {
        if (sheet) {
          unmanageSheet({
            index,
            context,
            sheet,
            theme,
          });

          if (dynamicRules) {
            removeDynamicRules(sheet, dynamicRules);
          }
        }

        onDestroySubscribe.unsubscribe();
      });

      const classes =
        sheet && dynamicRules ? getSheetClasses(sheet, dynamicRules) : {};

      isFirstMount = false;

      return classes;
    };
  };

export default createUseStyles;
