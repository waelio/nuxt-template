import { H3Event } from "h3"
import jwt from "jsonwebtoken"
import { IToken, IUSER, TToken } from "../../types"


const generateAccessToken = (user: IUSER) => {
  const config = useRuntimeConfig()

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '10m'
  })
}

const generateRefreshToken = (user: IUSER) => {
  const config = useRuntimeConfig()

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h'
  })
}

export const decodeRefreshToken = (token: TToken) => {
  const config = useRuntimeConfig()

  try {
    if (token && token.token) {
      // @ts-ignore
      return jwt.verify(token.token, config.jwtRefreshSecret)
    }
    return token
  } catch (error) {
    return null
  }
}

export const decodeAccessToken = (token: string) => {
  const config = useRuntimeConfig()

  try {
    jwt.verify(token, config.jwtAccessSecret)
  } catch (error) {
    return null
  }
}


export const generateTokens = (user: IUSER) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, "refresh_token", token, {
    httpOnly: true,
    sameSite: true
  })
} 