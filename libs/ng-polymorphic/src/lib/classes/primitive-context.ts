export class PolymorphicPrimitiveContext {
  constructor(public $implicit: unknown) {}

  get polymorphicOutlet(): unknown {
    return this.$implicit;
  }
}
