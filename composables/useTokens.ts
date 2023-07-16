export const useTokens = () => {

  const getAllTokens = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const tokens = await useFetchApi('/api/auth/tokens')
        resolve(tokens)
      } catch (error) {
        reject(error)
      }
    })
  }
  const deleteTokenById = (tokenId: string) => {

  }


  return {
    getAllTokens,
    deleteTokenById
  }

}