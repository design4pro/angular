import { Injectable } from '@angular/core';
import { CreateGenerateIdOptions, GenerateId, Jss, SheetsRegistry } from 'jss';
import { Store } from '../utils/store';
import { JssManagers } from './types';

export class JssContext {
  /**
   * JSS's instance.
   */
  jss?: Jss;
  /**
   * Collect the sheets.
   */
  registry?: SheetsRegistry;
  /**
   * The menagers is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  managers?: JssManagers;
  id?: CreateGenerateIdOptions;
  /**
   * JSS's class name generator.
   */
  classNamePrefix?: string;
  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server-side - you can significantly speed up the traversal with this prop.
   */
  disableStylesGeneration?: boolean;
  media?: string;
  generateId?: GenerateId;
}

@Injectable()
export class JssStore extends Store<JssContext> {
  private static instance: JssStore;

  constructor() {
    super(new JssContext());
  }

  static getInstance(): JssStore {
    if (!JssStore.instance) {
      JssStore.instance = new JssStore();
    }

    return JssStore.instance;
  }
}
