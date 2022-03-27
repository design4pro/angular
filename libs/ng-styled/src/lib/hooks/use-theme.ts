import { ThemeContext, ThemeStore } from '../theme/theme-context';

export function useTheme(): ThemeContext {
  return ThemeStore.getInstance().state;
}

export default useTheme;
