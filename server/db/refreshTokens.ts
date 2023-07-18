// @ts-ignore
import prisma from './index'
import { ReshreshTokenT } from "../../types";

export const createRefreshToken = async (refreshToken: { token: any; userId: any; }) => {
  return await prisma.refreshToken?.create({
    data: refreshToken
  })
}

export const getRefreshTokenByToken = async (rtoken: string) => {
  if (!rtoken) return 'null'
  return await prisma.refreshToken?.findUnique({
    where: {
      token: rtoken
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