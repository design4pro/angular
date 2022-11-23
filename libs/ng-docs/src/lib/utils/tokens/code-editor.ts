import { InjectionToken } from '@angular/core';
import { CodeEditor } from '../types/code-editor';

export const DOCS_CODE_EDITOR = new InjectionToken<CodeEditor>(
  'Contains service for opening online IDE e.g. Stackblitz'
);
