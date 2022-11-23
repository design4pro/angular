import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentationPropertyConnectorDirective } from './documentation-property-connector.directive';
import { DocumentationComponent } from './documentation.component';

@NgModule({
  declarations: [
    DocumentationComponent,
    DocumentationPropertyConnectorDirective,
  ],
  imports: [CommonModule],
})
export class NgDocsDocumentationModule {}
