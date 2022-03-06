
# Angular JSS

<img width="20%" height="20%" src="./logo.svg">

> [JSS](https://cssinjs.org/) integration with Angular

[![Version](https://img.shields.io/npm/v/@design4pro/angular-jss.svg?style=flat-square)](https://npmjs.org/package/@design4pro/angular-jss)
[![License](https://img.shields.io/npm/l/@design4pro/angular-jss.svg?style=flat-square)](https://github.com/design4pro/angular-jss/jss/blob/master/LICENSE.md)
[![Downloads](https://img.shields.io/npm/dm/@design4pro/angular-jss.svg?style=flat-square)](https://npmjs.org/package/@design4pro/angular-jss)
[![Size](https://img.shields.io/bundlephobia/minzip/@design4pro/angular-jss.svg?style=flat-square)](https://npmjs.org/package/@design4pro/angular-jss)
[![design4pro](https://img.shields.io/badge/@-design4pro-383636?style=flat-square&labelColor=8f68d4)](https://github.com/design4pro/)

## Features

- [x] Component decorator `Styled`
- [x] Theming with `Theme`
- [ ] Theme switching (dark/light mode)
- [x] Server Side Rendering with Angular Universal
- [ ] Critical CSS

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Using `npm`:

```sh
npm install @design4pro/angular-jss
```

or using `yarn`:

```sh
yarn add @design4pro/angular-jss
```

## Usage

Inject the `AngularJssModule` module into your root module:

```ts
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
```

Use class decorator `Styled` to add styles to your component:

```ts
import { Component } from '@angular/core';
import { Styled, StyledProp, Theme } from '@design4pro/angular-jss';

@Component({
  selector: 'angular-jss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Styled(({ css, injectGlobal }) => {
  // global styles
  injectGlobal({
    '@global': {
      ':root': {
        '--background-color': (data: { backgroundColor: string }) => data.backgroundColor,
      },
    },
  });

  // element styles
  return css(
    (theme: Theme) => ({
      root: {
        color: '#fff',
        backgroundColor: 'var(--background-color)',
        padding: '20px',
        direction: theme.direction,
      },
    }),
    { name: 'first' }
  );
})
export class AppComponent {
  classes: any; // required to use `[ngClass]="classes.root"` in html template

  @StyledProp() // mark property as styled property
  backgroundColor = 'red';

  click() {
    this.backgroundColor = this.backgroundColor === 'red' ? 'green' : 'red';
  }
}
```

```html
<div [ngClass]="classes.root"></div>
```

## Config options

```ts
import { create, Jss } from 'jss';
import extend from 'jss-plugin-extend';
import propsSort from 'jss-plugin-props-sort';
import { JssOptions } from '@design4pro/angular-jss';

const jss: Jss = create({
  // additional JSS plugins @see https://cssinjs.org/plugins?v=v10.9.0
  plugins: [
    extend(),
    propsSort()
  ],
});

const jssOptions: JssOptions = {
  jss: jss,
  normalize: false // disable normalizing (normalize.css)
};

const theme: Theme = {
  palette: {
    primary: {
      main: '#00bcd4' // use in decorator `theme.palette?.primary?.main`
    },
    secondary: {
      main: '#f50057'
    }
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularJssModule.forRoot(jssOptions, theme)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## License

[MIT](https://github.com/design4pro/angular-jss/blob/master/LICENSE.md) © DESIGN4 ᴾ ᴿ ᴼ
