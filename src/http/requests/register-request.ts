import { Request } from 'express'

export type RegisterRequest = Request & {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}
