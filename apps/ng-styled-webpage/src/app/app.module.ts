import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  createTheme,
  Options,
  StyledModule,
  Theme,
} from '@design4pro/ng-styled';
import { create, Jss } from 'jss';
import preset from 'jss-preset-default';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './layout/layout-header/layout-header.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';

const jss: Jss = create(preset());

const options: Options = {
  jss: jss,
};

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Futuro',
  },
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    StyledModule.forRoot(options, theme),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
