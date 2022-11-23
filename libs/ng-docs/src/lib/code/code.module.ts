import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDocsCodeComponent } from './code.component';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [NgDocsCodeComponent],
  imports: [CommonModule, HighlightModule],
  exports: [NgDocsCodeComponent],
})
export class NgDocsCodeModule {}
