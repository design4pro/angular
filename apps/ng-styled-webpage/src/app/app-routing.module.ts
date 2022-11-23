import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            /* webpackChunkName: "home" */
            /* webpackPrefetch: true */
            './page/home/home.module'
          ).then((m) => m.HomeModule),
        pathMatch: 'full',
      },
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
