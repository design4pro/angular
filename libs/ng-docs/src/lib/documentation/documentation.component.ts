import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  Input,
  QueryList,
} from '@angular/core';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NG_DOCS_DOCUMENTATION_TEXTS } from '../utils/tokens/i18n';
import { hexToRgb, rgbToHex } from '../utils/color-conversion';
import { EMPTY_QUERY } from '../utils/constants/empty';
import { inspectAny } from '../utils/inspect';
import { itemsQueryListObservable } from '../utils/observables/items-query-list-observable';
import { watch } from '../utils/observables/watch';
import { DocumentationPropertyConnectorDirective } from './documentation-property-connector.directive';

@Component({
  selector: 'ng-docs-documentation',
  templateUrl: './documentation.component.html',
  animations: [
    trigger('emitEvent', [
      transition(':increment', [
        style({ opacity: 1 }),
        animate('500ms ease-in'),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent implements AfterContentInit {
  @Input()
  heading = '';

  @Input()
  showValues = true;

  @Input()
  isAPI = false;

  @ContentChildren(DocumentationPropertyConnectorDirective)
  propertiesConnectors: QueryList<
    DocumentationPropertyConnectorDirective<any>
  > = EMPTY_QUERY;

  activeItemIndex = 0;

  constructor(
    @Inject(ChangeDetectorRef)
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(NG_DOCS_DOCUMENTATION_TEXTS)
    readonly texts: [string, string, string, string, string]
  ) {}

  ngAfterContentInit() {
    itemsQueryListObservable(this.propertiesConnectors)
      .pipe(
        switchMap((items) => merge(...items.map(({ changed$ }) => changed$))),
        watch(this.changeDetectorRef)
      )
      .subscribe();
  }

  get type(): string {
    return this.isAPI ? this.texts[0] : this.texts[1];
  }

  getColor(color: string): string {
    if (color.length === 4) {
      return color
        .split('')
        .reduce<string[]>(
          (result, current) => [...result, current, current],
          []
        )
        .join('')
        .replace('#', '');
    }

    if (color.startsWith('#')) {
      return color;
    }

    if (color === 'transparent') {
      return '#000000';
    }

    const parsed = color
      .replace('rgb(', '')
      .replace('rgba(', '')
      .replace(')', '')
      .replace(' ', '')
      .split(',')
      .map((v) => Number.parseInt(v, 10)) as [number, number, number];

    return rgbToHex(...parsed);
  }

  getOpacity(color: string): number {
    if (color.startsWith('#') || color.startsWith('rgb(')) {
      return 100;
    }

    if (color === 'transparent') {
      return 0;
    }

    const lastComma = color.lastIndexOf(',');
    const parsed = color
      .substr(lastComma)
      .replace(')', '')
      .replace(' ', '')
      .replace(',', '');

    return Math.round(Number.parseFloat(parsed) * 100);
  }

  onColorChange(
    connector: DocumentationPropertyConnectorDirective<string>,
    color: string
  ) {
    const opacity = this.getOpacity(connector.documentationPropertyValue || '');

    if (opacity === 100) {
      connector.onValueChange(color);

      return;
    }

    const rgb = hexToRgb(color).join(', ');
    const result = `rgba(${rgb}, ${opacity / 100})`;

    connector.onValueChange(result);
  }

  onOpacityChange(
    connector: DocumentationPropertyConnectorDirective<string>,
    opacity: number
  ) {
    const hex = this.getColor(connector.documentationPropertyValue || '');
    const rgb = hexToRgb(hex);
    const result = `rgba(${rgb}, ${opacity / 100})`;

    connector.onValueChange(result);
  }

  stripOptional(name: string): string {
    return name.replace('?', '');
  }

  isOptional(name: string): boolean {
    return name.includes('?');
  }

  showCleaner(type: string): boolean {
    return type.includes('null');
  }

  showContentTooltip(type: string): boolean {
    return type.includes('PolymorpheusContent');
  }

  inspectAny(data: any): string {
    return inspectAny(data, 2);
  }
}
