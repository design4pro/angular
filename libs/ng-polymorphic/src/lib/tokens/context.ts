import { InjectionToken } from '@angular/core';

/**
 * Use this token to access context within your components when
 * instantiating them through {@link PolymorphicOutletDirective}
 */
export const POLYMORPHIC_CONTEXT = new InjectionToken<object>(
  'Context from *polymorphicOutlet'
);
