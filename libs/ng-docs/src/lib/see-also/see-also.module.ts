import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeeAlsoComponent } from './see-also.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SeeAlsoComponent],
  exports: [SeeAlsoComponent],
})
export class NgDocsSeeAlsoModule {}
