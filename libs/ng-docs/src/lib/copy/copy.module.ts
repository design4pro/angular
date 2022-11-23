import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDocsCopyComponent } from './copy.component';

@NgModule({
  declarations: [NgDocsCopyComponent],
  imports: [CommonModule],
  exports: [NgDocsCopyComponent],
})
export class NgCopyModule {}
