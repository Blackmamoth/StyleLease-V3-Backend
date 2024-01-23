import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import httpErros from 'http-errors'
import * as fs from 'fs'
import { GlobalConfig } from './helpers/common/environment'
import { config } from 'dotenv'
import { sendApiErrorResponse } from './helpers/common/backend.function'
import './helpers/common/init_mongodb'
import './helpers/common/init_redis'


config()

const styleLeaseBackendApp = express()

styleLeaseBackendApp.use(express.urlencoded({ extended: true }))
styleLeaseBackendApp.use(express.json())
styleLeaseBackendApp.use(cookieParser(GlobalConfig.APP_COOKIE_SECRET))
styleLeaseBackendApp.use(cors({
    credentials: true,
    origin: GlobalConfig.APP_FRONTEND,
}))
styleLeaseBackendApp.use(morgan('combined', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))

styleLeaseBackendApp.use((req, _, next) => {
    next(httpErros.NotFound(`Route not Found for [${req.method}] ${req.url}`))
})

styleLeaseBackendApp.use((err: { statusCode?: number, message?: string }, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err?.statusCode || 500
    const message = err?.message || `Cannot resolve request [${req.method}] ${req.url}`
    sendApiErrorResponse(res, statusCode, message)
    next()
})

styleLeaseBackendApp.listen(GlobalConfig.APP_PORT, () => {
    console.log(`Express Application Running on Port: ${GlobalConfig.APP_PORT}`)
})

process.on('SIGINT', () => {
    setTimeout(() => {
        console.log('Application Terminated Successfully.')
        process.exit(0)
    }, 500)
})