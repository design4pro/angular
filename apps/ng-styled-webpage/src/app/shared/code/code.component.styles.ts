import { StaticStyles } from '@design4pro/ng-styled';

// github theme
export const GITHUB_STYLES: StaticStyles = {
  '@global': {
    '@font-face': [
      {
        fontFamily: 'FuturoMono',
        src: 'url(assets/fonts/FuturoMono-Regular.woff)',
        fallbacks: [
          { src: 'url(assets/fonts/FuturoMono-Regular.woff2) format(woff2)' },
        ],
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    ],
    '.hljs': {
      color: '#24292e',
      display: 'block',
      overflowX: 'auto',
      fontFamily: 'FuturoMono',
    },
    '.hljs:not(:empty)': {
      padding: '1.5rem 2rem',
      fontFamily: 'FuturoMono',
      backgroundColor: 'rgba(0,0,0,0.04)',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    '.hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_':
      {
        color: '#d73a49',
      },
    '.hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_':
      {
        color: '#6f42c1',
      },
    '.hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-variable, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id':
      {
        color: '#005cc5',
      },
    '.hljs-regexp, .hljs-string, .hljs-meta .hljs-string': {
      color: '#032f62',
    },
    '.hljs-built_in, .hljs-symbol': {
      color: '#e36209',
    },
    '.hljs-comment, .hljs-code, .hljs-formula': {
      color: '#6a737d',
    },
    '.hljs-name, .hljs-quote, .hljs-selector-tag, .hljs-selector-pseudo': {
      color: '#22863a',
    },
    '.hljs-subst': {
      color: '#24292e',
    },
    '.hljs-section': {
      color: '#005cc5',
      fontWeight: 'bold',
    },
    '.hljs-bullet': {
      color: '#735c0f',
    },
    '.hljs-emphasis': {
      color: '#24292e',
      fontStyle: 'italic',
    },
    '.hljs-strong': {
      color: '#24292e',
      fontWeight: 'bold',
    },
    '.hljs-addition': {
      color: '#22863a',
      backgroundColor: '#f0fff4',
    },
    '.hljs-deletion': {
      color: '#b31d28',
      backgroundColor: '#ffeef0',
    },
    '.hljs-char.escape_, .hljs-link, .hljs-params, .hljs-property, .hljs-punctuation,.hljs-tag':
      {},
  },
};
