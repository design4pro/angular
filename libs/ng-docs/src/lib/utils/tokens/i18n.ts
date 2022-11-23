import { InjectionToken } from '@angular/core';

/**
 * Works with a tuple
 * [@string ngDocsMode tooltip content, @string word 'background', @string 'form value']
 */
export const DOCS_DEMO_TEXTS = new InjectionToken<[string, string, string]>(
  'docs-demo i18n texts',
  {
    factory: () => ['Read more more about modes: ', 'Background', 'Form value'],
  }
);

/**
 * Works with a tuple
 * [
 * @string word 'argument',
 * @string word 'type',
 * @string 'name and description',
 * @string word 'value'
 * @string message for tooltip about ng-polymorphic
 * ]
 */
export const DOCS_DOCUMENTATION_TEXTS = new InjectionToken<
  [string, string, string, string, string]
>('docs-documentation i18n texts', {
  factory: () => [
    'Argument',
    'Type',
    'Name and description',
    'Value',
    'Learn about our dynamic templates from ',
  ],
});

/**
 * Works with a tuple
 * [
 * @string default tab name,
 * @string link to a sample copied message text,
 * @string link to a sample copied message label
 * ]
 */
export const DOCS_EXAMPLE_TEXTS = new InjectionToken<
  [string, string, string]
>('docs-example i18n texts', {
  factory: () => [
    'Preview',
    'Link to a sample was successfully copied',
    'Done',
  ],
});

export const DOCS_MENU_TEXT = new InjectionToken<string>('menu i18n text', {
  factory: () => 'Menu',
});

export const DOCS_SEARCH_TEXT = new InjectionToken<string>(
  'search i18n text',
  {
    factory: () => 'Search',
  }
);

export const DOCS_SEE_ALSO_TEXT = new InjectionToken<string>(
  'docs-see-also i18n text',
  {
    factory: () => 'See also',
  }
);

export const DOCS_SOURCE_CODE_TEXT = new InjectionToken<string>(
  'docs-source-code i18n text',
  {
    factory: () => 'Source code',
  }
);

export const DOCS_COPY_TEXTS = new InjectionToken<string>(
  'docs-copy i18n text',
  {
    factory: () => 'Copy',
  }
);
