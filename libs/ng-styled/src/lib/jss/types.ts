import {
  CreateGenerateIdOptions,
  GenerateId,
  Jss,
  Rule,
  SheetsManager,
  SheetsRegistry,
  StyleSheetFactoryOptions,
} from 'jss';

export interface JssOptions {
  registry: SheetsRegistry;

  /**
   * JSS's instance.
   */
  jss: Jss;
  generateId: GenerateId;
  classNamePrefix: string;

  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server-side - you can significantly speed up the traversal with this prop.
   */
  disableStylesGeneration: boolean;
  media: string;
  id: CreateGenerateIdOptions;
}

export interface JssManagers {
  [key: number]: SheetsManager;
}

export type HookOptions = StyleSheetFactoryOptions & {
  index?: number;
  name?: string;
};

export interface DynamicRules {
  [key: string]: Rule;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticStyle = {};
export type DynamicStyle<Data> = (data: Data) => StaticStyle;

export interface StaticStyles {
  [key: string]: StaticStyle;
}

export type StaticOrDynamicStyles<Data> = {
  [key: string]: StaticStyle | DynamicStyle<Data>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ThemedStyles<Theme, Data = {}> = (theme: Theme) => {
  [key: string]: StaticStyle | DynamicStyle<Data>;
};

export type Styles<Theme> = StaticStyles | ThemedStyles<Theme>;
