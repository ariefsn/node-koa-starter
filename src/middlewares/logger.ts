import { Context, Middleware } from 'koa'
import dayjs from 'dayjs'
import { colourText } from '../helper'

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

export const logger = (options?: ILoggerOptions): Middleware => {
  return async (c, next) => {
    const { method, url, headers } = c.req
    const startTime = dayjs()
    const timeTemplate = 'YYYY-MM-DD HH:mm:ss.SSS'

    const details = [
      `[${method}]`,
      url
    ]

    if (options?.headers) {
      details.push(JSON.stringify(headers))
    }

    // log before handler
    console.log(LogPrefix.Incoming, colourText('FgMagenta', startTime.format(timeTemplate)), details.join('  '))

    await next()
    const endTime = dayjs()
    const delta = endTime.diff(startTime) + 'ms'
    const status = c.res.statusCode
    details.push(
      `${colorByStatus(status)}`,
      `${delta}`
    )

    // log after handler
    console.log(colorByStatus(status, LogPrefix.Outgoing), colourText('FgMagenta', endTime.format(timeTemplate)), details.join('  '))
  }
}