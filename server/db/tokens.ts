
export const getAll = async () => {
  
  const data = await prisma.refreshToken.findMany()
  
  return data
}