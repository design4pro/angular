import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularJssModule } from '@design4pro/angular-jss';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularJssModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
