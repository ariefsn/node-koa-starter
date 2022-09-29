import Koa from 'koa'
import helmet from 'koa-helmet'
import koaBody from 'koa-body'
import { initEnv, getEnv, print } from './helper'
import { logger } from './middlewares'
import { errorHandler } from './middlewares/error'
import { routers } from './routers'

const app = new Koa()

initEnv()

const { PORT } = getEnv()

app.use(logger())
app.use(helmet())
app.use(koaBody())
app.use(errorHandler())

routers(app)

print.info('\n', 'Server live on port:', PORT, '\n')

app.listen(PORT)