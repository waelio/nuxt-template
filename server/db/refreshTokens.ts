// @ts-ignore
import prisma from './index'
import { TReshreshToken } from "../../types";

export const createRefreshToken = (refreshToken: { token: any; userId: any; }) => {
  return prisma.refreshToken?.create({
    data: refreshToken
  })
}

export const getRefreshTokenByToken = (rtoken: string) => {
  if (!rtoken) return 'null'
  return prisma.refreshToken?.findUnique({
    where: {
      token: rtoken
    }
  })
}


export const removeRefreshToken = (rtoken: TReshreshToken) => {
  return prisma.refreshToken?.delete({
    where: {
      id: rtoken.id
    }
  })
}