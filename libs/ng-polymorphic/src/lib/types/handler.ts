/**
 * A handler function receiving context as input and returning a primitive
 */
export type PolymorphicHandler<C extends object> = (
  context: C
) => string | number;
