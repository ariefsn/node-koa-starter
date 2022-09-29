import Koa from 'koa'
import { initEnv, getEnv, respOk } from './helper'
import { logger } from './middlewares'
import { routers } from './routers'

const app = new Koa()

initEnv()

const { PORT } = getEnv()

app.use(logger())

routers(app)

app.listen(PORT)