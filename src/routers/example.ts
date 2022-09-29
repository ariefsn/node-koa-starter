import { respOk } from '../helper'
import Router from '@koa/router'

export const example = new Router({ prefix: '/example' })

example.get('/', (ctx) => {
  ctx.body = respOk(ctx.req.method)
})

example.post('/', (ctx) => {
  ctx.body = respOk(ctx.request.body)
})

example.put('/', (ctx,) => {
  ctx.body = respOk(ctx.req.method)
})

example.delete('/', (ctx) => {
  ctx.body = respOk(ctx.req.method)
})