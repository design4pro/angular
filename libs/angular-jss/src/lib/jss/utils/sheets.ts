import { getDynamicStyles, StyleSheet, StyleSheetFactoryOptions } from 'jss';
import { Theme } from '../../angular-jss.types';
import { StyledProps } from '../../styled/styled.interface';
import { ThemeContext } from '../../theme/theme-context';
import { JssContext } from '../context';
import { getManager } from '../managers';
import { jss as defaultJss } from '../setup';
import { DynamicRules, Styles } from '../types';
import { addMeta, getMeta } from './sheets-meta';

declare module 'jss' {
  interface StyleSheet {
    rules: RuleList;
  }

  interface RuleList {
    index: Array<Rule>;
  }
}

interface Options<Context, Theme> {
  context: Context;
  theme: Theme;
  name?: string;
  index: number;
  styles: Styles<Theme>;
  sheetOptions: StyleSheetFactoryOptions;
}

export const getStyles = (options: Options<JssContext, ThemeContext>) => {
  const { styles } = options;

  if (typeof styles !== 'function') {
    return styles;
  }

  if (styles.length !== 0) {
    console.warn(
      `[JSS] <${
        options.name || 'Hook'
      } />'s styles function doesn't rely on the "theme" argument. We recommend declaring styles as an object instead.`
    );
  }

  return styles(options.theme);
};

export function getSheetOptions(
  options: Options<JssContext, ThemeContext>,
  link: boolean
) {
  let minify;

  if (options.context.id && options.context.id.minify != null) {
    minify = options.context.id.minify;
  }

  let classNamePrefix = options.context.classNamePrefix || '';
  if (options.name && !minify) {
    classNamePrefix += `${options.name.replace(/\s/g, '-')}-`;
  }

  let meta = '';
  if (options.name) meta = `${options.name}, `;
  meta += typeof options.styles === 'function' ? 'Themed' : 'Unthemed';

  return {
    ...options.sheetOptions,
    index: options.index,
    meta,
    classNamePrefix,
    link,
    generateId: options.context.generateId,
  };
}

export const createStyleSheet = (
  options: Options<JssContext, ThemeContext>
) => {
  if (options.context.disableStylesGeneration) {
    return undefined;
  }

  const manager = getManager(options.context, options.index);
  const existingSheet = manager.get(options.theme);

  if (existingSheet) {
    return existingSheet;
  }

  const jss = options.context.jss || defaultJss;
  const styles = getStyles(options);
  const dynamicStyles = getDynamicStyles(styles) as Styles<Theme>;

  const sheet = jss.createStyleSheet(
    styles,
    getSheetOptions(options, dynamicStyles !== null)
  );

  addMeta(sheet, {
    dynamicStyles,
    styles,
    dynamicRuleCounter: 0,
  });

  manager.add(options.theme, sheet);

  return sheet;
};

export const removeDynamicRules = (sheet: StyleSheet, rules: DynamicRules) => {
  // Loop over each dynamic rule and remove the dynamic rule
  // We can't just remove the whole sheet as this has all of the rules for every component instance
  // eslint-disable-next-line guard-for-in
  for (const key in rules) {
    sheet.deleteRule(rules[key].key);
  }
};

export const updateDynamicRules = (
  data: StyledProps,
  sheet: StyleSheet,
  rules: DynamicRules
) => {
  if (rules && Object.keys(rules).length) {
    // Loop over each dynamic rule and update it
    // We can't just update the whole sheet as this has all of the rules for every component instance
    // eslint-disable-next-line guard-for-in
    for (const key in rules) {
      sheet.update(rules[key].key, data);
    }
  } else {
    sheet.update(data);
  }
};

export const addDynamicRules = (
  sheet: StyleSheet,
  data: StyledProps
): DynamicRules | undefined => {
  const meta = getMeta(sheet);

  if (!meta) {
    return undefined;
  }

  const rules: DynamicRules = {};

  // Loop over each dynamic rule and add it to the stylesheet
  // eslint-disable-next-line guard-for-in
  for (const key in meta.dynamicStyles) {
    const name = `${key}-${meta.dynamicRuleCounter++}`;
    const initialRuleCount = sheet.rules.index.length;

    const originalRule = sheet.addRule(name, meta.dynamicStyles[key]);

    // Loop through all created rules, fixes updating dynamic rules
    for (let i = initialRuleCount; i < sheet.rules.index.length; i++) {
      const rule = sheet.rules.index[i];

      sheet.update(rule.key, data);

      // If it's the original rule, we need to add it by the correct key so the hook and hoc
      // can correctly concat the dynamic class with the static one
      rules[originalRule === rule ? key : rule.key] = rule;
    }
  }

  return rules;
};
