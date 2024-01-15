import { Request } from 'express'

export type LoginRequest = Request & {
  body: {
    email: string
    password: string
  }
}
