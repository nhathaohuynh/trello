import jwt from 'jsonwebtoken'

interface ITokenPayload {
  id: string
}

export const generateToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn, algorithm: 'HS256' })
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as ITokenPayload
}
