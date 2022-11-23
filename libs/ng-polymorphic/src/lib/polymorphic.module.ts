import { NgModule } from '@angular/core';
import { PolymorphicOutletDirective } from './directives/outlet.directive';
import { PolymorphicTemplateDirective } from './directives/template.directive';

@NgModule({
  declarations: [PolymorphicOutletDirective, PolymorphicTemplateDirective],
  exports: [PolymorphicOutletDirective, PolymorphicTemplateDirective],
})
export class PolymorphicModule {}
