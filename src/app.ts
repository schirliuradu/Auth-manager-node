import dotenv from 'dotenv'
dotenv.config() // setup env vars

import bodyParser from 'body-parser'
import express, { Application } from 'express'
import authRouter from './http/routes/auth-router'

const app: Application = express()

app.use(bodyParser.json())
app.use('/api', authRouter)

export default app
