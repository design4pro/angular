import {
  Type,
  ɵComponentDef,
  ɵComponentType,
  ɵDirectiveDef,
  ɵDirectiveType,
} from '@angular/core';

// We need this interface override the readonly keyword
// on the properties that we want to re-assign.
export interface ComponentDef<T> extends ɵComponentDef<T> {
  factory: FactoryFn<T> | null;
  doCheck: (() => void) | null;
  onDestroy: (() => void) | null;
}

export interface DirectiveDef<T> extends ɵDirectiveDef<T> {
  factory: FactoryFn<T> | null;
  doCheck: (() => void) | null;
  onDestroy: (() => void) | null;
}

// tslint:disable-next-line interface-over-type-literal
export interface FactoryFn<T> {
  <U extends T>(t: Type<U> | undefined): U;
  (t?: undefined): T;
}

export type ComponentType<T> = ɵComponentType<T>;
export type DirectiveType<T> = ɵDirectiveType<T>;
