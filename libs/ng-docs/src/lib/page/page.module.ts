import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgDocsSeeAlsoModule } from '../see-also/see-also.module';
import { NgDocsSourceCodeModule } from '../source-code/source-code.module';
import { NgDocsPageTabDirective } from './page-tab.directive';
import { NgDocsPageComponent } from './page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgDocsSeeAlsoModule,
    NgDocsSourceCodeModule,
  ],
  declarations: [NgDocsPageComponent, NgDocsPageTabDirective],
  exports: [NgDocsPageComponent, NgDocsPageTabDirective],
})
export class NgDocsPageModule {}
