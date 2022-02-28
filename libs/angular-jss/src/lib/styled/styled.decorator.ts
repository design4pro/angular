import 'reflect-metadata';
import { BehaviorSubject, Subject } from 'rxjs';
import { generateStyles, markAsDecorated, STYLED_PROPS } from './internals';
import { ComponentType, DirectiveType } from './ivy';
import { StyledProps } from './styled.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function StyledProp<T>(): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: Record<string, any>, propertyKey: string | symbol): void => {
    if (!Object.prototype.hasOwnProperty.call(target, STYLED_PROPS)) {
      Object.defineProperty(target, STYLED_PROPS, {
        value: {},
        writable: false,
      });
    }

    let value: T;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: T) {
      target[STYLED_PROPS][propertyKey] = newVal;
      value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function decorateNgOnCheck(
  ngDoCheck: (() => void) | null | undefined,
  props: StyledProps,
  initialized: boolean
) {
  return function () {
    // Redecorate ngOnDestroy if it was complied
    if (this._onDestroy$.isStopped) {
      this._doCheck$ = new BehaviorSubject({} as StyledProps);

      this._onDestroy$?.unsubscribe();
      this._onDestroy$ = undefined;
      this._onDestroy$ = new Subject();

      const originalNgOnDestroy = this.ngOnDestroy;
      this.ngOnDestroy = decorateNgOnDestroy(originalNgOnDestroy);

      initialized = false;
    }
    // Invoke the original `ngDoCheck` if it exists
    if (ngDoCheck) {
      ngDoCheck.call(this);
    }

    if (!initialized) {
      generateStyles.apply(this, [props, this._doCheck$, this._onDestroy$]);

      initialized = true;
    }

    this._doCheck$.next(this[STYLED_PROPS]);
  };
}

function decorateNgOnDestroy(ngOnDestroy: (() => void) | null | undefined) {
  return function () {
    // Invoke the original `ngOnDestroy` if it exists
    if (ngOnDestroy) {
      ngOnDestroy.call(this);
    }

    this._onDestroy$.next();
    this._onDestroy$.complete();
  };
}

function decorateDeclarable<T>(
  type: ComponentType<T> | DirectiveType<T>,
  props: StyledProps
) {
  // eslint-disable-next-line prefer-const
  let initialized = false;

  Object.defineProperty(type, 'classes', {
    writable: true,
  });

  const originalNgDoCheckHook = type.prototype['ngDoCheck'];
  const originalNgOnDestroy = type.prototype['ngOnDestroy'];

  type.prototype._doCheck$ = new BehaviorSubject({} as StyledProps);
  type.prototype['ngDoCheck'] = decorateNgOnCheck(
    originalNgDoCheckHook,
    props,
    initialized
  );

  type.prototype._onDestroy$ = new Subject();
  type.prototype['ngOnDestroy'] = decorateNgOnDestroy(originalNgOnDestroy);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Styled(props: StyledProps): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (type: any) => {
    decorateDeclarable(type, props);

    markAsDecorated(type);
  };
}
