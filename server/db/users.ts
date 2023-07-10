// @ts-ignore
import { prisma } from './index'
// @ts-ignore
import bcrypt from "bcrypt"

type UserData = { username: string; email: string; password: string; first_name?: any; last_name?: any; role: string; profileImage?: string; }

export const createUser = (userData: UserData) => {
  const finalUserData: UserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10)
  }
  return prisma.user?.create({
    data: finalUserData
  })
}

export const getUserByUsername = async (daUsername: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: daUsername
    }
  })

  return user
}



export const getUserById = (userId: string) => {
  return prisma.user?.findUnique({
    where: {
      id: userId
    }
  })
}