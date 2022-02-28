import { NextFunction, Request, Response } from 'express';
import { Jss } from '../angular-jss.service';

export function jssSSR(name = 'jss-ssr') {
  return function (req: Request, res: Response, next: NextFunction) {
    const send = res.send;

    res.send = function (string: Buffer | string) {
      // JSS SSR
      const sheet = Jss.sheetRegistry()?.toString({ format: false });
      const css = `<style data-jss data-meta="${name}">${sheet}</style>`;

      let body = string instanceof Buffer ? string.toString() : string;

      body = body.replace(/<\/head>/, `${css}</head>`);

      return send.call(this, body);
    };

    next();
  };
}

export default jssSSR;
