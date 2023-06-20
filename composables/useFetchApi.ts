import useAuth from "./useAuth"

export default (url: any, options: { headers?: string, } = {}) => {
  const { useAuthToken } = useAuth()


  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`
    }
  })
}