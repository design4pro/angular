import { create, Jss } from 'jss';
import plugins from './plugins';

export const jss: Jss = create({
  plugins: plugins(),
});
