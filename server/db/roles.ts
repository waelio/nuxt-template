import { prisma } from './index'
import { getPermissionById } from './permissions'

export const getPermissionsByRoleByName = async (roleName: string) => {
  const role = await prisma.roles.findUnique({
    where: {
      name: roleName
    }
  })
  // @ts-ignore
  const { permissions } = role
  // console.log(permissions);
  const permission = await getPermissionById(permissions)

  return permission
}



export const getUserById = (userId: string) => {
  return prisma.user?.findUnique({
    where: {
      id: userId
    }
  })
}