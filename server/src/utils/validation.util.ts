import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import dtoRegistry from '~/interface/dtos/dtoRegistration'

export const validation = <DTO>(nameStrategy: string, data: object) => {
  const classValidation = dtoRegistry.get(nameStrategy)

  if (!classValidation) {
    return false
  }

  const validatteObject = plainToClass(classValidation, data)

  const errors = validateSync(validatteObject)

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => ({
      [error.property]: Object.values(error.constraints as object)
    }))

    console.error(errorMessages)
    return false
  }

  return validatteObject as DTO
}
