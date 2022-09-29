import { respOk } from '../helper'
import Router from '@koa/router'

export const root = new Router()

root.get('/', (ctx, next) => {
  ctx.body = respOk(null, "Running")
})