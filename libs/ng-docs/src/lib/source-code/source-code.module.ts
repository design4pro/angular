import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SourceCodeComponent } from './source-code.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SourceCodeComponent],
  exports: [SourceCodeComponent],
})
export class NgDocsSourceCodeModule {}
