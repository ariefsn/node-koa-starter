import { config } from 'dotenv'
import { IEnv } from '../models'
config()

const env: IEnv = {
  PORT: 4000
}

export const initEnv = () => {
  const { PORT } = process.env

  env.PORT = parseInt(PORT ?? '4000')
}

export const getEnv = (): IEnv => env