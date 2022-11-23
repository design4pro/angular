import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PolymorphicComponent } from '../classes/component';
import { PolymorphicPrimitiveContext } from '../classes/primitive-context';
import { PolymorphicContent } from '../types/content';
import { PolymorphicTemplateDirective } from './template.directive';

@Directive({
  selector: '[polymorphicOutlet]',
})
export class PolymorphicOutletDirective<C extends object>
  implements OnChanges, DoCheck
{
  private viewRef?: EmbeddedViewRef<unknown>;

  private componentRef?: ComponentRef<unknown>;

  @Input()
  polymorphicOutlet: PolymorphicContent<C> = '';

  @Input()
  polymorphicOutletContext!: C;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly templateRef: TemplateRef<PolymorphicPrimitiveContext>
  ) {}

  ngOnChanges({ polymorphicOutlet }: SimpleChanges) {
    if (this.viewRef) {
      this.viewRef.context = this.getContext();
    }

    if (this.componentRef) {
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }

    if (!polymorphicOutlet) {
      return;
    }

    this.viewContainerRef.clear();

    if (isComponent(this.polymorphicOutlet)) {
      const proxy = new Proxy(this.polymorphicOutletContext, {
        get: (_, key) => this.polymorphicOutletContext[key as keyof C],
      });
      const injector = this.polymorphicOutlet.createInjector(
        this.injector,
        proxy
      );
      const componentFactory = injector
        .get(ComponentFactoryResolver)
        .resolveComponentFactory(this.polymorphicOutlet.component);

      this.componentRef = this.viewContainerRef.createComponent(
        componentFactory,
        0,
        injector
      );
    } else {
      this.viewRef = this.viewContainerRef.createEmbeddedView(
        this.template,
        this.getContext()
      );
    }
  }

  ngDoCheck() {
    if (isDirective(this.polymorphicOutlet)) {
      this.polymorphicOutlet.check();
    }
  }

  private get template(): TemplateRef<unknown> {
    if (isDirective(this.polymorphicOutlet)) {
      return this.polymorphicOutlet.template;
    }

    return this.polymorphicOutlet instanceof TemplateRef
      ? this.polymorphicOutlet
      : this.templateRef;
  }

  private getContext(): unknown {
    return isTemplate(this.polymorphicOutlet)
      ? this.polymorphicOutletContext
      : new PolymorphicPrimitiveContext(
          typeof this.polymorphicOutlet === 'function'
            ? this.polymorphicOutlet(this.polymorphicOutletContext)
            : this.polymorphicOutlet
        );
  }
}

function isDirective<C extends object>(
  content: PolymorphicContent<C> | null
): content is PolymorphicTemplateDirective<C> {
  return content instanceof PolymorphicTemplateDirective;
}

function isComponent<C extends object>(
  content: PolymorphicContent<C> | null
): content is PolymorphicComponent<object, C> {
  return content instanceof PolymorphicComponent;
}

function isTemplate<C extends object>(
  content: PolymorphicContent<C> | null
): content is PolymorphicTemplateDirective<C> | TemplateRef<C> {
  return isDirective(content) || content instanceof TemplateRef;
}
