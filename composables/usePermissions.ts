export const usePermissions = () => {

  const Permissions = useState('user_permissions')

  const getPermissionById = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {

        const res = await useFetchApi(`/api/auth/permissions/`, { params: { id } })
        Permissions.value = res
        resolve(res)

      } catch (error) {
        reject(error)
      }

    })
  }

  return {
    Permissions,
    getPermissionById
  }
}