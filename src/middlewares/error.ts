import { Context, Middleware } from 'koa'
import dayjs from 'dayjs'
import { colourText, respErr } from '../helper'

enum LogPrefix {
  Outgoing = '<--',
  Incoming = '-->'
}

const colorByStatus = (status: number, message?: string) => {
  const out: { [key: string]: string } = {
    7: `\x1b[35m${message ?? status}\x1b[0m`,
    5: `\x1b[31m${message ?? status}\x1b[0m`,
    4: `\x1b[33m${message ?? status}\x1b[0m`,
    3: `\x1b[36m${message ?? status}\x1b[0m`,
    2: `\x1b[32m${message ?? status}\x1b[0m`,
    1: `\x1b[32m${message ?? status}\x1b[0m`,
    0: `\x1b[33m${message ?? status}\x1b[0m`,
  }

  const calculateStatus = (status / 100) | 0

  return out[calculateStatus]
}

export interface ILoggerOptions {
  headers?: boolean
}

export const errorHandler = (): Middleware => {
  return async (c, next) => {
    try {
      await next()
      const code = c.res.statusCode
      switch (code) {
        case 404:
          c.status = code
          c.body = respErr('not found')
          break
        case 405:
          c.status = code
          c.body = respErr('method not allowed')
          break
        case 501:
          c.status = code
          c.body = respErr('not implemented')
          break
      }
    } catch (e: any) {
      c.body = respErr(e)
    }
  }
}