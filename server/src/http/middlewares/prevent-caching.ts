import { NextFunction, Request, Response } from 'express'

export const preventCaching = (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-store') // Prevents caching
  res.set('Pragma', 'no-cache') // Older HTTP/1.0 caching mechanisms
  res.set('Expires', '0') // Expired immediately
  next()
}
