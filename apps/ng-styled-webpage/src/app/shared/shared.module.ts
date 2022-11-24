import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { CodeComponent } from './code/code.component';

@NgModule({
  declarations: [CodeComponent],
  imports: [CommonModule, HighlightModule],
  exports: [CodeComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        coreLibraryLoader: () =>
          import(
            /* webpackChunkName: "highlight-core" */
            /* webpackPrefetch: true */
            'highlight.js/lib/core'
          ),
        languages: {
          typescript: () =>
            import(
              /* webpackChunkName: "highlight-typescript" */
              /* webpackPrefetch: true */
              'highlight.js/lib/languages/typescript'
            ),
        },
      },
    },
  ],
})
export class SharedModule {}
