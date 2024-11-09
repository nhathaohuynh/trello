import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { corsOptions } from './config/cros.config'
import { errorHandler } from './http/middlewares/error-handler'
import { notFound } from './http/middlewares/not-found'
import router from './http/routes'
import { API_PREFIX } from './utils/constant.util'
export const expressApp = (app: Express) => {
  // middleware
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors(corsOptions))

  app.use(API_PREFIX, router)
  app.use(notFound)
  app.use(errorHandler)

  // routeApp(ROUTE_APP, API_PREFIX)
}
