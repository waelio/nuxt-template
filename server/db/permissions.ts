import { prisma } from './index'
export const getPermissionById = async (id: string) => {
  const permission = await prisma.permissions.findUnique({
    where: {
      id
    }
  })
  console.log(permission);

  return permission
}