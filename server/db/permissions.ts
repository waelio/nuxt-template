import { prisma } from './index'
export const getPermissionById = (id: string) => {
  return prisma.permissions.findUnique({
    where: {
      id
    }
  })
}