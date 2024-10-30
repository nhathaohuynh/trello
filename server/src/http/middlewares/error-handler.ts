/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import env from '~/config/env.config'
import { ErrorResponseBase } from '~/utils/response.util'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ErrorResponseBase ? err.status : 500
  const message = err.message || 'Internal Server Error'

  const responseData: {
    status: number
    message: string
    path?: string | undefined
    stack?: string | undefined
  } = {
    status: statusCode,
    message,
    path: req.originalUrl,
    stack: err.stack
  }

  if (env.BUILD_MODE === 'production') {
    responseData.path = undefined
    responseData.stack = undefined
  }
  res.status(statusCode).json(responseData)
}
