import { Plugin } from 'jss';
import global from 'jss-plugin-global';
import functions from 'jss-plugin-rule-value-function';
import camelCase from 'jss-plugin-camel-case';

export default (): Plugin[] => [functions(), global(), camelCase()];
