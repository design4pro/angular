import { NextFunction, Request, Response } from 'express';
import { StyledService } from '../styled.service';

export function styledSSR(name = 'jss-ssr') {
  return function (req: Request, res: Response, next: NextFunction) {
    const send = res.send;

    res.send = function (string: Buffer | string) {
      // JSS SSR
      const sheet = StyledService.sheetRegistry()?.toString({ format: false });
      const css = `<style data-jss data-meta="${name}">${sheet}</style>`;

      let body = string instanceof Buffer ? string.toString() : string;

      body = body.replace(/<\/head>/, `${css}</head>`);

      return send.call(this, body);
    };

    next();
  };
}

export default styledSSR;
