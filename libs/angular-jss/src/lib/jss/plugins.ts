import { Plugin } from 'jss';
import global from 'jss-plugin-global';
import functions from 'jss-plugin-rule-value-function';

export default (): Plugin[] => [functions(), global()];
