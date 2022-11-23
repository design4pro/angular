import { Directive, Inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngDocsPageTab]',
})
export class NgDocsPageTabDirective {
  @Input()
  pageTab?: string;

  constructor(
    @Inject(TemplateRef) readonly template: TemplateRef<Record<string, unknown>>
  ) {}
}
