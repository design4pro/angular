import { isPlatformBrowser, Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UrlSerializer } from '@angular/router';
import { Subject } from 'rxjs';
import { DestroyService } from '../utils/service/destroy.service';
import { NG_DOCS_DEMO_TEXTS } from '../utils/tokens/i18n';
import { NG_DOCS_IS_MOBILE } from '../utils/tokens/is-mobile';

const MIN_COMPONENT_WIDTH = 104;

@Component({
  selector: 'ng-docs-demo',
  templateUrl: './demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocsDemoComponent implements OnInit, AfterViewInit {
  @Input()
  control: AbstractControl | null = null;

  testForm?: FormGroup;
  updateOnVariants = ['change', 'blur', 'submit'];
  updateOn: 'change' | 'blur' | 'submit' = 'change';
  expanded = false;
  opaque = true;
  modeControl = new FormControl();

  readonly change$ = new Subject<void>();

  @ContentChild(TemplateRef)
  readonly template?: TemplateRef<any> | null | undefined;

  private initialX = 0;
  private wrapperWidth = 0;

  @ViewChild('content')
  private readonly content?: ElementRef<HTMLElement>;

  @ViewChild('wrapper')
  private readonly wrapper?: ElementRef<HTMLElement>;

  @ViewChild('resizerText')
  private readonly resizerText?: ElementRef<HTMLElement>;

  private readonly isBrowser: boolean;

  constructor(
    @Inject(NG_DOCS_IS_MOBILE) readonly isMobile: boolean,
    @Inject(DestroyService) private readonly destroy$: DestroyService,
    @Inject(Renderer2) private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Record<string, unknown>,
    @Inject(Location) locationRef: Location,
    @Inject(UrlSerializer) urlSerializer: UrlSerializer,
    @Inject(NG_DOCS_DEMO_TEXTS) readonly texts: [string, string, string]
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.setResizerTextContent();
  }

  setResizerTextContent() {
    if (!this.content || !this.resizerText) {
      return;
    }

    const paddingLeft = this.isBrowser
      ? getComputedStyle(this.content.nativeElement).paddingLeft
      : '0';
    const { offsetWidth } = this.content.nativeElement;

    this.resizerText.nativeElement.textContent = String(
      offsetWidth - parseInt(paddingLeft || '0', 10) * 2
    );
  }

  @HostListener('window:resize')
  onResize() {
    this.setResizerTextContent();
  }

  onDragStart(event: MouseEvent) {
    event.preventDefault();
    this.initialX = event.clientX;
    this.wrapperWidth = this.wrapper
      ? this.wrapper.nativeElement.offsetWidth
      : 0;
  }

  onDragContinues(event: MouseEvent) {
    const deltaX = this.initialX - event.clientX;

    this.resizeContent(deltaX);
    this.setResizerTextContent();
  }

  onDragEnd() {
    this.wrapperWidth = this.wrapper
      ? this.wrapper.nativeElement.offsetWidth
      : 0;
  }

  toggleDetails() {
    this.expanded = !this.expanded;
  }

  updateOnChange(updateOn: 'change' | 'blur' | 'submit') {
    this.updateOn = updateOn;
    this.createForm();
  }

  private createForm() {
    const { control, updateOn } = this;

    if (!control) {
      return;
    }

    this.testForm = new FormGroup({ testValue: control }, { updateOn });
  }

  private resizeContent(delta: number) {
    if (!this.wrapper) {
      return;
    }

    this.renderer.setStyle(
      this.wrapper.nativeElement,
      'width',
      `${Math.max(this.wrapperWidth - delta, MIN_COMPONENT_WIDTH)}px`
    );
  }
}
