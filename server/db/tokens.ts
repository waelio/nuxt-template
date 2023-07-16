import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = async () => {
  
  const data = await prisma.RefreshToken.findMany()
  
  return await data
}