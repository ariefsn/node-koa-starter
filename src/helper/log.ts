import { colourText } from "./color"

export type TPrintType = 'info' | 'success' | 'warning' | 'error' | 'default'

export const print = {
  info(...msg: any[]) {
    const message = msg.join(' ')
    console.log(colourText('FgCyan', message))
  },
  success(...msg: any[]) {
    const message = msg.join(' ')
    console.log(colourText('FgGreen', message))
  },
  warning(...msg: any[]) {
    const message = msg.join(' ')
    console.log(colourText('FgYellow', message))
  },
  error(...msg: any[]) {
    const message = msg.join(' ')
    console.log(colourText('FgRed', message))
  },
  default(...msg: any[]) {
    const message = msg.join(' ')
    console.log(colourText('FgWhite', message))
  },
  mode(mode: TPrintType, ...msg: any[]) {
    switch (mode) {
      case 'info':
        this.info(...msg)
        break;
      case 'success':
        this.success(...msg)
        break;
      case 'warning':
        this.warning(...msg)
        break;
      case 'error':
        this.error(...msg)
        break;
      default:
        this.default(...msg)
        break;
    }
  }
}
