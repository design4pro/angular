import { StyleSheet } from 'jss';
import { Styles } from '../types';

interface SheetMeta<Data> {
  styles: Styles<Data>;
  dynamicStyles: Styles<Data>;
  dynamicRuleCounter: number;
}

const sheetsMeta = new WeakMap();

export const getMeta = (sheet: StyleSheet) => sheetsMeta.get(sheet);

export const addMeta = <Data>(sheet: StyleSheet, meta: SheetMeta<Data>) => {
  sheetsMeta.set(sheet, meta);
};
