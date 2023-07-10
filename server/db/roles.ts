import { prisma } from './index'





export const getRoleByName = async (roleName: string) => {
  // @ts-ignore
  const role =  await prisma.roles.findUnique({
    where: {
      name: roleName
    }
  })  

  return role
}



export const getUserById = (userId: string) => {
  return prisma.user?.findUnique({
    where: {
      id: userId
    }
  })
}