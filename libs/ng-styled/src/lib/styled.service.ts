import { Injectable } from '@angular/core';
import { createGenerateId, SheetsRegistry } from 'jss';
import { JssContext, JssStore } from './jss/context';
import { manageSheet } from './jss/managers';
import { JssManagers, StaticStyles } from './jss/types';
import getSheetIndex from './jss/utils/get-sheet-index';
import { createStyleSheet } from './jss/utils/sheets';
import { StyledOptions, StyledTheme } from './styled.options';
import normalize from './styles/normalize';
import { ThemeContext, ThemeStore } from './theme/theme-context';
import shallowEqualObjects from './utils/shallow-equal-objects';

/**
 * Initialize service (used in shared module `forRoot` to initialize before app init).
 *
 * @export
 * @param {StyledService} provider
 * @returns
 */
export function styledFactory(provider: StyledService) {
  return () => provider.init();
}

@Injectable()
export class StyledService {
  private static store: JssStore = JssStore.getInstance();
  private static theme: ThemeStore = ThemeStore.getInstance();

  private registry?: SheetsRegistry;

  private initialContext: JssContext = {
    classNamePrefix: '',
    disableStylesGeneration: false,
  };

  private managers: JssManagers = {};

  private prevContext?: JssContext;

  constructor(private options: StyledOptions, private theme: StyledTheme) {}

  static sheetRegistry(): SheetsRegistry | undefined {
    return StyledService.store.state.registry;
  }

  attach(styles: StaticStyles, name = 'default') {
    const context = StyledService.store.state;
    const theme = StyledService.theme.state;
    const index = getSheetIndex();

    const newSheet = createStyleSheet({
      context,
      theme,
      name,
      index,
      styles,
      sheetOptions: this.options,
    });

    if (newSheet) {
      manageSheet<ThemeContext>({
        index,
        context,
        sheet: newSheet,
        theme,
      });
    }
  }

  init() {
    StyledService.theme.setState(this.theme);
    this.context(this.options);

    // attach normalize styles on init
    if (this.options.normalize) {
      this.attach(normalize(), 'normalize');
    }
  }

  createContext(
    parentContext: JssContext,
    prevContext: JssContext = this.initialContext
  ) {
    const context = { ...parentContext };

    if (this.options.registry) {
      context.registry = this.options.registry;

      // This way we identify a new request on the server, because user will create
      // a new Registry instance for each.
      if (this.options.registry !== this.registry) {
        // We reset managers because we have to regenerate all sheets for the new request.
        this.managers = {};
        this.registry = this.options.registry;
      }
    }

    context.managers = this.managers;

    if (this.options.id !== undefined) {
      context.id = this.options.id;
    }

    if (!context.generateId || !prevContext || context.id !== prevContext.id) {
      context.generateId = createGenerateId(context.id);
    }

    if (this.options.classNamePrefix) {
      context.classNamePrefix += this.options.classNamePrefix;
    }

    if (this.options.media !== undefined) {
      context.media = this.options.media;
    }

    if (this.options.jss) {
      context.jss = this.options.jss;
    }

    if (this.options.disableStylesGeneration !== undefined) {
      context.disableStylesGeneration = this.options.disableStylesGeneration;
    }

    if (prevContext && shallowEqualObjects(prevContext, context)) {
      return prevContext;
    }

    return context;
  }

  context(parentContext: JssContext): JssStore {
    const context: JssContext = this.createContext(
      parentContext,
      this.prevContext
    );
    this.prevContext = context;

    StyledService.store.setState(context);

    return StyledService.store;
  }
}
