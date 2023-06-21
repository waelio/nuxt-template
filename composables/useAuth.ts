// @ts-ignore
import { useState } from '#app'
// @ts-ignore
import jwt_decode from "jwt-decode"
// @ts-ignore
import type { JwtPayload } from 'jwt-decode'
import { TUSER, IUSER, IToken } from '~/types'
import useFetchApi from './useFetchApi'
import { Ref } from 'vue'
import { note } from './useNote'


export default () => {
  const useAuthToken = () => useState('auth_token') as Ref<JwtPayload>
  const useAuthUser = () => useState('auth_user') as Ref<IUSER>
  const useAuthUsers = () => useState('auth_users') as Ref<IUSER[]>
  const useAuthLoading = () => useState('auth_loading', () => true) as Ref<boolean>

  const setToken = (newToken: unknown) => {
    const authToken: Ref<JwtPayload> = useAuthToken() as Ref<JwtPayload>
    authToken.value = newToken as JwtPayload
  }
  const setUser = (newUser: TUSER) => {
    const authUser = useAuthUser() as Ref<TUSER>
    authUser.value = newUser as TUSER
    
  }
  const setUsers = (newUser: IUSER[]) => {
    const authUsers = useAuthUsers()
    authUsers.value = [...newUser] as TUSER[]
  }
  const setIsAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }
  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST'
        })

        setToken({})
        setUser({} as TUSER)
        note.warning('Logout success.')
        resolve(true)
      } catch (error) {
        note.error('Failed to logout!')
        reject(error)
      }
    })
  }

  const login = ({ username, password }: { username: string; password: string; }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })
        const { user, access_token } = data
        if (user && access_token) {
          setToken(access_token)
          setUser(user as TUSER)
          note.success('Successful login')
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
  type RegisterUser = { username: string, user_email: string, password: string, repeatPassword: string, first_name: string, last_name: string }
  const register = ({ username, user_email, password, first_name, last_name }: RegisterUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/register', {
          method: 'POST',
          body: {
            username,
            first_name,
            last_name,
            user_email,
            repeatPassword: password,
            password
          }
        })
        const user = data.body

        resolve(user)


      } catch (error) {
        note.error('Error creating user')
        setIsAuthLoading(false)
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      let data
      try {
        data = await $fetch('/api/auth/refresh')
      } catch (error) {
        note.warning('Session expired, please login.');
        reject(false)
      }
      const access_token = data as unknown as Promise<IToken>
      try {
        if (access_token) {
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
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user as TUSER)
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
        const data: { users: TUSER[] } = await useFetchApi('/api/auth/users')
        setUsers(data.users)
        resolve(true)

      } catch (error) {
        reject(error)
      }
    })
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()

        // reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        note.error('Failed to init Auth!')
        reject(error)
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
    setToken

  }

}