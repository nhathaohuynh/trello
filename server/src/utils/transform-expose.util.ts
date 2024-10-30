import { ClassConstructor, plainToClass } from 'class-transformer'

export const transformExpose = <T, V>(dto: ClassConstructor<T>, data: V | V[]): T => {
  return plainToClass(dto, data, { excludeExtraneousValues: true })
}
