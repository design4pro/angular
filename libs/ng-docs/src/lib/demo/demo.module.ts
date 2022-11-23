import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgDocsDemoComponent } from './demo.component';

@NgModule({
  declarations: [NgDocsDemoComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [NgDocsDemoComponent],
})
export class NgDocsDemoModule {}
