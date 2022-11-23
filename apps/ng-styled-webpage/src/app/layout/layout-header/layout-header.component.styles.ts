import { StaticStyle, Theme } from '@design4pro/ng-styled';

export const COMPONENT_STYLES: StaticStyle = (theme: Theme) => ({
  host: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    height: theme.spacing(10),
    width: '100%',
    boxShadow: '0px 4px 10px rgb(0 0 0 / 5%)',
    borderBottom: '1px solid #d3dce4',
    '& h1': {
      ...theme.typography.h4,
      margin: theme.spacing(0, 1),
      '& span': {
        ...theme.typography.subtitle2,
      },
    },
  },
});
