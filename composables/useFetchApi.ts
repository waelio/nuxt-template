import { WatchSource } from "nuxt/dist/app/compat/vue-demi"
import useAuth from "./useAuth"

type UseFetchOptions = {
  key?: string
  method?: string
  query?: URLSearchParams
  params?: URLSearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  default?: () => DataT
  transform?: (input: DataT) => DataT
  pick?: string[]
  watch?: WatchSource[]
}

export default (url: any, options: UseFetchOptions = {}) => {
  const { useAuthToken } = useAuth()

  return $fetch(url, {
    ...(options ? options : {}),
    headers: {
      Authorization: `Bearer ${useAuthToken().value}`
    }
  })
}