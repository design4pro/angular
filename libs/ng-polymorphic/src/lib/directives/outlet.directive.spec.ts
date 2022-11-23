import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  NgModule,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolymorphicComponent } from '../classes/component';
import { PolymorphicModule } from '../polymorphic.module';
import { POLYMORPHIC_CONTEXT } from '../tokens/context';
import { PolymorphicContent } from '../types/content';
import { PolymorphicTemplateDirective } from './template.directive';

let COUNTER = 0;

describe('PolymorphicOutlet', () => {
  @Component({
    template: `
      <div *ngIf="polymorphic; else basic" #element>
        <ng-container
          *polymorphicOutlet="content as primitive; context: context"
        >
          <div *ngIf="isNumber(primitive); else str">
            Number: {{ primitive }}
          </div>
          <ng-template #str>String: {{ primitive }}</ng-template>
        </ng-container>
      </div>
      <ng-template #basic>
        <div #element>
          <ng-container
            *polymorphicOutlet="content as primitive; context: context"
          >
            {{ primitive }}
          </ng-container>
        </div>
      </ng-template>
      <ng-template #plain let-value>
        <strong>{{ value }}</strong>
      </ng-template>
      <ng-template #polymorphic="polymorphic" polymorphic let-value>
        <strong>{{ value }}</strong>
      </ng-template>
    `,
  })
  class TestComponent {
    @ViewChild('element', { read: ElementRef })
    element!: ElementRef<HTMLElement>;

    @ViewChild('plain')
    template!: TemplateRef<Record<string, unknown>>;

    @ViewChild('ngPolymorphic')
    polymorphic!: PolymorphicTemplateDirective<Record<string, unknown>>;

    isPolymorphic = false;

    content: PolymorphicContent<any> = '';

    context: any = undefined;

    isNumber(primitive: string | number): boolean {
      return typeof primitive === 'number';
    }
  }

  @Component({
    template: ` Component: {{ context.$implicit }} `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class ContentComponent {
    constructor(@Inject(POLYMORPHIC_CONTEXT) readonly context: any) {
      COUNTER++;
    }
  }

  @NgModule({
    declarations: [ContentComponent],
    entryComponents: [ContentComponent],
    exports: [ContentComponent],
  })
  class ComponentModule {}

  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PolymorphicModule, ComponentModule],
      declarations: [TestComponent],
    }).compileComponents();
  }));

  function text(): string {
    return testComponent.element.nativeElement.innerText.trim();
  }

  function html(): string {
    return testComponent.element.nativeElement.innerHTML;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Empty by default', () => {
    expect(text()).toBe('');
  });

  it('Static type check exists', () => {
    expect(PolymorphicTemplateDirective.ngTemplateContextGuard()).toBe(true);
  });

  describe('Primitive', () => {
    it('Works with strings', () => {
      testComponent.content = 'string';
      fixture.detectChanges();

      expect(text()).toBe('string');
    });

    it('Works with numbers', () => {
      testComponent.content = 237;
      fixture.detectChanges();

      expect(text()).toBe('237');
    });
  });

  describe('Handler', () => {
    beforeEach(() => {
      testComponent.context = {
        $implicit: 'string',
      };
      testComponent.content = ({ $implicit }) => $implicit;
      fixture.detectChanges();
    });

    it('Works with strings', () => {
      expect(text()).toBe('string');
    });

    it('Works with numbers', () => {
      testComponent.context = {
        $implicit: 237,
      };
      fixture.detectChanges();

      expect(text()).toBe('237');
    });
  });

  describe('Polymorphic', () => {
    beforeEach(() => {
      testComponent.isPolymorphic = true;
      fixture.detectChanges();
    });

    describe('Primitive', () => {
      it('Works with strings', () => {
        testComponent.content = 'string';
        fixture.detectChanges();

        expect(text()).toBe('String: string');
      });

      it('Works with numbers', () => {
        testComponent.content = 237;
        fixture.detectChanges();

        expect(text()).toBe('Number: 237');
      });
    });

    describe('Handler', () => {
      beforeEach(() => {
        testComponent.context = {
          $implicit: 'string',
        };
        testComponent.content = ({ $implicit }) => $implicit;
        fixture.detectChanges();
      });

      it('Works with strings', () => {
        expect(text()).toBe('String: string');
      });

      it('Works with numbers', () => {
        testComponent.context = {
          $implicit: 237,
        };
        fixture.detectChanges();

        expect(text()).toBe('Number: 237');
      });
    });
  });

  it('TemplateRef', () => {
    testComponent.context = {
      $implicit: 'string',
    };
    testComponent.content = testComponent.template;
    fixture.detectChanges();

    expect(html().includes('<strong>string</strong>')).toBe(true);
  });

  describe('NgPolymorphicTemplate', () => {
    beforeEach(() => {
      testComponent.context = {
        $implicit: 'string',
      };
      testComponent.content = testComponent.polymorphic;
    });

    it('Works', () => {
      fixture.detectChanges();

      expect(html().includes('<strong>string</strong>')).toBe(true);
    });

    it('Triggers change detection', () => {
      const changeDetectionSpy = spyOn(testComponent.polymorphic, 'check');

      fixture.detectChanges();

      expect(changeDetectionSpy).toHaveBeenCalled();
    });
  });

  describe('NgPolymorphicComponent', () => {
    it('creates component', () => {
      testComponent.context = {
        $implicit: 'string',
      };
      testComponent.content = new PolymorphicComponent(ContentComponent);
      fixture.detectChanges();

      expect(text()).toBe('Component: string');
    });

    it('does not recreate component if context changes to the same shape', () => {
      testComponent.context = {
        $implicit: 'string',
      };
      testComponent.content = new PolymorphicComponent(ContentComponent);
      fixture.detectChanges();

      const counter = COUNTER;

      testComponent.context = {
        $implicit: 'number',
      };
      fixture.detectChanges();

      expect(text()).toBe('Component: number');
      expect(COUNTER).toBe(counter);
    });
  });
});
