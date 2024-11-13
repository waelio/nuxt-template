// @ts-ignore
import prisma from './index'
import type { ReshreshTokenT } from "~~/shared/types";

export const createRefreshToken = async (refreshToken: { token: any; userId: any; }) => {
  return await prisma.refreshToken?.create({
    data: refreshToken
  })
}

export const getRefreshTokenByToken = async (rtoken: ReshreshTokenT) => {
  if (!rtoken) return 'null'
  return await prisma.refreshToken?.findUnique({
    where: {
      token: rtoken.token
    }
  })
}


export const removeRefreshToken = async (rtoken: ReshreshTokenT) => {
  return await prisma.refreshToken?.delete({
    where: {
      id: rtoken.id
    }
  })
}