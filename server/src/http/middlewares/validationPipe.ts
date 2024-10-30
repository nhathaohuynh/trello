import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import dtoRegistry from '~/interface/dtos/dtoRegistration'
import { BadRequest } from '~/utils/error-response.util'

export const validationPipe = async (req: Request, res: Response, next: NextFunction) => {
  const path = req.originalUrl
  const method = req.method
  const strategyName = `${path}:${method}`

  const classValidation = dtoRegistry.get(strategyName)

  if (classValidation) {
    const dto = plainToClass(classValidation, req.body)

    const errors = await validate(dto)

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => ({
        [error.property]: Object.values(error.constraints as object)
      }))

      return next(new BadRequest(errorMessages))
    }
  }

  next()
}
