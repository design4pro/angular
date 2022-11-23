import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ngDocsExampleGetTabs' })
export class NgDocsExampleGetTabsPipe implements PipeTransform {
  transform(content: Record<string, string>, defaultTab: string): string[] {
    return [defaultTab, ...Object.keys(content)];
  }
}
