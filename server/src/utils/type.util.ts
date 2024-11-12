export type Constructor<T> = new () => T

export type IRoute = {
  path: string
  method?: string
  child?: Record<string, IRoute>
}

export enum BoardType {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export type EmailOptions = {
  email: string
  subject: string
  html: string
}
