export const selectedFields = <T extends object>(fields: string[], obj: T): Partial<T> => {
  return fields.reduce((acc, field) => {
    if (field in obj) {
      acc[field as keyof T] = obj[field as keyof T]
    }

    return acc
  }, {} as Partial<T>)
}
