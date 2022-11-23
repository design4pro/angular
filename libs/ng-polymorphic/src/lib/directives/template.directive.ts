import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  Self,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template[polymorphic]',
  exportAs: 'polymorphic',
})
export class PolymorphicTemplateDirective<C extends Record<any, any>> {
  @Input()
  polymorphic: C | string = '';

  constructor(
    @Inject(TemplateRef)
    @Self()
    readonly template: TemplateRef<C>,
    @Inject(ChangeDetectorRef)
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  static ngTemplateContextGuard<T>(
    _dir?: PolymorphicTemplateDirective<T>,
    _ctx?: any
  ): _ctx is T extends string ? any : T {
    return true;
  }

  check() {
    this.changeDetectorRef.markForCheck();
  }
}
