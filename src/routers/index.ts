import Koa from 'koa'
import { example } from './example'
import { root } from './root'

export const routers = (app: Koa) => {
  [
    root,
    example
  ].forEach(r => {
    app
      .use(r.routes())
      .use(r.allowedMethods())
  });
}
