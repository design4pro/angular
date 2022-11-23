import { StaticStyle, Theme } from '@design4pro/ng-styled';

export const COMPONENT_STYLES: StaticStyle = (theme: Theme) => ({
  host: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
});
