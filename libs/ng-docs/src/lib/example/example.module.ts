import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPolymorphicModule } from '@design4pro/ng-polymorphic';
import { NgDocsCodeComponent } from '../code/code.component';
import { NgDocsCopyComponent } from '../copy/copy.component';
import { NgDocsExampleGetTabsPipe } from './example-get-tabs.pipe';
import { NgDocsExampleComponent } from './example.component';

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    NgPolymorphicModule,
    NgDocsCodeComponent,
    NgDocsCopyComponent,
  ],
  declarations: [NgDocsExampleComponent, NgDocsExampleGetTabsPipe],
  exports: [NgDocsExampleComponent, NgDocsExampleGetTabsPipe],
})
export class NgDocsExampleModule {}
