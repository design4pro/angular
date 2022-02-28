import type { StyleSheet } from 'jss';
import type { DynamicRules } from '../types';
import { getMeta } from './sheets-meta';

const getSheetClasses = (
  sheet: StyleSheet,
  dynamicRules: DynamicRules
): Record<string, string> => {
  if (!dynamicRules) {
    return sheet.classes;
  }

  const classes: { [key: string]: string } = {};
  const meta = getMeta(sheet);

  if (!meta) {
    return sheet.classes;
  }

  // eslint-disable-next-line guard-for-in
  for (const key in meta.styles) {
    classes[key] = sheet.classes[key];

    if (key in dynamicRules) {
      classes[key] += ` ${sheet.classes[dynamicRules[key].key]}`;
    }
  }

  return classes;
};

export default getSheetClasses;
