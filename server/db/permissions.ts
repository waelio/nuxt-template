import { prisma } from './index'

export const getPermissionById = async (id: string) => {
  const permissions = await prisma.permissions.findUnique({
    where: {
      id
    }
  })
  return {
    data: permissions
  }
}