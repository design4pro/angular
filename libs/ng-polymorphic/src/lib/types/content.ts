import { TemplateRef } from '@angular/core';
import { PolymorphicComponent } from '../classes/component';
import { PolymorphicTemplateDirective } from '../directives/template.directive';
import { PolymorphicHandler } from './handler';
import { PolymorphicPrimitive } from './primitive';

/**
 * All content types supported by {@link PolymorphicOutletDirective}
 */
export type PolymorphicContent<C extends object = Record<string, unknown>> =
  | TemplateRef<C>
  | PolymorphicTemplateDirective<C>
  | PolymorphicComponent<object, C>
  | PolymorphicHandler<C>
  | PolymorphicPrimitive;
