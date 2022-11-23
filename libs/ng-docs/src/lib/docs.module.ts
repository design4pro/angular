import { NgModule } from '@angular/core';

import { DocsCodeModule } from './code/code.module';
import { DocsDemoModule } from './demo/demo.module';
import { DocsDocumentationModule } from './documentation/documentation.module';
import { DocsExampleModule } from './example/example.module';
import { DocsPageModule } from './page/page.module';

@NgModule({
  exports: [
    DocsCodeModule,
    DocsDemoModule,
    DocsDocumentationModule,
    DocsPageModule,
    DocsExampleModule,
  ],
})
export class DocsModule {}
