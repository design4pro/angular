export interface DocsPageBase {
  readonly section?: string;
  readonly title: string;
}

export interface DocsPage extends DocsPageBase {
  readonly route: string;
  readonly keywords?: string;
}

export interface DocsPageGroup extends DocsPageBase {
  readonly subPages: ReadonlyArray<DocsPage>;
}

export type DocsPages = ReadonlyArray<DocsPage | DocsPageGroup>;

export type RawLoaderContent = Promise<{ default: string }> | string;

export const DOCS_EXAMPLE_PRIMARY_FILE_NAME = {
  TS: 'TypeScript',
  LESS: 'LESS',
  HTML: 'HTML',
} as const;

export type DocsExample =
  | Record<string, RawLoaderContent>
  | {
      [DOCS_EXAMPLE_PRIMARY_FILE_NAME.TS]?: string;
      [DOCS_EXAMPLE_PRIMARY_FILE_NAME.HTML]?: string;
      [DOCS_EXAMPLE_PRIMARY_FILE_NAME.LESS]?: string;
    };
