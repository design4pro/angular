import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgDocsNavigationModule } from '../navigation/navigation.module';
import { NgDocsMainComponent } from './main.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgDocsNavigationModule],
  declarations: [NgDocsMainComponent],
  exports: [NgDocsMainComponent],
})
export class MainModule {}
