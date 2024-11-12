import { ClassConstructor } from 'class-transformer'
import { Response } from 'express'
import { cookieOptions } from '~/config/cookie.config'
import { transformExpose } from './transform-expose.util'

export class ErrorResponseBase extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number
  ) {
    super(message)
  }
}

export class SuccessResponseBase<T> {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public data: Partial<T>
  ) {}

  send(res: Response) {
    res.status(this.statusCode).json(this)
  }

  tranformDto<V>(dto: ClassConstructor<V>) {
    this.data = transformExpose(dto, this.data) as Partial<T>
    return this
  }

  setToken(res: Response, acessToken: string, refreshToken: string) {
    res.cookie('accessToken', acessToken, cookieOptions)
    res.cookie('refreshToken', refreshToken, cookieOptions)
    return this
  }

  clearToken(res: Response) {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return this
  }
}
