import { useState } from '#app'
// @ts-ignore
import jwt_decode from "jwt-decode"
// @ts-ignore
import type { JwtPayload } from 'jwt-decode'
import { UserT, UserI, TokenT, PermessionT, RegisterUserT } from '~/types'
import useFetchApi from './useFetchApi'
import { Ref } from 'vue'
import { note } from './useNote'
import { useAuthStore } from '~/store/auth.pinia'
import { _decrypt, _encrypt } from 'waelio-utils'

export const useAuth = () => {
  const useAuthToken = () => useState('auth_token') as Ref<JwtPayload>
  const useAuthUser = () => useState('auth_user') as Ref<UserI>
  const useAuthUsers = () => useState('auth_users') as Ref<UserI[]>
  const useAuthLoading = () => useState('auth_loading', () => true) as Ref<boolean>
  const isAuthenticated = () => useState('isAuthenticated', () => false) as Ref<boolean>
  const myPermissions = useState('user_permissions') as Ref<PermessionT>
  const auth = useAuthStore()

  const setToken = (newToken: TokenT | object) => {
    const authToken: Ref<JwtPayload> = useAuthToken() as Ref<JwtPayload>
    authToken.value = newToken as JwtPayload

  }

  const setUser = (newUser: UserT) => {
    const authUser = useAuthUser() as Ref<UserT>
    authUser.value = newUser as UserT
    localStorage.setItem('user', _encrypt(JSON.stringify(newUser)))
  }

  const getStorageUser = () => {
    const stUser = localStorage.getItem('user')
    return stUser ? _decrypt(stUser) : {}
  }

  const setUsers = (newUser: UserI[]) => {
    const authUsers = useAuthUsers()
    authUsers.value = [...newUser] as UserT[]
  }

  const setIsAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          // @ts-ignore
          method: 'POST'
        })

        setToken({}) as unknown as object
        setUser({} as UserT)
        // @ts-ignore
        auth.setUserInfo({})
        localStorage.removeItem('user')
        note.warning('Logout success.')
        isAuthenticated().value = false
        resolve(true)
      } catch (error) {
        note.error('Failed to logout!')
        reject(error)
      }
    })
  }

  const usePermissions = () => ({
    get: () => {
      return myPermissions.value
    },
    set: (v: any) => {
      myPermissions.value = v
      return myPermissions.value
    }
  })

  const setPermission = (v: PermessionT) => {
    myPermissions.value = v
    auth.resetPermistions(v)
  }

  const login = ({ username, password }: { username: string, password: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })
        const { user, access_token, permissions } = data as { user: UserT, access_token: TokenT, permissions: PermessionT }
        if (user && access_token) {
          setToken(access_token)
          setUser(user as UserT)
          setPermission(permissions)
          note.success('Successful login')
          isAuthenticated().value = true
          resolve(user)
          return user
        } else {
          note.warning('Session expired, please login again.')
        }

      } catch (error) {
        note.error('Bad username or password')
        setIsAuthLoading(false)
        reject(error)
      }
    })
  }

  const register = ({ username, user_email, password, first_name, last_name }: RegisterUserT) => {
    const body = {
      username,
      first_name,
      last_name,
      user_email,
      repeatPassword: password,
      password
    }
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const data = await $fetch('/api/auth/register', {
          method: 'POST', body
        }) as { body: UserT }
        const user = data.body

        resolve(user)


      } catch (error) {
        note.error('Error creating user')
        setIsAuthLoading(false)
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken() as Ref<{ token: JwtPayload }>

    if (!authToken.value.token) {
      return
    }

    const jwt: Ref<JwtPayload> = jwt_decode(authToken.value?.token)
    // @ts-ignore
    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime);
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      let data
      try {
        data = await $fetch('/api/auth/refresh')
      } catch (error) {
        note.warning('Session expired, please login.')
        reject(false)
      }
      const access_token = data as unknown as Promise<TokenT>
      try {
        if (access_token) {
          // @ts-ignore
          setToken(access_token)
          resolve(true)
        } else {
          note.error('Could not refresh Token')
          reject(false)
        }
      }
      catch (error: any) {
        note.info("Please signin again")
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user') as { user: UserT }
        setUser(data.user)
        resolve(true)
      } catch (error) {
        note.log(error)
        reject(error)
      }
    })
  }

  const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/users') as { users: UserT[] }
        setUsers(data.users)
        resolve(true)

      } catch (error) {
        reject(error)
      }
    })
  }

  const getTokens = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/refresh')
        resolve(data)
      } catch (error) {
        reject(error)
      }

    })
  }

  const initAuth = () => {
    return new Promise(async (resolve, _reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()
        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        note.error('Failed to init Auth!')
        // reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }


  return {
    login,
    logout,
    register,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
    getUser,
    getUsers,
    refreshToken,
    setToken,
    setUser,
    getStorageUser,
    getTokens,
    usePermissions,
    isAuthenticated: isAuthenticated()?.value

  }

}
export default useAuth 