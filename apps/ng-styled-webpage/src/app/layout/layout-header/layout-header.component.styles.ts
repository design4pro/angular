import { StaticStyle, Theme } from '@design4pro/ng-styled';

export const COMPONENT_STYLES: StaticStyle = (theme: Theme) => ({
  host: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    '& h1': {
      ...theme.typography.h4,
      margin: theme.spacing(0, 1),
      '& span': {
        ...theme.typography.subtitle2,
      },
    },
  },
});
