import { respOk } from '../helper'
import Router from '@koa/router'

export const example = new Router({ prefix: '/example', methods: ['GET', 'POST', 'PUT'] })

example.get('/', (ctx, next) => {
  ctx.body = respOk(ctx.req.method)
})

example.post('/', (ctx, next) => {
  ctx.body = respOk(ctx.req.method)
})

example.put('/', (ctx, next) => {
  ctx.body = respOk(ctx.req.method)
})